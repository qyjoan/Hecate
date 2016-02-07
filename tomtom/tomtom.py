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
import datetime

class Tomtom():

    # mode: ['car','pedestrian']
    def __init__(self, start_address, end_address, mode, start_date, end_date, departure_date, departure_time_min, departure_time_max, arrival_date, arrival_time):
        #  Initialise the necessary variables
        self.start_address = start_address
        self.end_address = end_address
        self.mode = mode
        self.start_date = start_date
        self.end_date = end_date
        self.departure_date = departure_date
        self.departure_time_min = departure_time_min
        self.departure_time_max = departure_time_max
        self.arrival_date = arrival_date
        self.arrival_time = arrival_time
        self.current_route = None

    # encode takes in an address string
    # returns the lat long of the address
    # string -> {u'lat':float,u'lon':float}
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

    # get route object
    # departure_time,arrival_time are assumed to have the format of hh:mm:ss
    # departure_date,arrival_date are assumed to have the format of YYYY-MM-DD
    # arrival time cannot co-occur with departure time
    def tomtom_route(self, start_address, end_address, mode, arrival_date=None, arrival_time=None, departure_date=None, departure_time=None):

        start_point = self.encode(self.start_address)
        end_point = self.encode(self.end_address)

        search_str = 'https://api.tomtom.com/routing/1/calculateRoute/{lat_s},{lon_s}:{lat_e},{lon_e}/json?routeType=fastest&travelMode={mode}&key={key}'

        query = search_str.format(lat_s = start_point['lat'],
                                  lon_s = start_point['lon'],
                                  lat_e = end_point['lat'],
                                  lon_e = end_point['lon'],
                                  mode = self.mode,
                                  key = keys.TOMTOM_ROUTING)

        if arrival_date and arrival_time:
            arr = urllib.quote_plus("{date}T{time}".format(date = arrival_date,
                                                           time = arrival_time))
            query += "&arriveAt={arr}".format(arr = arr)

        elif departure_date and departure_time:
            dep = urllib.quote_plus("{date}T{time}".format(date = departure_date,
                                                           time = departure_time))
            query += "&departAt={dep}".format(dep = dep)
        
        r = requests.get(query)
        if r.reason == 'OK':
            res = json.loads(r.text)
            self.current_route = res
            return 'OK'

    # get route
    def get_route(self):
        if self.current_route is not None:
            return self.current_route['routes'][0]['legs'][0]['points']
        else:
            self.tomtom_route(self.start_address, self.end_address, self.mode, self.arrival_date, self.arrival_time, self.departure_date, self.departure_time_min)
            return self.current_route['routes'][0]['legs'][0]['points']

    # get route summary returns a dictionary of arrivalTime, departureTime,
    # lengthInMeters, trafficDelayInSeconds, travelTimeInSeconds
    def get_route_summary(self):
        if self.current_route is not None:
            return self.current_route['routes'][0]['summary']
        else:
            self.tomtom_route(self.start_address, self.end_address, self.mode, self.arrival_date, self.arrival_time,self.departure_date, self.departure_time)
            return self.current_route['routes'][0]['summary']
