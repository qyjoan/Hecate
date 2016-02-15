#!/usr/bin/env python
####################################################
# Testing Script 1:
#   example of the user data structure
####################################################

import json
import pymongo
from pymongo import MongoClient

user_joan = {u'admin': True,
        u'name': u'joan',
        u'route': {u'address': 
            {u'end_location': 
                {u'formatted_address': u'San Bruno Bart Station, San Francisco'},
                u'start_location': {u'formatted_address': u'Civic Center, San Francisco'}
                },
            u'days': [u'Monday', u'Tuesday', u'Wednesday', u'Thursday', u'Friday'],
            u'times': {u'homebound': {
                u'current_duration': 40,
                u'current_start': u'17:20',
                u'earliest_start': u'17:00',
                u'latest_start': u'18:00'},
                u'outbound': {
                    u'current_duration': 40,
                    u'current_start': u'08:00',
                    u'earliest_arrive': u'08:30',
                    u'earliest_start': None,
                    u'latest_arrive': u'09:30',
                    u'latest_start': None}
                },
            u'transportation': u'driving'},
        'username': 'qyjoan'}

client = MongoClient()
db = client.Hecate
collection = db.User

collection.insert_one(user_joan)
