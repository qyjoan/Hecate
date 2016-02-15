#!/usr/bin/env python
###################################################
# Testing Script 2:
#    run_main.py is run after create_user.py
###################################################
import os,sys,inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir)

from c_User import User
from c_Google import Google
import pymongo
from pymongo import MongoClient
import datetime
from datetime import datetime
from datetime import timedelta
from datetime import date
from main import initialise_days
import json
import googlemaps
import calendar
from prettytable import PrettyTable
import time


username = sys.argv[2]
user = User(username)
user.print_Details()

days = user.get_Travel_Days()
# normalize format of days
days = [x.lower().title() for x in days]
travel_days = initialise_days(days)

# Google module does not support arrival yet
arrival_time_min = datetime.strptime(user.get_Earliest_Arrive(), '%H:%M').time()
arrival_time_max = datetime.strptime(user.get_Latest_Arrive(), '%H:%M').time()

departure_time_min = datetime.strptime(user.get_Earliest_Arrive(), '%H:%M').time()
departure_time_max = datetime.strptime(user.get_Latest_Arrive(), '%H:%M').time()

g = Google(user.get_Start_Address(), user.get_End_Address(), user.get_Transportation(), travel_days, departure_time_min, departure_time_max, arrival_time_min, arrival_time_max, user.username)

if sys.argv[1] == 'output':
    g.output_data()
elif sys.argv[1] == 'insert':
    g.obtain_Insert_API_Data()
