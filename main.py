#!/usr/bin/env python
#--------------------------------------------------------
# File Name: main.py
# Author: Simon Macarthur
# Date: February 2016
# Version: 0.1 Initial Version
# Purpose: This program is the main program for the Hecate program.
#--------------------------------------------------------

import datetime
from datetime import timedelta
import time
from dateutil import tz
import time
import sys
from c_Google import *
from c_User import *

# TODO: This needs to take into account time, and become date and time?
def initialise_days(days):

    day_to_date = {}
    # Monday is 0, Sunday is 6. So we want 0 (Monday) and 4 (Friday)
    today = datetime.today().date()
    day_to_date['Monday'] = today + timedelta( (0-today.weekday()) % 7 )
    day_to_date['Tuesday'] = today + timedelta( (1-today.weekday()) % 7 )
    day_to_date['Wednesday'] = today + timedelta( (2-today.weekday()) % 7 )
    day_to_date['Thursday'] = today + timedelta( (3-today.weekday()) % 7 )
    day_to_date['Friday'] = today + timedelta( (4-today.weekday()) % 7 )
    day_to_date['Saturday'] = today + timedelta( (5-today.weekday()) % 7 )
    day_to_date['Sunday'] = today + timedelta( (6-today.weekday()) % 7 )

    return_dates = []
    for day in days:
        return_dates.append(day_to_date[day])

    return return_dates

def update_Next_Check_Time(type):
    # TODO Add Logic to choose next check time based upon how long to go

    # if type == 'outbound':
    #     for day in user.get_Travel_Days():
    #         earliest = day_to_date[day]
    #     print datetime.strptime(user.get_Earliest_Start(), '%Y-%m-%d %H:%M')
    #     time_to_go = datetime.strptime(user.get_Earliest_Start(), '%Y-%m-%d %H:%M') - datetime.now()
    #     print time_to_go

    user.set_Next_Check_Time(datetime.now() +  + timedelta(hours=1))


if __name__ == '__main__':
    # Every 5 mins - check
    # Check Time - initially load, set to 1 hour from insert
    # Check Hourly - until within 2 hours of departure time
    # Check 15 mins - from within 2 hours before departure time

    # Loop through all records with a next_check_time <= now
    current_time = datetime.now()

    # Connect to MongoDB
    client = MongoClient()

    db = client.Hecate
    collection = db.User

    # Obtain all users from the database that are due for an update
    c = collection.find({'next_check_time': {"$lte": current_time} })

    # Loop through the users, calling the API to update route information and log to route DB
    for item in c:
        user = User(item["username"])
        user.Initialise()

        # Initialise the days
        travel_days = initialise_days(user.travel_days)

        # Format the departure time min and max
        departure_time_min = datetime.strptime(user.earliest_start, '%H:%M').time()
        departure_time_max = datetime.strptime(user.latest_start, '%H:%M').time()

        # Google module does not support arrival yet
        arrival_time_min = datetime.strptime(user.get_Earliest_Arrive(), '%H:%M').time()
        arrival_time_max = datetime.strptime(user.get_Latest_Arrive(), '%H:%M').time()

        # Get the latest data from the API
        # TODO: Only Update the one time that is needed
        g = Google(user.get_Start_Address(), user.get_End_Address(), user.get_Transportation(), travel_days, departure_time_min, departure_time_max, arrival_time_min, arrival_time_max, user.username)

        # If we only want to output, pass the parameter 'output', else we insert into MongoDB
        if sys.argv[1] == 'output':
            g.output_data()
        else:
            g.obtain_Insert_API_Data()

        # See how close departure time is and update next check time accordingly.
        update_Next_Check_Time('outbound')

        print "User: %s\tRoute Information Updated. Next Update at %s " %(user.username, user.get_Next_Check_Time())
