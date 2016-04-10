from pymongo import MongoClient
import pymongo
import pandas as pd
from datetime import datetime

client = MongoClient()
db = client.Hecate
routes = db.Travel_Route

class WeatherInfluence(object):
    def __init__(self, username):
        self.username = username

    def _GetLiveData(self):
        return [r for r in routes.find({"live": True, "username": self.username})]

    def _ExtractFieldsFromRoute(self, fields, route):
        result = {}
        for colname in fields:
            cur = route
            paths = fields[colname].split('.')
            for f in paths:
                if f.startswith('[') and type(cur) == list:
                    cur = cur[eval(f)[0]]
                elif cur.get(f):
                    cur = cur[f]
                else:
                    cur = None
            result[colname] = cur
        return result

    def GenerateLiveDataFrame(self):
        live_data = self._GetLiveData()
        df_columns = {'end_address_weather':'weather.end_address.weather',
                      'start_address_weather':'weather.start_address.weather',
                      'route_type': 'route_type',
                      'duration': 'legs.[0].duration_in_traffic.value',
                      'departure_dt':'departure_time',
                      'departure_day': 'departure_day',
                      'start_address':'legs.[0].start_address',
                      'end_address': 'legs.[0].end_address',
                      'created_date': 'created_date'
                     }
        runs = [self._ExtractFieldsFromRoute(df_columns, x) for x in live_data]
        df = pd.DataFrame(runs)
        return df
