from pymongo import MongoClient
import pymongo
import pandas as pd
from pandas import DataFrame
from datetime import datetime, timedelta
import googlemaps
import sys,os
from util import utils
from bson.objectid import ObjectId

client = MongoClient()
db = client.Hecate
users = db.User
routes = db.Travel_Route
stats = db.Stats

#api_key = os.environ['GOOGLE_MAP_DIRECTIONS_API_KEY']
api_key = 'AIzaSyBxgR9JMqwLxmrydS3bO6t_GoTr7KRD7kI'
gmaps = googlemaps.Client(key=api_key)

# takes in username, and route_type
# returns a dataframe

class Recommendation:
    
    def __init__(self, username):
        self.username = username
        self.user = self.GetUser(username)
        self.home_address = self.GetHomeAddress()
        self.work_address = self.GetWorkAddress()
        self.travel_days = self.GetTravelDays()
        self.current_departure_times = self.GetCurrentDeparture()
        self.current_durations = self.GetCurrentDuration()
        self.last_recommended = self.GetLastLoad(username)
        self.outbound_routes = None
        self.homebound_routes = None
        self.best_routes = None

    def GetUser(self, username):
        return utils.get_user(username)

    def GetLastLoad(self, username):
        return utils.get_last_load(username).date()

    def GetTravelDays(self):
        return self.user['route']['days'] #list

    def GetHomeAddress(self):
        return self.user['route']['address']['start_location']['formatted_address']

    def GetWorkAddress(self):
        return self.user['route']['address']['end_location']['formatted_address']

    def GetCurrentDeparture(self):
        user = self.user
        result = {}
        for rt in ['outbound', 'homebound']:
            route = user['route']['times'][rt]
            result[rt] = {k: route[k]['current_start'] for k in route.keys()}
        return result

    def GetCurrentDuration(self):
        user = self.user
        result = {}
        for rt in ['outbound', 'homebound']:
            route = user['route']['times'][rt]
            result[rt] = {k: route[k]['current_duration'] for k in route.keys()}
        return result

    def _GetFutureRoutes(self):
        return utils.get_future_routes(self.username) #list

    def _GetSortedFutureRoutes(self, future_routes, route_type):
        if len([route for route in future_routes if route['route_type'] == route_type]) > 0:
            return utils.get_sorted_routes(future_routes, route_type) #DataFrame
        else:
            return DataFrame()

    def GetLatestFutureRoutes(self, route_type):
        routes = self._GetFutureRoutes()
        df = self._GetSortedFutureRoutes(routes, route_type)
        if not df.empty:
            latest_update_date = max([datetime.strptime(x, "%Y-%m-%d") for x in df.update_date.unique()])
            return utils.get_latest_routes(df, latest_update_date)
        else:
            return df

    def _GetMinDuration(self, routes_df):
        return routes_df.groupby('departure_date')['duration_sec'].min()

    def AddMinDuration(self, routes_df):
        obs_min = self._GetMinDuration(routes_df).reset_index()
        obs_min.rename(columns = {'duration_sec': 'duration_min'}, inplace=True)
        return pd.merge(routes_df, obs_min, on = 'departure_date')

    def GetMinDurationDepartureTimes(self, routes_df):
        return routes_df[routes_df.duration_sec == routes_df.duration_min]

    # returns a dictionary of {day -> [[opt_time1, ObjectId1], [opt_time2, ObjectId2]]}
    def MinTravelTimesByDay(self, min_dur_df):
        return {day: (sub_df[['departure_time', 'id', 'duration_sec']].values).tolist() for day, sub_df in min_dur_df.groupby("departure_day")}

    def GetOptimal(self, optimal_times,route_type):
        result = {}
        for day in optimal_times:
            result[day] = {}
            if len(optimal_times[day]) == 1:
                result[day]['id'] = optimal_times[day][0][1]
                result[day]['departure_time'] = optimal_times[day][0][0][:5]
                result[day]['duration_sec'] = optimal_times[day][0][2]
            else:
                ix = utils.get_min_diff(self.current_departure_times[route_type][day], [x[0] for x in optimal_times[day]])
                result[day]['id'] = optimal_times[day][ix][1]
                result[day]['departure_time'] = optimal_times[day][ix][0][:5]
                result[day]['duration_sec'] = optimal_times[day][ix][2]
        return result

    # routes_df is for a specific route_type
    def GetCurrentEstimate(self,routes_df, route_type):
        result = {}
        for day in routes_df.departure_day.unique():
            result[day] = {}
            current_time = self.current_departure_times[route_type][day]
            result[day]['departure_time'] = current_time
            current_dur = routes_df[(routes_df.departure_day == day) & 
                            (routes_df.departure_time == current_time)][['duration_sec','id']].values
            if len(current_dur) > 0:
                result[day]['duration_sec'] = current_dur[0][0]
                result[day]['id'] = current_dur[0][1]
            else:
                current_route = utils.query_route(route_type, self.home_address, self.work_address, departure_time)
                result[day]['duration_sec'] = current_route['legs'][0]['duration_in_traffic']['value']
                result[day]['id'] = None
                result[day]['route'] = current_route
        return result

    def GenerateResult(self, current_estimates, optimal_estimates):
        result = {}
        for day in current_estimates:
            if current_estimates[day]['duration_sec'] <= optimal_estimates[day]['duration_sec']:
                rec = False
                sugg_dep = current_estimates[day]['departure_time']
                sugg_dur = current_estimates[day]['duration_sec']
                time_saved = 0
                if current_estimates[day]['id'] is not None:
                    route = utils.get_one_route(current_estimates[day]['id'])
                else:
                    route = result[day]['route']
            else:
                rec = True
                sugg_dep = optimal_estimates[day]['departure_time']
                sugg_dur = optimal_estimates[day]['duration_sec']
                time_saved = current_estimates[day]['duration_sec'] - optimal_estimates[day]['duration_sec']
                route = utils.get_one_route(optimal_estimates[day]['id'])

            result[day] = {'new_recommendation': rec,
                           'current_departure': current_estimates[day]['departure_time'],
                           'suggested_departure': sugg_dep,
                           'current_duration': current_estimates[day]['duration_sec'],
                           'suggested_duration': sugg_dur,
                           'time_saved': time_saved,
                           'route': route}
        return result

