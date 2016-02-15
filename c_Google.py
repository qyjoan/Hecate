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
from prettytable import PrettyTable
import time

class Google():

    def __init__(self, start_address, end_address, mode, travel_dates, departure_time_min, departure_time_max, username):

        #  Initialise the necessary variables
        self.start_address = start_address
        self.end_address = end_address
        self.travel_mode = mode
        self.travel_dates = travel_dates
        self.departure_time_min = departure_time_min
        self.departure_time_max = departure_time_max
        self.user_name = username

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
                if d >= datetime.today():

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
        data[0]['created_date'] = time.strftime("%c")
        data[0]['username'] = self.user_name

        id = collection.insert(data)
        print "Inserted id %s into MongoDB." %id


    def output_data(self):
        # Connect to Mongo DB
        client = MongoClient()

        db = client.Hecate
        collection = db.Travel_Route

        # Operate on the returned JSON data as a python dictionary
        # Note that, for this data_url, the returned JSON data contains "meta" and "data"
        data = collection.find({ 'username' : self.user_name })

        x = PrettyTable(['Added Date', 'Day', 'Time', 'Start Location', 'End Location', 'Duration', 'Duration (Traffic)'])
        for item in data:

            route = item['legs'][0]
            added = item['created_date']
            day = item['departure_day']
            time = item['departure_time_of_day']
            start = route['start_address']
            end = route['end_address']
            duration = route['duration']['text']
            duration_in_traffic = route['duration_in_traffic']['text']

            x.add_row([added, day, time, start, end, duration, duration_in_traffic])
        print x.get_string(sortby="Added Date")

