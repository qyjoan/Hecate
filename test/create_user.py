#!/usr/bin/env python
####################################################
# Testing Script 1:
#   example of the user data structure
####################################################

import json
import pymongo
from pymongo import MongoClient

user = {u'admin': True,
        u'name': u'jennifer',
        u'route': {u'address': 
            {u'end_location': 
                {u'formatted_address': u'Evergreen Way & Aspen Way, Nederland, CO 80466'},
                u'start_location': {u'formatted_address': u'1470 Walnut Street, Boulder, CO'}
                },
            u'days': [u'Monday', u'Tuesday', u'Wednesday', u'Thursday', u'Friday'],
            u'times': {u'homebound': {
                u'current_duration': 45,
                u'current_start': u'17:15',
                u'earliest_start': u'17:00',
                u'latest_start': u'18:00'},
                u'outbound': {
                    u'current_duration': 35,
                    u'current_start': u'07:15',
                    u'earliest_arrive': u'07:00',
                    u'earliest_start': None,
                    u'latest_arrive': u'09:00',
                    u'latest_start': None}
                },
            u'transportation': u'driving'},
        'username': 'jenn'}

client = MongoClient()
db = client.Hecate
collection = db.User

collection.insert_one(user)