#def query_route(user, route_type, dt, time):
#    start_location = user['route']['address']['start_location']['formatted_address']
#    end_location = user['route']['address']['end_location']['formatted_address']
#    mode = user['route']['transportation']
#    dep_time = datetime.strptime("{} {}".format(dt, time), "%Y-%m-%d %M:%S")
    #print dep_time, mode
#    if dep_time <= datetime.now():
#        dep_time += timedelta(days=7)
#    
#    if route_type == 'outbound':
#        dirs = gmaps.directions(start_location, end_location, mode=mode, departure_time=dep_time)
#    else:
#        dirs = gmaps.directions(end_location, start_location, mode=mode, departure_time=dep_time) 
#    return dirs[0]
#
# takes in dataframe of possible departures and current departure time
# returns index of optimal departure time

#for user in users.find({'username':sys.argv[1]}):
if __name__=="__main__":
    username = "user7"
    recommendation = Recommendation(username) 
    print "======================================="
    print 'Recommending for {user}'.format(user=username)
    
#    result = {}
#    result['username'] = username
    
#    for route_type in ['outbound', 'homebound']:
#        user_stats = stats.find_one({'username': username})
#        result[route_type] = {}
        # get current outbound duration (in min) from user
#        current_starts = user['route']['times'][route_type]
        #for d in current_starts:
        #    print "{}: {}, {}".format(d, current_starts[d]['current_start'],
        #                              current_starts[d]['current_duration'])

        # get routing data from routes
#        df = get_route(username, route_type)
#        if df is None:
#            print "Cannot find route information for {}.".format(username)
#            continue
        # for each user, generate suggestion for each day
        
        # iterate through all the possible departure times of the day
#        for day in user['route']['days']:
            
#            current_start = current_starts.get(day)['current_start']
#            sugg = df[df.departure_day == day]
#            sugg = sugg[sugg.created_date == latest_date(sugg)].drop_duplicates()
            #print current_start
            #print sugg
            # get index of current departure time
            #print day, current_start
            #print "suggested time: {}".format(sugg['time'].unique())
            
            ############################################################
            # 
            ############################################################
#            if (sugg['time'] == current_start).sum() == 0:
#                try:
#                    r = query_route(user, route_type, sugg.date.unique()[0], current_start)
#                except:
#                    print "Skipping {} for user {} on {} due to missing data.".format(route_type, username, day)
#                    continue
#                current_dur = r['legs'][0]['duration_in_traffic']['value']
#                print "Current duration queried: {}".format(current_dur)
#            else:
#                cur_ix = sugg[sugg['time'] == current_start].index[0]
#                current_dur = sugg.ix[cur_ix, 'duration']
            
            ###########################################################
            
#            opt_dur = sugg.duration.min()
            # current departure time is optimal
#            if current_dur <= opt_dur:
#                js = get_result(False, current_start, current_start, current_dur, current_dur)
            
#            else:
                # find optimal time
#                min_ix = get_departure(sugg, current_start)
#                optimal_start = sugg.loc[min_ix, 'departure_time']
#                optimal_start_str = str(optimal_start).split(' ')[1][:5]
#                js = get_result(True, current_start, optimal_start_str, current_dur, opt_dur)
                
                # if user accepts optimal time suggestion
#                user['route']['times'][route_type][day]['current_start'] = optimal_start_str

#            result[route_type][day] = js
#            user['route']['times'][route_type][day]['current_duration'] = opt_dur

    #stats.find_one_and_replace({'username':username}, result, upsert=True)
    
    # update user table
#    user.pop('_id')
#    user['updated_at'] = datetime.now()
#    result['updated_at'] = datetime.now()
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
#    print user
#    stats.insert_one(result)
#    users.find_one_and_replace({'username':username}, user, upsert=False)
