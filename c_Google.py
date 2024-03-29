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
import pyowm

class Google():

    def init_Future(self, start_address, end_address, mode, travel_dates, outbound_time, homebound_time, username, time_type, route_type, hecate_mode):

        #  Initialise the necessary variables
        self.start_address = start_address
        self.end_address = end_address
        self.travel_mode = mode
        self.travel_dates = travel_dates
        self.outbound_time = outbound_time
        self.homebound_time = homebound_time
        self.user_name = username
        self.time_type = time_type
        self.route_type = route_type
        self.live = False
        self.hecate_mode = hecate_mode

        # Number of minutes between each entry.
        self.time_step = 10

        # Read in the Google API Key from the config file

        self.read_API_Key(1)

        # Get the handle to the API
        self.gmaps = googlemaps.Client(key=self.api_key)

    def init_Live(self,start_address, end_address, mode, username, route_type ):

        #  Initialise the necessary variables
        self.start_address = start_address
        self.end_address = end_address
        self.travel_mode = mode
        self.route_type = route_type
        self.user_name = username
        self.live = True
        self.time_type = 'Departure'

        # Read in the Google API Key from the config file

        self.read_API_Key(1)

        # Get the handle to the API
        self.gmaps = googlemaps.Client(key=self.api_key)

    def read_API_Key(self, number):
        # TODO: Add Error Handling if config file does not exist
        try:
            f = open("hecate.conf")
        except:
            f = open("../hecate.conf")

        for line in f:
            data = line.split('\n')[0].split('\t')
            api_type = data[0]
            api_key = data[1]

            if self.hecate_mode == 'api':
                if api_type == "Live":
                    self.api_key = api_key
                    self.api_key_number = number
                    print "API Key Updated - Live Key"

            elif api_type == "Google" + str(number):
                self.api_key = api_key
                self.api_key_number = number
                print "API Key Updated - Key #%i" %number

    def obtain_Insert_API_Data(self, mode):

        print "%s\tUpdating for user %s" %(datetime.now(),self.user_name)
        print "%s\tRoute Start: %s" %(datetime.now(),self.start_address)
        print "%s\tRoute End: %s" %(datetime.now(),self.end_address)

        # Get the weather for the next 7 days
        start_weather = self.get_Weather(self.start_address)
        end_weather = self.get_Weather(self.end_address)

        if mode == 'live':
            self.get_Data_Live(start_weather, end_weather)
        else:
            return_data = []

            for travel_d in self.travel_dates:
                weekday = calendar.day_name[travel_d.weekday()]

                if self.route_type == 'outbound':
                    current_time = datetime.strptime(self.outbound_time[weekday]['earliest_start'], '%H:%M').time()
                    upper_bound = datetime.strptime(self.outbound_time[weekday]['latest_start'], '%H:%M').time()
                    current_start = datetime.strptime(self.outbound_time[weekday]['current_start'], '%H:%M').time()
                else:
                    current_time = datetime.strptime(self.homebound_time[weekday]['earliest_home'], '%H:%M').time()
                    upper_bound = datetime.strptime(self.homebound_time[weekday]['latest_home'], '%H:%M').time()
                    current_start = datetime.strptime(self.homebound_time[weekday]['current_home'], '%H:%M').time()

                if self.hecate_mode == 'collect' and current_time < upper_bound:
                    c_date_time = str(travel_d) + ' ' + str(current_time)
                    directions_result, weather_dict= self.get_Data(c_date_time, start_weather, end_weather)
                    hecate_structure = self.build_Hecate_Structure(directions_result, c_date_time, weather_dict)
                    self.insert_MongoDB(hecate_structure)

                while current_time <= upper_bound:
                    c_date_time = str(travel_d) + ' ' + str(current_time)
                    directions_result, weather_dict = self.get_Data(c_date_time, start_weather, end_weather)

                    if self.hecate_mode == 'collect':
                        hecate_structure = self.build_Hecate_Structure(directions_result, c_date_time, weather_dict)

                        self.insert_MongoDB(hecate_structure)

                        # Increment the time by the time step
                        current_time = (datetime.strptime('1900-01-01' + ' ' + str(current_time), '%Y-%m-%d %H:%M:%S') + timedelta(minutes = self.time_step)).time()

                        # Sleep 10 seconds
                        time.sleep(10)
                    else:
                        if directions_result <> "Timeout":
                            hecate_structure = self.build_Hecate_Structure(directions_result, c_date_time, weather_dict)
                            # Increment the time by the time step
                            current_time = (datetime.strptime('1900-01-01' + ' ' + str(current_time), '%Y-%m-%d %H:%M:%S') + timedelta(minutes = self.time_step)).time()

                            return_data.append(hecate_structure)

                print "\t---------------------------------------"
            print "\t---------------------------------------\n\n"

            return return_data

    def get_Data_Live(self, start_weather, end_weather):
            # TODO: ERROR HANDLING FOR API FAILURES
            try:
                weather_dict = {}
                if start_weather <> None:
                    # Build the JSON Objects for weather
                    w_start = start_weather.get_weather_at(datetime.now())

                    weather_dict['start_address'] = {}
                    weather_dict['start_address']['temperature'] = {}

                    weather_dict['start_address']['weather'] = w_start.get_status()
                    weather_dict['start_address']['temperature']['celcius'] = w_start.get_temperature('celsius')
                    weather_dict['start_address']['temperature']['fahrenheit'] = w_start.get_temperature('fahrenheit')

                if end_weather <> None:
                    w_end = end_weather.get_weather_at(datetime.now())
                    weather_dict['end_address'] = {}
                    weather_dict['end_address']['temperature'] = {}

                    weather_dict['end_address']['weather'] = w_end.get_status()
                    weather_dict['end_address']['temperature']['celcius'] = w_end.get_temperature('celsius')
                    weather_dict['end_address']['temperature']['fahrenheit'] = w_end.get_temperature('fahrenheit')

                directions_result = self.gmaps.directions(self.start_address,
                        self.end_address,
                        mode=self.travel_mode,
                        departure_time=datetime.now())

                self.insert_MongoDB(directions_result, datetime.now(), weather_dict)

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

            except pyowm.exceptions.not_found_error.NotFoundError:
                print "Weather not found for specified time. Weather data not collected."

    def get_Data(self, c_date_time, start_weather, end_weather):
        d = datetime.strptime(c_date_time, '%Y-%m-%d %H:%M:%S')
        if d >= datetime.today():
            print "\t %s\tUpdating Route for departure time: %s" %(datetime.now(), d)

            # TODO: ERROR HANDLING FOR API FAILURES
            try:
                weather_dict = {}
                if start_weather <> None:
                    # Build the JSON Objects for weather
                    w_start = start_weather.get_weather_at(d)

                    weather_dict['start_address'] = {}
                    weather_dict['start_address']['temperature'] = {}

                    weather_dict['start_address']['weather'] = w_start.get_status()
                    weather_dict['start_address']['temperature']['celcius'] = w_start.get_temperature('celsius')
                    weather_dict['start_address']['temperature']['fahrenheit'] = w_start.get_temperature('fahrenheit')

                if end_weather <> None:
                    w_end = end_weather.get_weather_at(d)
                    weather_dict['end_address'] = {}
                    weather_dict['end_address']['temperature'] = {}

                    weather_dict['end_address']['weather'] = w_end.get_status()
                    weather_dict['end_address']['temperature']['celcius'] = w_end.get_temperature('celsius')
                    weather_dict['end_address']['temperature']['fahrenheit'] = w_end.get_temperature('fahrenheit')
            except pyowm.exceptions.not_found_error.NotFoundError:
                print "Weather not found for specified time. Weather data not collected."

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

                return directions_result, weather_dict

            except googlemaps.exceptions.ApiError as e:
                if e == 'NOT FOUND':
                    "Google Maps API Error, Address Not Found"
                else:
                    print "Google Maps API Error. Retry Later."
                return "Error", "Error"

            except googlemaps.exceptions.HTTPError:
                print "Google Maps HTTP Error. Retry Later."
                return "Error", "Error"

            except googlemaps.exceptions.Timeout:
                print "Google Maps Timeout. Trying New Key."

                # If we are using the first API Key, swap to the second and vice versa
                if self.api_key_number == 1:
                    self.read_API_Key(2)
                else:
                    self.read_API_Key(1)
                return "Timeout", "Timeout"

            except googlemaps.exceptions.TransportError:
                print "Google Maps Transport Error. Retry Later."
                return "Error", "Error"

    def get_Weather(self, address):
        owm = pyowm.OWM('24d3c38432258a49a6a101c36f314732')

        # Get the weather for the next 7 days
        fc = owm.daily_forecast(address, limit=7)

        return fc

    def build_Hecate_Structure(self, data, departure_time, weather_dict):
        departure_time = datetime.strptime(departure_time, '%Y-%m-%d %H:%M:%S')

        data[0]['departure_time'] = departure_time
        data[0]['departure_day'] = calendar.day_name[departure_time.weekday()]
        data[0]['departure_time_of_day'] = datetime.strftime(departure_time, '%H:%M%p')
        data[0]['created_date'] = time.strftime("%c")
        data[0]['username'] = self.user_name
        data[0]['start_address'] = self.start_address
        data[0]['end_address'] = self.end_address
        data[0]['travel_mode'] = self.travel_mode
        data[0]['method_time'] = self.time_type # Depature time or Arrival Time
        data[0]['route_type'] = self.route_type # Outbound or Homebound
        data[0]['weather'] = weather_dict
        data[0]['live'] = self.live

        return data

    def insert_MongoDB(self, data):
        # Connect to Mongo DB
        client = MongoClient()

        db = client.Hecate
        collection = db.Travel_Route

        # TODO REMOVE ANY EXISTING RECORDS
        #collection.remove( {} )
        #deleted =  collection.delete_many({"$and": [{"user.xid": self.id},
        #              {"time_created": {"$gt": start_epoch}}]})

        #print "Deleted %i records" %deleted.deleted_count

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

