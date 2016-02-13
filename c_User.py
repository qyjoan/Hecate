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

    username = None
    name = None
    admin = None
    start_location = None
    end_location = None
    transportation = None
    travel_days = None
    earliest_start = None
    latest_start = None
    earliest_arrive = None
    latest_arrive = None
    earliest_leave = None
    latest_leave = None

    def __init__(self, username):

        #  Initialise the necessary variables
        self.username = username

        # Connect to MongoDB
        client = MongoClient()

        db = client.Hecate
        collection = db.User

        user = collection.find_one({'username': username})

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
        self.earliest_leave = user['route']['times']['homebound']['earliest_start']
        self.latest_leave = user['route']['times']['homebound']['latest_start']

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
        print "Earliest Leave: %s" %self.earliest_leave
        print "Latest Leave: %s" %self.latest_leave


    # def get_Name(self):
    #     return self.Name
    #
    # def get_Start_Address(self):
    #
    # def get_End_Address(self):
    #
    # def get_Transportation(self):
    #
    #
    #
    # def set_Start_Address(self, geo_object):
    #
    # def set_End_Address(self, geo_object):
    #
    # def set_Transportation(self, trans):
    #
    # def set_Password(self, password):
    #
