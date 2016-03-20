#!/usr/bin/env python
#--------------------------------------------------------
# File Name: c_User.py
# Author: Simon Macarthur
# Date: February 2016
# Version: 0.1 Initial Version
# Purpose: This program manages the User Profile record in MongoDB
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
import os
import sys

class User():

    username = None #string
    name = None  #string
    admin = None  #{True, False}
    start_location = None #string (city, country required)
    end_location = None #string (city, country required)
    transportation = None #{'driving','bicycling','transit','walking'}
    days = None #['Sunday','Monday',...,'Saturday']
    outbound = None #[{'Sunday', earliest_start, latest_start, earliest_arrive, ...}]
    homebound = None #[{'Sunday', earliest_home, latest_home, current_home, ...}]
    next_check_time = None # Next time to poll the API to get updated details.
    route = None
    password = None

    def Initialise(self, username):
        try:
            self.username = username

            # Connect to MongoDB
            client = MongoClient()

            db = client.Hecate
            collection = db.User

            # Obtain the user details from the DB
            user = collection.find_one({'username': self.username})

            if user <> None:

                # Initialise necessary items
                self.name = user['name']
                self.admin = user['admin']
                self.start_location = user['route']['address']['start_location']['formatted_address']
                self.end_location = user['route']['address']['end_location']['formatted_address']
                self.transportation = user['route']['transportation']
                self.days = user['route']['days']

                outbound_times = {}
                for day in user['route']['times']['outbound']:
                    d = {}
                    d['day'] = day
                    d['earliest_start'] = user['route']['times']['outbound'][day]['earliest_start']
                    d['latest_start'] = user['route']['times']['outbound'][day]['latest_start']
                    d['earliest_arrive'] = user['route']['times']['outbound'][day]['earliest_arrive']
                    d['latest_arrive'] = user['route']['times']['outbound'][day]['latest_arrive']
                    d['current_start'] = user['route']['times']['outbound'][day]['current_start']
                    d['current_duration'] = user['route']['times']['outbound'][day]['current_duration']
                    outbound_times[day] = d

                self.outbound = outbound_times

                homebound_times = {}
                for day in user['route']['times']['homebound']:
                    d = {}
                    d['day'] = day
                    d['earliest_home'] = user['route']['times']['homebound'][day]['earliest_start']
                    d['latest_home'] = user['route']['times']['homebound'][day]['latest_start']
                    d['current_home'] = user['route']['times']['homebound'][day]['current_start']
                    d['current_duration'] = user['route']['times']['homebound'][day]['current_duration']
                    homebound_times[day] = d

                self.homebound = homebound_times

                self.next_check_time = user['next_check_time']
                self.password = user['password']

            else:
                print "ERROR: User Not Found"
                return "ERROR: User Not Found"

        except Exception, e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)


    # CreateUser: Creates a user record in the Mongo Collection
    # Parameter: user - a dictionary object with all necessary items to populate the record
    # Returns: Error Message, or Success.
    def CreateUser(self, user):

        # Connect to MongoDB
        client = MongoClient()

        db = client.Hecate
        collection = db.User

        user_count = collection.find_one({'username': user['username']})

        if user_count > 0:
            return "Error: User Already Exists"

        result = collection.insert(user)

        return "User Successfully Created"

    def print_Details(self):
        print "Name: %s" %self.name
        print "Admin: %s" %self.admin
        print "Start Location: %s" %self.start_location
        print "End Location: %s" %self.end_location
        print "Transportation: %s" %self.transportation
        print "Travel Days: %s" %self.days
        print "Earliest Start: %s" %self.earliest_start
        print "Latest Start: %s" %self.latest_start
        print "Earliest Arrive: %s" %self.earliest_arrive
        print "Latest Arrive: %s" %self.latest_arrive
        print "Earliest Home: %s" %self.earliest_home
        print "Latest Home: %s" %self.latest_home
        print "Current Start: %s" %self.current_start
        print "Current Outbound Duration: {} min".format(self.current_duration_start)
        print "Current Home: %s" %self.current_home
        print "Current Inbound Duration: {} min".format(self.current_duration_home)
        print "Next API Poll at %s" %self.next_check_time

    def get_Name(self):
        return self.Name

    def get_Admin(self):
        return self.admin

    def get_Start_Address(self):
        return self.start_location

    def get_End_Address(self):
        return self.end_location

    def get_Transportation(self):
        return self.transportation

    def get_Travel_Days(self):
        return self.days

    def get_Earliest_Start(self):
        return self.earliest_start

    def get_Latest_Start(self):
        return self.latest_start

    def get_Latest_Start(self):
        return self.latest_start

    def get_Current_Start(self):
        return self.current_start

    def get_Current_Outbound_Duration(self):
        return self.current_duration_start

    def get_Earliest_Arrive(self):
        return self.earliest_arrive

    def get_Latest_Arrive(self):
        return self.latest_arrive

    def get_Earliest_Home(self):
        return self.earliest_home

    def get_Latest_Home(self):
        return self.latest_home

    def get_Current_Home(self):
        return self.current_home

    def get_Current_Inbound_Duration(self):
        return self.current_duration_home

    def get_Next_Check_Time(self):
        return self.next_check_time

    def set_Password(self, password):
        self.user['password'] = password

    def set_Name(self, name):
        self.user['name'] = name

    def set_Admin(self, admin):
        self.user['admin'] = admin

    # Type - 'homebound', 'outbound' - refers to the mongo schema name
    def set_Current_Duration(self, type, duration):
        self.current_start = duration
        field = "route.times." + type + ".current_duration"
        result = self.update_Mongo(field , duration)
        print result

    # Type - 'homebound', 'outbound' - refers to the mongo schema name
    def set_Current_Start(self, type, start):
        self.current_start = start
        field = "route.times." + type + ".current_start"
        result = self.update_Mongo(field , start)
        print result

    # Update the next time the API is to be polled
    def set_Next_Check_Time(self, next_time):
        self.next_check_time = next_time
        result = self.update_Mongo("next_check_time", next_time)

    # Push the changes to Mongo - pass a key, value pair
    def update_Mongo(self, key, value):
        # Connect to MongoDB
        client = MongoClient()

        db = client.Hecate
        collection = db.User

        result = collection.update_one(
            {'username': self.username},
            {
                "$set":{
                    key: value
                }
            }
        )

        return result.modified_count

    def update_Entire_User(self, user_document):
        # Connect to MongoDB
        client = MongoClient()

        db = client.Hecate
        collection = db.User
        user_document = json.loads(user_document)
        user_document['next_check_time'] = datetime.now()
        user_document['updated_at'] = datetime.now()


        result = collection.replace_one(
            {'username': self.username},user_document)

        return result.modified_count

