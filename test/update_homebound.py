#!/usr/bin/env python
####################################################
# Testing Script 1:
#   example of the user data structure
####################################################

import json
import pymongo
from pymongo import MongoClient
import csv
import datetime
import time
from datetime import timedelta


def get_sec(s):
    l = s.split(':')
    return int(l[0]) * 3600 + int(l[1]) * 60 + int(l[2])

client = MongoClient()
db = client.Hecate
collection = db.User

results = collection.find()
for item in results:
    homebound = item["route"]["times"]["homebound"]
    latest = item["route"]["times"]["homebound"]["latest_start"]
    current_start = item["route"]["times"]["homebound"]["current_start"]

    print earliest, latest, current_start

    earliest_upd = (datetime.datetime.strptime(earliest, '%H:%M') + timedelta(hours=12))
    latest_upd = (datetime.datetime.strptime(latest, '%H:%M') + timedelta(hours=12))
    current_upd = (datetime.datetime.strptime(current_start, '%H:%M') + timedelta(hours=12))

    r = collection.update_one({
        '_id': item["_id"]
        },{
        '$set': {
            'route.times.homebound.earliest_start': datetime.datetime.strftime(earliest_upd, '%H:%M'),
            'route.times.homebound.latest_start': datetime.datetime.strftime(latest_upd, '%H:%M'),
            'route.times.homebound.current_start': datetime.datetime.strftime(current_upd, '%H:%M')
    }
    }, upsert=False)

    if r.modified_count > 0:
        print "Updated\t%s\t%s" %(item['_id'], item['username'])
    else:
        print "Could not update\t%s\t%s" %(item['_id'], item['username'])