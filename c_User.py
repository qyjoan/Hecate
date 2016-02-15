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
    transportation = None #{'DRIVING','BICYCLING','TRANSIT','WALKING'}
    travel_days = None #['sunday','monday',...,'saturday']
    earliest_start = None #'hh:mm'
    latest_start = None   #'hh:mm'
    earliest_arrive = None  #'hh:mm'
    latest_arrive = None  #'hh:mm'
    earliest_home = None  #'hh:mm' leaving for home time
    latest_home = None  #'hh:mm' leaving for home time
    user = None  #string
    current_start = None #'hh:mm' current leaving for work time
    current_duration_start = None #int (minutes)
    current_home = None #'hh:mm' current leaving for home time
    current_duration_home = None #int (minutes)

    def __init__(self, username):

        #  Initialise the necessary variables
        self.username = username

        # Connect to MongoDB
        client = MongoClient()

        db = client.Hecate
        collection = db.User

        # Obtain the user details from the DB
        user = collection.find_one({'username': username})

        # Initialise necessary items
        self.name = user['name']
        self.admin = user['admin']
        self.start_location = user['route']['address']['start_location']['formatted_address']
        self.end_location = user['route']['address']['end_location']['formatted_address']
        self.transportation = user['route']['transportation']
        self.travel_days = user['route']['days']
        self.earliest_start = user['route']['times']['outbound']['earliest_start']
        self.latest_start = user['route']['times']['outbound']['latest_start']
        self.earliest_arrive = user['route']['times']['outbound']['earliest_arrive']
        self.latest_arrive = user['route']['times']['outbound']['latest_arrive']
        self.current_start = user['route']['times']['outbound']['current_start']
        self.current_duration_start = user['route']['times']['outbound']['current_duration']
        self.earliest_home = user['route']['times']['homebound']['earliest_start']
        self.latest_home = user['route']['times']['homebound']['latest_start']
        self.current_home = user['route']['times']['homebound']['current_start']
        self.current_duration_home = user['route']['times']['homebound']['current_duration']

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

    def set_Password(self, password):
        self.user['password'] = password

    def set_Name(self, name):
        self.user['name'] = name

    def set_Admin(self, admin):
        self.user['admin'] = admin
