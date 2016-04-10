from get_live import WeatherInfluence
import sys
from pymongo import MongoClient

client = MongoClient()
db = client.Hecate
stats = db.Stats

model_constants = {"Rain": 0.055318508764901946,
                   "Snow": 0.06246566009732728}

def add_weather_to_stats(s):
    username = s['username']
    for route_type in['outbound', 'homebound']:
        for day in s[route_type]:
            r = s[route_type][day]
            if r.get('route'):
                dt = r['route']['departure_time']
                weather = None
                try:
                    weather = r['route']['weather']['start_address']['weather']
                except:
                    print "no weather for {usr} on {dep_t} ({day})".format(usr = username,
                                                                           dep_t = dt,
                                                                           day = day)
                    s[route_type][day]['weather_impact'] = 0
                if weather and weather in model_constants:
                    s[route_type][day]['weather_impact'] = r['suggested_duration'] * model_constants[weather]
                else:
                    s[route_type][day]['weather_impact'] = 0
            else:
                s[route_type][day]['weather_impact'] = 0
    return s

def has_weather(s):
    for rt in ['outbound', 'homebound']:
        for day in s[rt]:
            if not 'weather_impact' in s[rt][day]:
                return False
    return True

def run_update(s):
    new_s = add_weather_to_stats(s)
    _id = new_s.pop('_id')
    if has_weather(new_s):
        return _id, new_s

def delete_and_insert(_id, s):
    stats.delete_one({"_id": _id})
    stats.insert(s)
    return "inserted for {}".format(s['username'])

if __name__=="__main__":
    inputs = sys.argv[1]
    if inputs == "all":
        for s in stats.find():
            print s['username']
            res = run_update(s)
            if res is not None:
                _id, new_s = res
                delete_and_insert(_id, new_s)
            else:
                print "Stats not updated properly."

    else:
        print "adding weather impact to {}".format(inputs)
        for s in stats.find({"username": inputs}):
            res = run_update(s)
            if res is not None:
                _id, new_s = res
                delete_and_insert(_id, new_s)
            else:
                print "Stats not updated for {}".format(inputs)
