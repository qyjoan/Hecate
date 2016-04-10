from pandas import DataFrame
from pymongo import MongoClient
from datetime import datetime
import sys

client = MongoClient()
db = client.Hecate
users = db.User
routes = db.Travel_Route
stats = db.Stats

def creation_history(username, route_type):
    runs = []
    for r in routes.find({"username": username, "live": False, "route_type": route_type}):
        runs.append({'created_date': datetime.strptime(r['created_date'],"%c"), 'departure_time':r['departure_time']})
    return runs

def main(username, route_type="outbound"):
    hist = creation_history(username, route_type)
    df = DataFrame(hist)
    df_srt = df.sort_values(by=['created_date','departure_time'])
    df_srt['creation'] = df_srt.created_date.apply(lambda x: str(x).split(' ')[0])
    creation_dates = df_srt.creation.unique()
    last_creation = creation_dates[-1]
    last_departure = str(df_srt[df_srt.creation == last_creation].tail(1)['departure_time'].values[0]).split('.')[0]
    return creation_dates[-1], last_departure, route_type, username


if __name__=="__main__":
    kind = sys.argv[1]
    if kind == 'all':
        for user in users.find():
             username = user['username']
             creatin_date, last_departure, route_type, username = main(username)
             print creatin_date, last_departure, route_type, username
    else:
        creatin_date, last_departure, route_type, username = main(kind)
        print creatin_date, last_departure, route_type, username
