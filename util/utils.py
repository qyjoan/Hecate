import sys
from datetime import datetime
from pymongo import MongoClient
from pandas import DataFrame

client = MongoClient()
db = client.Hecate
users = db.User
routes = db.Travel_Route
stats = db.Stats
now = datetime.today()

def get_days(username):
    user = users.find_one({'username': username})
    #for d in user['route']['days']:
    #    print d
    return user['route']['days']

def get_last_load(username):
    return max([datetime.strptime(x['created_date'], "%c") for x in routes.find({"username": username, "live": False})])

def timeDiff(t1, t2):
    time1 = datetime.strptime(t1, "%H:%M")
    time2 = datetime.strptime(t2, "%H:%M")
    newTime = max(time1, time2) - min(time1, time2)
    return newTime.seconds

def get_min_diff(current_time, times):
    ix = 0
    min_diff = float('inf')
    for i in range(len(times)):
        diff = timeDiff(current_time, times[i])
        if diff < min_diff:
            min_diff = diff
            ix = i
    return ix

def get_one_route(rid):
    r = routes.find_one({'_id': rid})
    r.pop("_id")
    return r

# returns all last-updated non-live routes for user
def get_future_routes(username):
    routes_summary = []
    for r in routes.find({"username": username, "live": False, "departure_time": {"$gt": now}}):
        summary = {}
        summary['update_time'] = datetime.strptime(r['created_date'],"%c")
        summary['update_date'] = str(summary['update_time']).split(' ')[0]
        summary['departure_dt'] = r['departure_time']
        summary['departure_date'] = str(r['departure_time'].date())
        summary['departure_time'] = r['departure_time_of_day'][:5]
        summary['departure_day'] = r['departure_day']
        summary['travel_mode'] = r['travel_mode']
        summary['home'] = r['legs'][0]['start_address']
        summary['work'] = r['legs'][0]['end_address']
        summary['route_type'] = r['route_type']
        summary['id'] = r['_id']
        if r['weather'].has_key('start_address'):
            summary['home_weather'] = r['weather']['start_address']['weather']
        else:
            summary['home_weather'] = None
        if r['weather'].has_key('end_address'):
            summary['work_weather'] = r['weather']['end_address']['weather']
        else:
            summary['work_weather'] = None
        if r['legs'][0].has_key('duration_in_traffic'):
            summary['duration_sec'] = r['legs'][0]['duration_in_traffic']['value']
        elif r['legs'][0].has_key('duration'):
            summary['duration_sec'] = r['legs'][0]['duration']['value']
        else:
            summary['duration_sec'] = None
        routes_summary.append(summary)
    return routes_summary

# sort routes summary by update time and departure date
def get_sorted_routes(routes_summary, route_type):
    df = DataFrame(routes_summary)
    if not df.empty and (df.route_type == route_type).sum() > 0:
        df_srt = df[df.route_type == route_type]
        obs = df_srt.sort_values(by=['update_time','departure_dt']).drop_duplicates()
        #print obs.head()
        return obs
    else:
        return DataFrame()

def get_latest_routes(df, latest_update_date):
    dt = datetime.strftime(latest_update_date, '%Y-%m-%d')
    return df[df.update_date == dt]

def get_day_date_pair(df):
    pair_df = df[['departure_day','departure_date']].drop_duplicates()
    return {day: date for day, date in pair_df.values}

# get user from User table
def get_user(username):
    return users.find_one({"username": username})

# s is an object from sStats
def get_weather(s):
    weathers = []
    username = s['username']
    for route_type in ['outbound', 'homebound']:
        for day in s[route_type]:
            weather = None
            try:
                weather = s[route_type][day]['route']['weather']['start_address']['weather']
            except:
                if 'route' in s[route_type][day]:
                    time = s[route_type][day]['route']['departure_time']
                    print "{} weather does not exist for {} on {} for {}".format(route_type, username, day, time)
                else:
                    print "no route for {} for {} on {}".format(username, route_type, day)
            if weather is not None:
                weathers.append(weather)
    return weathers
