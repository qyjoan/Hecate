#!/usr/bin/python2.7
from flask import Flask, jsonify, request
from flask.ext.sentinel import ResourceOwnerPasswordCredentials, oauth

import json
import sys
import ast
sys.path.append('../')
from c_Google import *
import urlparse

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

    for day in days:
        if day_to_date[day] <= today:
            day_to_date[day] = day_to_date[day] + timedelta(days=7)

    return_dates = []
    for day in days:
        return_dates.append(day_to_date[day])
    print return_dates
    return return_dates

app = Flask(__name__)

@app.route('/hecate/api/v1.0/users', methods=['GET'])
@oauth.require_oauth()
def get_users():
    return 'This will get the list of users'

@app.route('/hecate/api/v1.0/route', methods=['POST'])
@oauth.require_oauth()
def get_route():
    data = {}
    data = ast.literal_eval(request.data)
    #data = dict(urlparse.parse_qsl(request.data))
    start_address = data['start_address']
    end_address = data['end_address']
    transport_method = data['transport_method']
    travel_days = initialise_days(data['days'])
    homebound_outbound = data['homebound_outbound']
    outbound_times = data['outbound_times']
    for item in outbound_times:
        outbound_times[item]['earliest_start'] = outbound_times[item]['earliest_start'].replace('am', '')
        outbound_times[item]['latest_start'] = outbound_times[item]['latest_start'].replace('am', '').replace('pm', '')
        outbound_times[item]['current_start'] = outbound_times[item]['current_start'].replace('am', '').replace('pm', '')

    homebound_times = data['homebound_times']
    for item in homebound_times:
        homebound_times[item]['earliest_home'] = homebound_times[item]['earliest_home'].replace('am', '').replace('pm', '')
        homebound_times[item]['latest_home'] = homebound_times[item]['latest_home'].replace('am', '').replace('pm', '')
        homebound_times[item]['current_home'] = homebound_times[item]['current_home'].replace('am', '').replace('pm', '')
    g_outbound = Google()
    g_outbound.init_Future(start_address, end_address, transport_method, travel_days, outbound_times, homebound_times, 'anonymous', 'departure', homebound_outbound, 'api')
    outbound_results = g_outbound.obtain_Insert_API_Data(homebound_outbound)

    return jsonify(results=outbound_results)

@app.route('/')
def index():
    return "Hello, World!"

if __name__ == '__main__':
    ResourceOwnerPasswordCredentials(app)
    app.run(ssl_context='adhoc', host='0.0.0.0')
