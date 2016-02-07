#!/usr/bin/env python
#--------------------------------------------------------
# File Name: tomtom.py
# Author: Joan Qiu
# Date: February 2016
# Version: 0.1 Initial Version
# Purpose: This program uses the Tomtom api to obtain and store in MongoDB
#           route information for specific start and end points, at specific times.
#--------------------------------------------------------
import requests
import json
from util import keys
import urllib

class Tomtom():

    def __init__(self, start_address, end_address, mode, start_date, end_date, departure_time_min, departure_time_max):
        #  Initialise the necessary variables
        self.start_address = start_address
        self.end_address = end_address
        self.travel_mode = mode
        self.start_date = start_date
        self.end_date = end_date
        self.departure_time_min = departure_time_min
        self.departure_time_max = departure_time_max

    # encode takes in an address string
    # returns the lat long of the address
    # string -> {ulat':float,u'lon':float}
    def encode(self, address):

        key = keys.TOMTOM_SEARCH
        search_str = 'https://api.tomtom.com/search/2/geocode/{address}.{ext}?key={key}'
        query = search_str.format(address = urllib.quote_plus(address),
                                  ext = 'JSON',
                                  key = key)
        r = requests.get(query)
        #TODO: Error Handling
        if r.reason == 'OK' and r.text <> '':
            #TODO: Tomtom supports fuzzy matching, check if result is valid
            #      (e.g. 5230 Kimsl st => 5230 S US Highway 377, Junction, Kimble, TX, USA)
            res = json.loads(r.text)
            if len(res['results']) > 0:
                # get first result (assuming most relevant)
                return res['results'][0]['position']
            else:
                return None
        else:
            print "Connection Error: {}".format(r.reason)
            return None

    # get route
    def get_route(self):
        
        start_point = self.encode(self.start_address)
        
        #TODO: BETTER ERROR HANDLING
        if start_point is None:
            print "Invalid starting address. Please try again."
            return
        
        end_point = self.encode(self.end_address)
        if end_point is None:
            print "Invalid ending address. Please try again."
            return

        search_str = 'https://api.tomtom.com/routing/1/calculateRoute/{lat_s},{lon_s}:{lat_e},{lon_e}/json?routeType=fastest&travelMode={mode}&key={key}'
        #NOTES:
        # departure time and arrival time cannot co-occur
        # default departure time: Now

