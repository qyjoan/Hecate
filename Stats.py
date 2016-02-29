# Work In Progress
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

# if new user
for user in users.find({"username": sys.argv[1]}):
    print user["username"]
    username = user['username']

    # new user (no stats have been generated for this user)
    if not stats.find_one({'username': username}):

        for route_type in ['outbound', 'homebound']:
        # get current outbound duration (in min) from user
            current_duration = user['route']['times'][route_type]['current_duration']
            current_start = user['route']['times'][route_type]['current_start']

            # get routing data from routes
            runs = []
            for route in routes.find({'username': username}):
                # TODO: need to handle the case where duration_in_traffic doesn't exist
                duration_str = route['legs'][0]['duration_in_traffic']['text']
                # TODO: need to check if it's always in minutes
                dur = int(duration_str.split(' ')[0])
                departure_day = route['departure_day']
                departure_time = route['departure_time']
                route_type = route['route_type']
                travel_mode = route['travel_mode']

                runs.append({'departure_day':departure_day,
                    'departure_time':departure_time,
                    'duration':dur,
                    'route_type':route_type,
                    'travel_mode': travel_mode})

            df = DataFrame(runs)
            # add duration_min as a column for each departure day
            df['duration_min'] = df.groupby('departure_day')['duration'].transform(min)
        
            res = df[df['duration'] == df['duration_min']]
            res = res[res['duration'] < current_duration]
            # for each user, generate suggestion for each day
        
            # {'username': 'qyjoan', {'outbound':{'monday': {'new_recommendation':,
            #                                                'current_departure':,
            #                                                'suggested_departure':,
            #                                                'current_duration':,
            #                                                'suggested_route_duration':,
            #                                                'time_saved':
            #                                                }
            #                                     }
            #                        }
            #                        {'homebound':{'monday':{'new_recommendation':, #True/False
            #                                                'current_departure':,  
            #                                                'suggested_departure':,
            #                                                'current_duration':,
            #                                                'suggested_route_duration':,
            #                                                'time_saved':
            #                                                }
            #                                     }
            #                        }
            #}
            result = {}
            result['username'] = username
            result[route_type] = {}

            # iterate through all the possible departure times of the day
            for day in user['route']['days']:
                
                # no recommendation
                if day not in res.departure_day.unique():
                    result[route_type][day] = {'new_recoomendation':False,
                            'current_departure': current_start,
                            'suggested_departure': None,
                            'current_duration': current_duration,
                            'suggested_duration': None,
                            'time_saved': None}
                    continue

                # and pick the closest to current departure time
                diff = float('inf')
                sugg = res[res.departure_day == day]
                min_ix = -1

                for idx in sugg.index:
                    t_sugg = sugg.ix[idx, 'departure_time']
                
                    # get date of t_sugg
                    date = datetime.strftime(t_sugg.date(), "%Y-%m-%d")
                    c_dt = datetime.strptime("{d} {t}".format(d = date,
                                                              t = current_start),
                                             "%Y-%m-%d %H:%M")
                    lag = max(c_dt, t_sugg.to_datetime()) - min(c_dt, t_sugg.to_datetime())
                    
                    if lag.seconds < diff:
                        diff = lag.seconds
                        min_ix = idx
            
                suggested_time = sugg.ix[min_ix, 'departure_time']
                suggested_duration = sugg.ix[min_ix, 'duration']
                time_saved = current_duration - suggested_duration

                result[route_type][day] = {'current_departure': current_start,
                        'suggested_departure' : str(suggested_time).split(' ')[1][:-3],
                        'current_duration': current_duration,
                        'suggested_route_duration': suggested_duration,
                        'time_saved' : time_saved}

                if str(suggested_time) != current_start:
                    result[route_type][day]['new_recommendation'] = True 
                else:
                    result[route_type][day]['new_recommendation'] = False
            
            print result

    else:
        pass
