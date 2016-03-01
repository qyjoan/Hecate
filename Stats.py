from pymongo import MongoClient
import pymongo
from pandas import DataFrame
from datetime import datetime
import sys

client = MongoClient()
db = client.Hecate
users = db.User
routes = db.Travel_Route

stats = db.Stats

# takes in username, and route_type
# returns a dataframe
def get_route(username, route_type):
    runs = []
    for route in routes.find({'username': username,'route_type': route_type}):
        duration_str = route['legs'][0]['duration_in_traffic']['text']
        duration = int(duration_str.split(' ')[0])
        departure_day = route['departure_day']
        departure_time = route['departure_time']
        travel_mode = route['travel_mode']
        runs.append({'departure_day':departure_day, 'departure_time':departure_time, 'duration':duration, 'route_type':route_type, 'travel_mode':travel_mode})
    df = DataFrame(runs)
    # add date column (str)
    df['date'] = df.departure_time.apply(lambda x: str(x).split(' ')[0])
    # add time column (str)
    df['time'] = df.departure_time.apply(lambda x: str(x).split(' ')[1][:5])
    # add duration_min column (int)
    df['duration_min'] = df.groupby('departure_day')['duration'].transform(min)
    return df

# takes in dataframe of possible departures and current departure time
# returns index of optimal departure time
def get_departure(df, cur_departure):

    # and pick the closest to current departure time
    diff = float('inf')
    min_ix = -1

    for idx in df.index:
        if df.ix[idx, 'duration'] == df.ix[idx, 'duration_min']:
            date = df.ix[idx, 'date']

            c_dt = datetime.strptime("{d} {t}".format(d = date, t = cur_departure), "%Y-%m-%d %H:%M")
            suggested_time = df.ix[idx, 'departure_time'].to_datetime()
            
            lag = max(c_dt, suggested_time) - min(c_dt, suggested_time)

            if lag.seconds < diff:
                diff = lag.seconds
                min_ix = idx
    return min_ix

def get_result(rec, cur_dep, sug_dep, cur_dur, sug_dur):
    return {'new_recommendation':rec,
            'current_departure'cur_dep,
            'suggested_departure':sug_dep,
            'current_duration':cur_dur,
            'suggested_duration':sug_dur,
            'time_saved':cur_dur - sug_dur}

# if new user
for user in users.find({'username': sys.argv[1]}):
    username = user['username']
    print user['username']
    
    result = {}
    result['username'] = username
    result[route_type] = {}
    
    current_starts = None
    for route_type in ['outbound', 'homebound']:
        user_stats = stats.find_one({'username': username})

        # get current outbound duration (in min) from user
        if user_stats is None:
            current_start = user['route']['times'][route_type]['current_start']
        else:
            current_starts = user_stats[route_type]

        # get routing data from routes
        df = get_route(username, route_type)
        # for each user, generate suggestion for each day
        
        # iterate through all the possible departure times of the day
        for day in user['route']['days']:
            if current_starts:
                current_start = current_starts.get(day)['suggested_departure']

            sugg = df[df.departure_day == day]
            # get index of current departure time
            cur_ix = sugg[sugg['time'] == current_start].index[0]

            current_dur = sugg.ix[cur_ix, 'duration']
            opt_dur = sugg.ix[cur_ix, 'duration_min']
            # current departure time is optimal
            if current_dur == opt_dur:
                js = get_result(False, current_start, current_start, current_dur, current_dur)
            else:
                # find optimal time
                min_ix = get_departure(sugg, current_start)
                optimal_start = sugg.ix[min_ix, 'departure_time']
                js = get_result(True, current_start, optimal_start, current_dur, opt_dur)

            result[route_type][day] = js

    print result
    
#if user_stats is None:
#update stats
#else:
#id = stats.insert(result)
