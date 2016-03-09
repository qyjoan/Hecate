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

class User():

    username = None #string
    name = None  #string
    admin = None  #{True, False}
    start_location = None #string (city, country required)
    end_location = None #string (city, country required)
    transportation = None #{'driving','bicycling','transit','walking'}
    travel_days = None #['Sunday','Monday',...,'Saturday']
    outbound_time = None #[{'Sunday', earliest_start, latest_start, earliest_arrive, ...}]
    homebound_time = None #[{'Sunday', earliest_home, latest_home, current_home, ...}]
    next_check_time = None # Next time to poll the API to get updated details.

    # earliest_home = None  #'hh:mm' leaving for home time
    # latest_home = None  #'hh:mm' leaving for home time
    # user = None  #string
    # current_start = None #'hh:mm' current leaving for work time
    # current_duration_start = None #int (minutes)
    # current_home = None #'hh:mm' current leaving for home time
    # current_duration_home = None #int (minutes)

    def __init__(self, username):
        #  Initialise the necessary variables
        self.username = username

    def Initialise(self):

        # Connect to MongoDB
        client = MongoClient()

        db = client.Hecate
        collection = db.User

        # Obtain the user details from the DB
        user = collection.find_one({'username': self.username})

        # Initialise necessary items
        self.name = user['name']
        self.admin = user['admin']
        self.start_location = user['route']['address']['start_location']['formatted_address']
        self.end_location = user['route']['address']['end_location']['formatted_address']
        self.transportation = user['route']['transportation']
        self.travel_days = user['route']['days']

        # TODO: Update these to be a dictionary for each day
        outbound = {}
        for day in user['route']['times']['outbound']:
            d = {}
            d['day'] = day
            d['earliest_start'] = user['route']['times']['outbound'][day]['earliest_start']
            d['latest_start'] = user['route']['times']['outbound'][day]['latest_start']
            d['earliest_arrive'] = user['route']['times']['outbound'][day]['earliest_arrive']
            d['latest_arrive'] = user['route']['times']['outbound'][day]['latest_arrive']
            d['current_start'] = user['route']['times']['outbound'][day]['current_start']
            d['current_duration_start'] = user['route']['times']['outbound'][day]['current_duration']
            outbound[day] = d

        self.outbound_time = outbound

        homebound = {}
        for day in user['route']['times']['homebound']:
            d = {}
            d['day'] = day
            d['earliest_home'] = user['route']['times']['homebound'][day]['earliest_start']
            d['latest_home'] = user['route']['times']['homebound'][day]['latest_start']
            d['current_home'] = user['route']['times']['homebound'][day]['current_start']
            d['current_duration_home'] = user['route']['times']['homebound'][day]['current_duration']
            homebound[day] = d

        self.homebound_time = homebound

        # TODO: Update these to be a dictionary for each day

        self.next_check_time = user['next_check_time']

        self.user = user

    def print_Details(self):
        print "Name: %s" %self.name
        print "Admin: %s" %self.admin
        print "Start Location: %s" %self.start_location
        print "End Location: %s" %self.end_location
        print "Transportation: %s" %self.transportation
        print "Travel Days: %s" %self.travel_days
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
        return self.travel_days

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