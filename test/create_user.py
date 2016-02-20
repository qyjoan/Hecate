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

def get_sec(s):
    l = s.split(':')
    return int(l[0]) * 3600 + int(l[1]) * 60 + int(l[2])

rownum = 0
with open('../Survey_Responses.csv', 'rb') as f:
    reader = csv.reader(f)
    for row in reader:
        if rownum == 0:
            rownum += 1
            continue

        if row[9] <> '':
            username = row[9]
        else:
            username = "user" + str(rownum)

        homebound_start = datetime.datetime.strptime(row[7], '%I:%M:%S %p')
        homebound_earliest = homebound_start - datetime.timedelta(minutes=60)
        homebound_earliest = homebound_earliest.strftime('%I:%M')
        homebound_latest = homebound_start + datetime.timedelta(minutes=60)
        homebound_latest = homebound_latest.strftime('%I:%M')
        homebound_start = homebound_start.strftime("%I:%M")

        # they are now in seconds, subtract and then divide by 60 to get minutes.
        homebound_travel =  get_sec(row[8]) / 60

        outbound_start = datetime.datetime.strptime(row[5], '%H:%M:%S %p')
        outbound_earliest = datetime.datetime.strptime(row[11], '%I:%M:%S %p')
        outbound_earliest = outbound_earliest.strftime('%I:%M')
        outbound_latest = datetime.datetime.strptime(row[12], '%I:%M:%S %p')
        outbound_latest = outbound_latest.strftime('%I:%M')
        outbound_start = outbound_start.strftime("%I:%M")

        # they are now in seconds, subtract and then divide by 60 to get minutes.
        outbound_travel =  get_sec(row[6]) / 60

        user = {u'name': username,
                u'username': username,
                u'password': 'password123',
                u'admin': False,
                u'route': {
                    u'address':
                    {
                        u'end_location': {u'formatted_address': row[2]},
                        u'start_location': {u'formatted_address': row[1]}
                    },
                    u'days': row[3].split(','),
                    u'times': {
                        u'homebound': {
                            u'current_duration': homebound_travel,
                            u'current_start': homebound_start,
                            u'earliest_start': homebound_earliest,
                            u'latest_start': homebound_latest
                        },
                        u'outbound': {
                            u'current_duration': outbound_travel,
                            u'current_start': outbound_start,
                            u'earliest_arrive': outbound_earliest,
                            u'earliest_start': outbound_earliest,
                            u'latest_arrive': outbound_latest,
                            u'latest_start': outbound_latest}
                        },
                    u'transportation': row[4]},
                'created_at': datetime.datetime.now(),
                'updated_at': datetime.datetime.now(),
                'next_check_time': datetime.datetime.now()
                }

        print "Insert user: %s" %username

        rownum += 1

        client = MongoClient()
        db = client.Hecate
        collection = db.User

        collection.insert_one(user)
