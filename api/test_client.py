#!/usr/bin/python2.7
import requests
import json
 
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


    url = 'https://...:5000/hecate/api/v1.0/route'

    access_token = '...'
    headers = {'Authorization': 'Bearer {}'.format(access_token)}

    # call get service with headers and params
    response = requests.post(url, headers = headers,data = json.dumps(params), verify=False)

    print "code:"+ str(response.status_code)
    print "******************"
    print "headers:"+ str(response.headers)
    print "******************"
    print "content:"+ str(response.text)
  
consumeGETRequestSync()
