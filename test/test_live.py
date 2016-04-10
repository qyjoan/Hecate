from pymongo import MongoClient
import pymongo
from pandas import DataFrame
import numpy as np
from datetime import datetime
import sys
from bson.objectid import ObjectId

client = MongoClient()
db = client.Hecate
users = db.User
routes = db.Travel_Route

stats = db.Stats

# get all live ids
ids = []
for route in routes.find({"live": True}):
    _id = route['_id']
    ids.append(_id)


# takes in username, and route_type
# returns a dataframe
def get_route(username, route_type):
    runs = []
    if routes.find({'username': username, 'route_type': route_type}).count() == 0:
        return
    for route in routes.find({'username': username,'route_type': route_type, 'live': False}):
        duration_str = route['legs'][0]['duration_in_traffic']['text']
        duration = int(duration_str.split(' ')[0])
        departure_day = route['departure_day']
        departure_time = route['departure_time']
        travel_mode = route['travel_mode']
        created_date = datetime.strptime(route['created_date'], "%c").date()
        runs.append({'departure_day':departure_day,
                     'departure_time':departure_time,
                     'duration':duration,
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

def get_live():
    for id in ids:
        route = routes.find_one({"_id": ObjectId(id)})
        yield {"username": route['username'],
               "departure_time": route['departure_time'],
               "route_type": route['route_type'],
               "duration":route['legs'][0]['duration']}

def compare(live_dur, pred_dur):
    avg_diff = np.array([live_dur - x for x in pred_dur]).mean()
    dp_cnt = len(pred_dur)
    return {'average_diff': avg_diff, 'live_dur': live_dur, 'datapoint_cnt': dp_cnt}

if __name__ == "__main__":
    gen = get_live()
    no_dp = 0
    results = []
    thres = int(sys.argv[1])
    for user in gen:
        diffs = []
        username = user['username']
        route_type = user['route_type']
        date = str(user['departure_time'].date())
        departure_time_live = user['departure_time']
        df = get_route(username, route_type)
        sugg = df[df.date == date].drop_duplicates()
        
        for ix, r in sugg.iterrows():
            diff = max(r.departure_time, departure_time_live) - min(r.departure_time, departure_time_live)
            diff = diff.total_seconds()
            # print str(r.departure_time), str(departure_time_live), diff
            if diff <= thres * 60:
                diffs.append(r.duration)
        
        if len(diffs) > 0:
            comp = compare(int(user['duration']['text'].split(' ')[0]), diffs)
            results.append((str(departure_time_live).split(' ')[1], comp['average_diff'], comp['live_dur'], comp['datapoint_cnt'], username))
        else:
            no_dp += 1
        
    for res in sorted(results):
        print res
    print "====================="
    print "Number of live data points with no {}min before/after: {}".format(thres, no_dp)