# TODO: CREATE A NEW USER OBJECT TO MATCH THAT IN MONGO

    def JSON_Output(self):
        output = {}

        output['username'] = self.username

        # Initialise necessary items
        output['name'] = self.name
        output['admin'] = self.admin

        output['route'] = {}

        address = {}
        address['start_location'] = {}
        address['start_location']['formatted_address'] = self.start_location
        address['end_location'] = {}
        address['end_location']['formatted_address'] = self.end_location
        output['route']['address'] = address

        output['route']['transportation'] = self.transportation
        output['route']['days'] = list(self.days)

        output['route']['times'] = {}
        output['route']['times']['outbound'] = {}
        for day in self.outbound: #user['route']['times']['outbound']:
            d = {}
            d['earliest_start'] = self.outbound[day]['earliest_start']
            d['latest_start'] = self.outbound[day]['latest_start']
            d['earliest_arrive'] = self.outbound[day]['earliest_arrive']
            d['latest_arrive'] = self.outbound[day]['latest_arrive']
            d['current_start'] = self.outbound[day]['current_start']
            d['current_duration'] = self.outbound[day]['current_duration']
            output['route']['times']['outbound'][day] = d

        output['route']['times']['homebound'] = {}
        for day in self.homebound:
            d = {}
            d['earliest_start'] = self.homebound[day]['earliest_home']
            d['latest_start'] = self.homebound[day]['latest_home']
            d['current_start'] = self.homebound[day]['current_home']
            d['current_duration'] = self.homebound[day]['current_duration']
            output['route']['times']['homebound'][day] = d

        output['password'] = self.password
        output['next_check_time'] = ''

        return json.dumps(output)