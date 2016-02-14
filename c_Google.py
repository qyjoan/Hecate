#!/usr/bin/env python
#--------------------------------------------------------
# File Name: c_Google.py
# Author: Simon Macarthur
# Date: February 2016
# Version: 0.1 Initial Version
# Purpose: This program uses the Google Maps api to obtain and store in MongoDB
#           route information for specific start and end points, at specific times.
#--------------------------------------------------------

import pymongo
from pymongo import MongoClient
import datetime
from datetime import datetime
from datetime import timedelta
from datetime import date
import json
import googlemaps
import calendar

class Google():

    def __init__(self, start_address, end_address, mode, travel_dates, departure_time_min, departure_time_max):

        #  Initialise the necessary variables
        self.start_address = start_address
        self.end_address = end_address
        self.travel_mode = mode
        self.travel_dates = travel_dates
        self.departure_time_min = departure_time_min
        self.departure_time_max = departure_time_max

        # Number of minutes between each entry.
        self.time_step = 10

        # Read in the Google API Key from the config file

        # TODO: Add Error Handling if config file does not exist
        for line in open("hecate.conf"):
            data = line.split('\n')[0].split('\t')
            api_type = data[0]
            api_key = data[1]

            if api_type == "Google":
                self.api_key = api_key

        # Get the handle to the API
        self.gmaps = googlemaps.Client(key=self.api_key)

    def obtain_Insert_API_Data(self):

        for travel_d in self.travel_dates:
            current_time = self.departure_time_min
            while current_time <= self.departure_time_max:
                c_date_time = str(travel_d) + ' ' + str(current_time)
                d = datetime.strptime(c_date_time, '%Y-%m-%d %H:%M:%S')
                print d

                # TODO: ERROR HANDLING FOR API FAILURES
                directions_result = self.gmaps.directions(self.start_address,
                                             self.end_address,
                                             mode=self.travel_mode,
                                             departure_time=d)

                self.insert_MongoDB(directions_result, d)

                # Increment the time by the time step
                current_time = (datetime.strptime('1900-01-01' + ' ' + str(current_time), '%Y-%m-%d %H:%M:%S') + timedelta(minutes = self.time_step)).time()

    def insert_MongoDB(self, data, departure_time):
        # Connect to Mongo DB
        client = MongoClient()

        db = client.Hecate
        collection = db.Travel_Route

        # TODO REMOVE ANY EXISTING RECORDS
        #collection.remove( {} )
        #deleted =  collection.delete_many({"$and": [{"user.xid": self.id},
        #              {"time_created": {"$gt": start_epoch}}]})

        #print "Deleted %i records" %deleted.deleted_count

        data[0]['departure_time'] = departure_time
        data[0]['departure_day'] = calendar.day_name[departure_time.weekday()]
        data[0]['departure_time_of_day'] = datetime.strftime(departure_time, '%H:%M%p')

        id = collection.insert(data)
        print "Inserted id %s into MongoDB." %id



