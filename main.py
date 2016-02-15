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

if __name__ == '__main__':
    user = User('samacart')

    travel_days = initialise_days(user.travel_days)

    departure_time_min = datetime.strptime(user.earliest_start, '%H:%M').time()
    departure_time_max = datetime.strptime(user.latest_start, '%H:%M').time()

#    g = Google('Newport, NY, USA', 'Bryant Park, New York, NY, USA', user.get_Transportation(), travel_days, departure_time_min, departure_time_max, user.username)
    g = Google(user.get_Start_Address(), user.get_End_Address(), user.get_Transportation(), travel_days, departure_time_min, departure_time_max, user.username)

    if sys.argv[1] == 'output':
        g.output_data()
    else:
        g.obtain_Insert_API_Data()
