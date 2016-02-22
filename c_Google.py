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
import googlemaps.exceptions
import calendar
from prettytable import PrettyTable
import time

class Google():

    def __init__(self, start_address, end_address, mode, travel_dates, departure_time_min, departure_time_max, arrival_time_min, arrival_time_max, username, time_type):

        #  Initialise the necessary variables
        self.start_address = start_address
        self.end_address = end_address
        self.travel_mode = mode
        self.travel_dates = travel_dates
        self.departure_time_min = departure_time_min
        self.departure_time_max = departure_time_max
        self.user_name = username
        self.arrival_time_min = arrival_time_min
        self.arrival_time_max = arrival_time_max
        self.time_type = time_type

        # Number of minutes between each entry.
        self.time_step = 10

        # Read in the Google API Key from the config file

        self.read_API_Key(1)

        # Get the handle to the API
        self.gmaps = googlemaps.Client(key=self.api_key)

    def read_API_Key(self, number):
        # TODO: Add Error Handling if config file does not exist
        for line in open("hecate.conf"):
            data = line.split('\n')[0].split('\t')
            api_type = data[0]
            api_key = data[1]

            if api_type == "Google" + str(number):
                self.api_key = api_key
                self.api_key_number = number
                print "API Key Updated - Key #%i" %number

    def obtain_Insert_API_Data(self):

        print "%s\tUpdating for user %s" %(datetime.now(),self.user_name)
        print "%s\tRoute Start: %s" %(datetime.now(),self.start_address)
        print "%s\tRoute End: %s" %(datetime.now(),self.end_address)

        for travel_d in self.travel_dates:

            # if arrival time is available, use arrival time as referrence
            # Note: Problem is using arrival time is that duration_in_traffic
            #       will not be populated. (https://goo.gl/rnFLAo)
            if self.time_type == 'arrival':
                current_time = self.arrival_time_min
                upper_bound = self.arrival_time_max
            else:
                current_time = self.departure_time_min
                upper_bound = self.departure_time_max

            while current_time <= upper_bound:
                c_date_time = str(travel_d) + ' ' + str(current_time)
                d = datetime.strptime(c_date_time, '%Y-%m-%d %H:%M:%S')
                if d >= datetime.today():
                    print "\t %s\tUpdating Route for departure time: %s" %(datetime.now(), d)

                    # TODO: ERROR HANDLING FOR API FAILURES
                    try:
                        if self.time_type == 'arrival':
                            directions_result = self.gmaps.directions(self.start_address,
                                    self.end_address,
                                    mode=self.travel_mode,
                                    arrival_time=d)
                        else:
                            directions_result = self.gmaps.directions(self.start_address,
                                    self.end_address,
                                    mode=self.travel_mode,
                                    departure_time=d)

                        self.insert_MongoDB(directions_result, d)

                        # Sleep 10 seconds
                        time.sleep(10)

                    except googlemaps.exceptions.ApiError:
                        print "Google Maps API Error. Retry Later."

                    except googlemaps.exceptions.HTTPError:
                        print "Google Maps HTTP Error. Retry Later."

                    except googlemaps.exceptions.Timeout:
                        print "Google Maps Timeout. Trying New Key."

                        # If we are using the first API Key, swap to the second and vice versa
                        if self.api_key_number == 1:
                            self.read_API_Key(2)
                        else:
                            self.read_API_Key(1)

                    except googlemaps.exceptions.TransportError:
                        print "Google Maps Transport Error. Retry Later."



                # Increment the time by the time step
                current_time = (datetime.strptime('1900-01-01' + ' ' + str(current_time), '%Y-%m-%d %H:%M:%S') + timedelta(minutes = self.time_step)).time()

            print "\t---------------------------------------"
        print "\t---------------------------------------\n\n"

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
        data[0]['start_address'] = self.start_address
        data[0]['end_address'] = self.end_address
        data[0]['travel_mode'] = self.travel_mode
        data[0]['method_time'] = self.time_type # Depature time or Arrival Time

        id = collection.insert(data)
        #print "Inserted id %s into MongoDB." %id

    # Print the output
    def output_data(self):
        # Connect to Mongo DB
        client = MongoClient()

        db = client.Hecate
        collection = db.Travel_Route

        # Operate on the returned JSON data as a python dictionary
        # Note that, for this data_url, the returned JSON data contains "meta" and "data"
        data = collection.find({ 'username' : self.user_name })

        x = PrettyTable(['Added Date', 'Day', 'Time', 'Start Location', 'End Location', 'Duration'])
        for item in data:

            route = item['legs'][0]
            added = item['created_date']
            day = item['departure_day']
            time = item['departure_time_of_day']
            start = route['start_address']
            end = route['end_address']
            duration = route['duration']['text']
            if 'duration_in_traffic' in route:
                duration_in_traffic = route['duration_in_traffic']['text']
                if 'Duration (Traffic)' not in x.field_names:
                    x.add_column("Duration (Traffic)",[])
                x.add_row([added, day, time, start, end, duration, duration_in_traffic])
            else:
                x.add_row([added, day, time, start, end, duration])
        print x.get_string(sortby="Added Date")

