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

results = collection.find({'username': 'user7'})
for item in results:
    outbound = {}
    homebound = {}

    outbound = item["route"]["times"]["outbound"]
    homebound = item["route"]["times"]["homebound"]
    days = list(item["route"]["days"])

    outbound_times = []
    homebound_times = []
    first = True

    for day in days:
        if first:
            r = collection.update_one({
                '_id': item["_id"]
                },{
                '$unset': {
                    'route.times.outbound' : "",
                    'route.times.homebound' : ""
            }
            }, upsert=False)

            first = False

        r = collection.update_one({
            '_id': item["_id"]
            },{
            '$set': {
                'route.times.outbound.' + day: outbound,
                'route.times.homebound.' + day : homebound
        }
        }, upsert=False)
        if r.modified_count > 0:
            print "Updated\t%s\t%s" %(item['_id'], item['username'])
        else:
            print "Could not update\t%s\t%s" %(item['_id'], item['username'])