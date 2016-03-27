from pymongo import MongoClient
import pymongo
from pandas import DataFrame
from datetime import datetime, timedelta
import googlemaps
import sys,os

client = MongoClient()
db = client.Hecate
users = db.User
routes = db.Travel_Route
stats = db.Stats

api_key = os.environ['GOOGLE_MAP_DIRECTIONS_API_KEY']
gmaps = googlemaps.Client(key=api_key)

# takes in username, and route_type
# returns a dataframe
def get_route(username, route_type):
    runs = []
    if routes.find({'username': username, 'route_type': route_type, 'live': False}).count() == 0:
        return
    for route in routes.find({'username': username,'route_type': route_type, 'live': False}):
        duration_sec = route['legs'][0]['duration_in_traffic']['value']
        departure_day = route['departure_day']
        departure_time = route['departure_time']
        travel_mode = route['travel_mode']
        created_date = datetime.strptime(route['created_date'], "%c").date()
        runs.append({'departure_day':departure_day,
                     'departure_time':departure_time,
                     'duration':duration_sec,
                     'route_type':route_type,
                     'travel_mode':travel_mode,
                     'created_date':created_date})
    df = DataFrame(runs)
    # add date column (str)
    df['date'] = df.departure_time.apply(lambda x: str(x).split(' ')[0])
    # add time column (str)
    df['time'] = df.departure_time.apply(lambda x: str(x).split(' ')[1][:5])
    # add duration_min column (int)
    df['duration_min'] = df.groupby(['created_date','departure_day'])['duration'].transform(min)
    return df

# query_route is called when current departure time is missing
# from Mongo to get the Google approximation of current departure
def query_route(user, route_type, dt, time):
    start_location = user['route']['address']['start_location']['formatted_address']
    end_location = user['route']['address']['end_location']['formatted_address']
    mode = user['route']['transportation']
    dep_time = datetime.strptime("{} {}".format(dt, time), "%Y-%m-%d %M:%S")
    #print dep_time, mode
    if dep_time <= datetime.now():
        dep_time += timedelta(days=7)
    
    if route_type == 'outbound':
        dirs = gmaps.directions(start_location, end_location, mode=mode, departure_time=dep_time)
    else:
        dirs = gmaps.directions(end_location, start_location, mode=mode, departure_time=dep_time) 
    return dirs[0]

# takes in dataframe of possible departures and current departure time
# returns index of optimal departure time
def get_departure(df, cur_departure):

    # and pick the closest to current departure time
    diff = float('inf')
    min_ix = -1

    for idx in df.index:
        if df.loc[idx, 'duration'] == df.loc[idx, 'duration_min']:
            date = df.ix[idx, 'date']

            c_dt = datetime.strptime("{d} {t}".format(d = date, t = cur_departure), "%Y-%m-%d %H:%M")
            suggested_time = df.loc[idx, 'departure_time'].to_datetime()
            
            lag = max(c_dt, suggested_time) - min(c_dt, suggested_time)

            if lag.seconds < diff:
                diff = lag.seconds
                min_ix = idx
    return min_ix

def get_result(rec, cur_dep, sug_dep, cur_dur, sug_dur):
    return {'new_recommendation':rec,
            'current_departure':cur_dep,
            'suggested_departure':sug_dep,
            'current_duration':cur_dur,
            'suggested_duration':sug_dur,
            'time_saved':cur_dur - sug_dur}

def latest_date(df):
    dates = df.created_date.unique()
    max_date = max(dates)
    return max_date

# if new user
#for user in users.find({'username':sys.argv[1]}):
for user in users.find():
    username = user['username']
    print "======================================="
    print user['username']
    
    result = {}
    result['username'] = username
    
    for route_type in ['outbound', 'homebound']:
        user_stats = stats.find_one({'username': username})
        result[route_type] = {}
        # get current outbound duration (in min) from user
        current_starts = user['route']['times'][route_type]
        #for d in current_starts:
        #    print "{}: {}, {}".format(d, current_starts[d]['current_start'],
        #                              current_starts[d]['current_duration'])

        # get routing data from routes
        df = get_route(username, route_type)
        if df is None:
            print "Cannot find route information for {}.".format(username)
            continue
        # for each user, generate suggestion for each day
        
        # iterate through all the possible departure times of the day
        for day in user['route']['days']:
            
            current_start = current_starts.get(day)['current_start']
            sugg = df[df.departure_day == day]
            sugg = sugg[sugg.created_date == latest_date(sugg)].drop_duplicates()
            #print current_start
            #print sugg
            # get index of current departure time
            #print day, current_start
            #print "suggested time: {}".format(sugg['time'].unique())
            
            ############################################################
            # 
            ############################################################
            if (sugg['time'] == current_start).sum() == 0:
                try:
                    r = query_route(user, route_type, sugg.date.unique()[0], current_start)
                except:
                    print "Skipping {} for user {} on {} due to missing data.".format(route_type, username, day)
                    continue
                current_dur = r['legs'][0]['duration_in_traffic']['value']
                print "Current duration queried: {}".format(current_dur)
            else:
                cur_ix = sugg[sugg['time'] == current_start].index[0]
                current_dur = sugg.ix[cur_ix, 'duration']
            
            ###########################################################
            
            opt_dur = sugg.duration.min()
            # current departure time is optimal
            if current_dur <= opt_dur:
                js = get_result(False, current_start, current_start, current_dur, current_dur)
            
            else:
                # find optimal time
                min_ix = get_departure(sugg, current_start)
                optimal_start = sugg.loc[min_ix, 'departure_time']
                optimal_start_str = str(optimal_start).split(' ')[1][:5]
                js = get_result(True, current_start, optimal_start_str, current_dur, opt_dur)
                
                # if user accepts optimal time suggestion
                user['route']['times'][route_type][day]['current_start'] = optimal_start_str

            result[route_type][day] = js
            user['route']['times'][route_type][day]['current_duration'] = opt_dur

    #stats.find_one_and_replace({'username':username}, result, upsert=True)
    
    # update user table
    user.pop('_id')
    user['updated_at'] = datetime.now()
    result['updated_at'] = datetime.now()
    #print "-----------------------------"
    #print "Outbound:"
    #current_starts = user['route']['times']['outbound']
    #for d in current_starts:
    #    print "{}: {}, {}".format(d, current_starts[d]['current_start'],
    #                                  current_starts[d]['current_duration'])
    #print "Inbound:"
    #current_starts = user['route']['times']['homebound']
    #for d in current_starts:
    #    print "{}: {}, {}".format(d, current_starts[d]['current_start'],
    #                                  current_starts[d]['current_duration'])
    print user
    stats.insert_one(result)
    users.find_one_and_replace({'username':username}, user, upsert=False)
