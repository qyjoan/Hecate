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
sys.path.append('../')
from c_Google import *
from c_User import *
import pyowm

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

# Update the next time to call the API to check.

def update_Next_Check_Time():
    # TODO Add Logic to choose next check time based upon how long to go
    # Check Hourly - until within 2 hours of departure time
    # Check 15 mins - from within 2 hours before departure time

    today = datetime.today().date()
    now = datetime.now()
    today_weekday = calendar.day_name[datetime.today().weekday()]

    try:
        earliest_start = datetime.strptime(str(today) + ' ' + user.outbound_time[today_weekday]['earliest_start'], '%Y-%m-%d %H:%M')
        earliest_home =  datetime.strptime(str(today) + ' ' + user.homebound_time[today_weekday]['earliest_home'], '%Y-%m-%d %H:%M')

        if earliest_start < now:
            earliest_start = datetime.strptime(str(today + timedelta(days=1)) + ' ' + user.outbound_time[today_weekday]['earliest_start'], '%Y-%m-%d %H:%M')

        if earliest_home < now:
           earliest_home =  datetime.strptime(str(today + timedelta(days=1)) + ' ' + user.homebound_time[today_weekday]['earliest_home'], '%Y-%m-%d %H:%M')

        # convert to unix timestamp
        start_ts = time.mktime(earliest_start.timetuple())
        home_ts = time.mktime(earliest_home.timetuple())
        now_ts = time.mktime(now.timetuple())

        # they are now in seconds, subtract and then divide by 60 to get minutes.
        time_to_start =  int(start_ts - now_ts) / 60
        time_to_home =  int(home_ts - now_ts) / 60

        if time_to_start > time_to_home:
            closest_mins = time_to_home
        else:
            closest_mins = time_to_start
    except:
        closest_mins = 240 #maximum if nothing closer

    # If we are 2 hours or less from next closest time, set the next update to be in 15 mins
    # Else set it to be 1 hour
    if closest_mins <= 120:
        user.set_Next_Check_Time(datetime.now() + timedelta(minutes=15))
    elif closest_mins <= 240:
        user.set_Next_Check_Time(datetime.now() + timedelta(hours=4))
    else:
        user.set_Next_Check_Time(datetime.now() + timedelta(hours=2))

def Process_Route(type, user, days):

    # TODO: Update this to be for days
    if type == 'outbound':
        # Process the route from A to B (e.g. home to work)
        g = Google()
        g.init_Future(user.get_Start_Address(), user.get_End_Address(), user.get_Transportation(), travel_days, user.outbound_time, user.homebound_time, user.username, 'departure', 'outbound', 'collect')

        # If we only want to output, pass the parameter 'output', else we insert into MongoDB
        if sys.argv[1] == 'output':
            g.output_data()
        else:
            g.obtain_Insert_API_Data('future')
    else:
        # Process the route from B to A (e.g. work to home)
        g = Google()
        g.init_Future(user.get_End_Address(), user.get_Start_Address(), user.get_Transportation(), travel_days, user.outbound_time, user.homebound_time, user.username, 'departure', 'homebound', 'collect')

        # If we only want to output, pass the parameter 'output', else we insert into MongoDB
        if sys.argv[1] == 'output':
            g.output_data()
        else:
            g.obtain_Insert_API_Data('future')

def Process_Route_Live(type, user):

    if type == 'outbound':
        # TODO: Only Update the one time that is needed

        # Process the route from A to B (e.g. home to work)
        g = Google()
        g.init_Live(user.get_Start_Address(), user.get_End_Address(), user.get_Transportation(), user.username, 'outbound')

        g.obtain_Insert_API_Data('live')

    else:
        g = Google()
        g.init_Live(user.get_End_Address(), user.get_Start_Address(), user.get_Transportation(), user.username, 'outbound')

        g.obtain_Insert_API_Data('live')

if __name__ == '__main__':
    # Connect to MongoDB
    client = MongoClient()

    db = client.Hecate
    collection = db.User

    current_time = datetime.now()

    c = collection.find({'username': sys.argv[1] })
    if c.count() == 0:
        print "%s\tNo Records Found to Update ... Sleeping for 5 mins...." %datetime.now()
        exit()
    else:
        while(1):
            print "%s\tFound %s records to process." %(datetime.now(), c.count())

            user = User(c[0]["username"])
            user.Initialise()

            # Initialise the days
            travel_days = initialise_days(user.travel_days)

            # If the difference in current time and departure time is less than 5 mins, then get live traffic.
            today = datetime.today().date()
            today_weekday = calendar.day_name[datetime.today().weekday()]

            # Loop through until we have the start day.
            while (today_weekday not in user.homebound_time.keys()):
                today = today + timedelta(days = 1)
                today_weekday = calendar.day_name[today.weekday()]

            try:
                current_start = datetime.strptime(str(today) + ' ' + user.outbound_time[today_weekday]['current_start'], '%Y-%m-%d %H:%M')
                current_home = datetime.strptime(str(today) + ' ' + user.homebound_time[today_weekday]['current_home'], '%Y-%m-%d %H:%M')

                outbound_time_diff = (current_time - current_start).total_seconds()/60
                homebound_time_diff = (current_time - current_home).total_seconds()/60

                if outbound_time_diff >= 0 and outbound_time_diff <= 5:
                     # Process Outbound Live Route
                    Process_Route_Live('outbound', user)
                else:
                    # Process Outbound - e.g. home to work
                    Process_Route('outbound', user, travel_days)

                if homebound_time_diff >=0 and homebound_time_diff <= 5:
                    # Process Outbound Live Route
                    Process_Route_Live('homebound', user)
                else:
                    # Process Homebound - e.g. work to home
                    Process_Route('homebound', user, travel_days)

            except:
                print 'No Routes for user %s for day %s. Continuing...' %(user.username, today_weekday)

            # See how close departure time is and update next check time accordingly.
            update_Next_Check_Time()

            print "User: %s\tRoute Information Updated. Next Update at %s " %(user.username, user.get_Next_Check_Time())
