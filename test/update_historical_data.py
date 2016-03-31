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
collection = db.Travel_Route

update_count = 0
# 1. All records that don't have the key 'live' to be inserted as 'false'
results = collection.find({'live': { '$exists': False}})
for item in results:
    r = collection.update_one({
        '_id': item["_id"]
        },{
        '$set': {
            'live' : False
    }
    }, upsert=False)

    if r.modified_count > 0:
        update_count += 1

print 'Live added to %s records' %update_count

update_count = 0
# 1. All records that don't have the key 'live' to be inserted as 'false'
results = collection.find({'method_time': { '$exists': False}})
for item in results:
    r = collection.update_one({
        '_id': item["_id"]
        },{
        '$set': {
            'method_time': 'departure'
    }
    }, upsert=False)

    if r.modified_count > 0:
        update_count += 1

print 'Method Time added to %s records' %update_count

update_count = 0
# 3. All records that don't have the key 'start_address' to be added
results = collection.find({'start_address': { '$exists': False}})
#results = collection.find()
for item in results:
    start = {}
    start = item['legs']
    address = start[0]['start_address']
    r = collection.update_one({
        '_id': item["_id"]
        },{
        '$set': {
            'start_address': address
    }
    }, upsert=False)


    if r.modified_count > 0:
        update_count += 1

print 'Start Address added to %s records' %update_count

update_count = 0
# 4. All records that don't have the key 'end_address' to be added
results = collection.find({'end_address': { '$exists': False}})
#results = collection.find()
for item in results:
    start = {}
    start = item['legs']
    address = start[0]['end_address']
    r = collection.update_one({
        '_id': item["_id"]
        },{
        '$set': {
            'end_address': address
    }
    }, upsert=False)


    if r.modified_count > 0:
        update_count += 1

print 'End Address added to %s records' %update_count


update_count = 0
results = collection.find({'departure_time_of_day': { '$exists': False}})
for item in results:
    d = datetime.datetime.strftime(item['departure_time'], '%H:%M')
    r = collection.update_one({
        '_id': item["_id"]
        },{
        '$set': {
            'departure_time_of_day': str(d)
    }
    }, upsert=False)


    if r.modified_count > 0:
        update_count += 1

print 'Departure Time added to %s records' %update_count


update_count = 0
# Travel Mode
results = collection.find({'travel_mode': { '$exists': False}})
user_collection = db.User

#results = collection.find()
for item in results:
    user_results = user_collection.find({'username': item['username']})

    for u in user_results:
        travel_mode = u['route']['transportation']

    r = collection.update_one({
        '_id': item["_id"]
        },{
        '$set': {
            'travel_mode': travel_mode
    }
    }, upsert=False)


    if r.modified_count > 0:
        update_count += 1

print 'Travel Mode added to %s records' %update_count


update_count = 0
# Route Type and Travel Mode
results = collection.find({'route_type': { '$exists': False}})
for item in results:
    d = datetime.datetime.strftime(item['departure_time'], '%H:%M')

    if d < '12:00':
        route_type = 'outbound'
    else:
        route_type = 'homebound'

    r = collection.update_one({
        '_id': item["_id"]
        },{
        '$set': {
            'route_type': route_type
    }
    }, upsert=False)


    if r.modified_count > 0:
        update_count += 1

print 'Route Type added to %s records' %update_count


    # r = collection.update_one({
    #     '_id': item["_id"]
    #     },{
    #     '$unset': {
    #         'start_address' : ""
    # }
    # }, upsert=False)
