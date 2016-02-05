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
from datetime import date
import json
import googlemaps

class Google():

    def __init__(self, start_address, end_address, mode, departure_time):

        #  Initialise the necessary variables
        self.start_address = start_address
        self.end_address = end_address
        self.travel_mode = mode
        self.departure_time = departure_time

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

        # TODO: ERROR HANDLING FOR API FAILURES
        directions_result = self.gmaps.directions("Menai, NSW",
                                     "Taronga Zoo, NSW",
                                     mode="driving",
                                     departure_time=self.departure_time)

        self.insert_MongoDB(directions_result)


    def insert_MongoDB(self, data):
        # Connect to Mongo DB
        client = MongoClient()

        db = client.Hecate
        collection = db.Travel_Route
        collection.remove( {} )
        #deleted =  collection.delete_many({"$and": [{"user.xid": self.id},
        #              {"time_created": {"$gt": start_epoch}}]})

        #print "Deleted %i records" %deleted.deleted_count

        id = collection.insert(data)
        print "Inserted id %s into MongoDB." %id



