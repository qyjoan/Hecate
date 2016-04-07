#!/usr/bin/python2.7
import requests
import json
import sys
import datetime
import urllib
import ast
import jsonpickle
import os

 
def consumeGETRequestSync():
    params = {}
    params['start_address'] = '10 Bourke Street, Sydney, NSW, Australia'
    params['end_address'] = '320 Pitt Street, Sydney, NSW, Australia'
    params['days'] = ['Monday','Tuesday', 'Friday']
    params['transport_method'] = 'driving'
    params['homebound_outbound'] = 'outbound'

    # Setup outbound days and times
    params['outbound_times'] = {}
    times = {}

    # Monday
    time = {}
    time['earliest_start'] = '07:30'
    time['latest_start'] = '08:30'
    time['current_start'] = '08:00'
    times['Monday'] = time

    # Tuesday
    time = {}
    time['earliest_start'] = '07:30'
    time['latest_start'] = '08:30'
    time['current_start'] = '08:00'
    times['Tuesday'] = time

    # Friday
    time = {}
    time['earliest_start'] = '07:00'
    time['latest_start'] = '08:00'
    time['current_start'] = '08:00'
    times['Friday'] = time

    params['outbound_times'] = times

    # Setup homebound days and times
    params['homebound_times'] = {}
    times = {}

    # Monday
    time = {}
    time['earliest_home'] = '17:30'
    time['latest_home'] = '18:30'
    time['current_home'] = '18:00'
    times['Monday'] = time

    # Tuesday
    time = {}
    time['earliest_home'] = '17:30'
    time['latest_home'] = '18:30'
    time['current_home'] = '18:00'
    times['Tuesday'] = time

    # Friday
    time = {}
    time['earliest_home'] = '17:00'
    time['latest_home'] = '18:00'
    time['current_home'] = '18:00'
    times['Friday'] = time

    params['homebound_times'] = times


    url = 'https://54.191.104.28:5000/hecate/api/v1.0/route'

    access_token = 'WAhEUONIBRTczHQRD9MyYCNUdf1Zr4'
    headers = {'Authorization': 'Bearer {}'.format(access_token)}

    # Get token
    # curl -k -X POST -d 'client_id=Yvr8gDSyIsqQ1e6W0Uj43WXuXpT9JsPZ0sm9UFyr&grant_type=password&username=api&password=B:5"cY^{fTLKjKhm' https://54.191.104.28:5000/oauth/token

    # call get service with headers and params
    response = requests.post(url, headers = headers,data = json.dumps(params), verify=False)

    print "code:"+ str(response.status_code)
    print "******************"
    print "headers:"+ str(response.headers)
    print "******************"
    print "content:"+ str(response.text)

def create_User():
    params = {}
    params['username'] = 'test'
    params['next_check_time'] = str(datetime.datetime.today())
    params['name'] = 'testing'
    params['admin'] = 'false'
    route = {}
    route['times'] = {}

    homebound = {}
    day = {}
    day["earliest_start"] = "17:00"
    day["latest_start"] = "19:00"
    day["current_duration"] = 45
    day["current_start"] = "18:00"
    homebound['Monday'] = day
    homebound['Tuesday'] = day
    homebound['Wednesday'] = day
    homebound['Thursday'] = day
    homebound['Friday'] = day

    route['times']['homebound'] = homebound

    outbound = {}
    day = {}
    day["earliest_start"] = "07:00"
    day["latest_start"] = "08:00"
    day["current_duration"] = 30
    day["current_start"] = "09:30"
    outbound['Monday'] = day
    outbound['Tuesday'] = day
    outbound['Wednesday'] = day
    outbound['Thursday'] = day
    outbound['Friday'] = day

    route['times']['outbound'] = outbound

    route["transportation"] = "driving"
    route["days"] = ["Monday","Tuesday","Wednesday","Thursday","Friday"]

    route['address'] = {}
    route["address"]["start_location"] = {}
    route["address"]["start_location"]["formatted_address"] = "7700 Gateway Blvd, Newark, CA 94560"
    route["address"]["end_location"] = {}
    route["address"]["end_location"]["formatted_address"] = "1001 Metro Center Blvd, Foster City, CA 94404"

    params['route'] = route
    params["password"] = "password123"
    params['created_at'] = str(datetime.datetime.today())
    params['updated_at'] = str(datetime.datetime.today())

    url = 'https://.../hecate/api/v1.0/create_user'

    access_token = 'WAhEUONIBRTczHQRD9MyYCNUdf1Zr4'
    headers = {
        'Authorization': 'Bearer {}'.format(access_token),
        'Content-Type': 'application/json'
    }

    # call get service with headers and params
    response = requests.post(url, headers = headers,data = json.dumps(params), verify=False)

    print "code:"+ str(response.status_code)
    print "******************"
    print "headers:"+ str(response.headers)
    print "******************"
    print "content:"+ str(response.text)

def get_User():
    url = 'https://54.191.104.28:5000/hecate/api/v1.0/getUser'

    access_token = 'WAhEUONIBRTczHQRD9MyYCNUdf1Zr4'
    headers = {
        'Authorization': 'Bearer {}'.format(access_token),
    }

    # call get service with headers and params
    response = requests.get(url, headers = headers,data = sys.argv[2], verify=False)

    print "code:"+ str(response.status_code)
    print "******************"
    print "headers:"+ str(response.headers)
    print "******************"
    print "content:"+ str(response.text)

def update_User():
    try:
        url = 'https://54.191.104.28:5000/hecate/api/v1.0/getUser'

        access_token = 'WAhEUONIBRTczHQRD9MyYCNUdf1Zr4'
        headers = {
            'Authorization': 'Bearer {}'.format(access_token),
        }

        # call get service with headers and params
        response = requests.get(url, headers = headers,data = json.dumps(sys.argv[2]), verify=False)

        user_details = jsonpickle.decode(response.content)

        user_details['password'] = 'password456'

        url = 'https://54.191.104.28:5000/hecate/api/v1.0/updateUser'
        headers = {
            'Authorization': 'Bearer {}'.format(access_token),
            'Content-Type': 'application/json'
        }
        response = requests.post(url, headers = headers,data = json.dumps(user_details), verify=False)

        print "code:"+ str(response.status_code)
        print "******************"
        print "headers:"+ str(response.headers)
        print "******************"
        print "content:"+ str(response.text)
    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

def get_Stats():
    url = 'http://54.191.104.28:5000/hecate/api/v1.0/stats'

    access_token = 'WAhEUONIBRTczHQRD9MyYCNUdf1Zr4'
    headers = {
        'Authorization': 'Bearer {}'.format(access_token),
    }

    # call get service with headers and params
    response = requests.get(url, headers = headers,data = sys.argv[2], verify=False)

    print "code:"+ str(response.status_code)
    print "******************"
    print "headers:"+ str(response.headers)
    print "******************"
    print "content:"+ str(response.text)

if __name__ == "__main__":
    if sys.argv[1] == "route":
        consumeGETRequestSync()

    if sys.argv[1] == "create_user":
        create_User()

    if sys.argv[1] == "get_user":
        get_User()

    if sys.argv[1] == "update_user":
        update_User()

    if sys.argv[1] == "get_stats":
        get_Stats()
