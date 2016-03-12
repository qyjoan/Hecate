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
def get_route(username, route_type, defense):
    runs = []
    if routes.find({'username': username, 'route_type': route_type}).count() == 0:
        return
    for route in routes.find({'username': username,'route_type': route_type}):
        if route['legs'][0].has_key('duration_in_traffic'):
            duration_str = route['legs'][0]['duration_in_traffic']['text']
            duration = int(duration_str.split(' ')[0])
            departure_day = route['departure_day']
            departure_time = route['departure_time']
            travel_mode = route['travel_mode']
            created_date = datetime.strptime(route['created_date'], "%c").date()
        #if not (defense == False and str(departure_time).split(' ')[1][0] == '0' and route_type == 'homebound'):
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

def latest_date(df):
    dates = df.created_date.unique()
    max_date = max(dates)
    return max_date

def main(user):
    username = user['username']
    for route_type in user['route']['times'].keys():
        print route_type
        current_starts = user['route']['times'][route_type]
    
        df = get_route(username, route_type, False)
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
            print "{}: current start: {}".format(day, current_start),
            print "earliest start: {}".format(current_starts[day]['earliest_start']),
            print "latest start: {}".format(current_starts[day]['latest_start'])
            print "suggested time avilable: {}".format(sugg['time'].unique())
            

if __name__ == "__main__":
    username = sys.argv[1]
    if username == "all":
        for user in users.find():
            print "========================"
            print user['username']
            main(user)
    else:
        if users.find({"username":username}).count() == 0:
            print "User {} not found".format(username)
        else:
            print username
            user = users.find_one({"username":username})
            main(user) 
