#!/usr/bin/python2.7
from flask import Flask, jsonify, request
from flask.ext.sentinel import ResourceOwnerPasswordCredentials, oauth

import json
import sys
import ast
sys.path.append('../')
from c_Google import *
from c_User import *
import urlparse
import jsonpickle
import os

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

@app.route('/hecate/api/v1.0/getUser', methods=['GET'])
@oauth.require_oauth()
def get_user():
    try:
        user_Object = User()

        # Ensure the username hasn't come through with quotes at the beginning and end
        if request.data.startswith('"') and request.data.endswith('"'):
            username = request.data[1:-1]
        else:
            username = request.data

        # Initialise the user object
        response = user_Object.Initialise(username)

        return user_Object.JSON_Output()
        #return jsonpickle.encode(user_Object)

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

@app.route('/hecate/api/v1.0/updateUser', methods=['POST'])
@oauth.require_oauth()
def update_user_route():
    try:
        data = {}
        data = json.loads(request.data)
        username = data['username']

        user_Object = User()

        # Initialise the user object
        user_Object.Initialise(username)

        response = user_Object.update_Entire_User(json.dumps(data))

        if response > 0:
            return "User successfully updated."
        else:
            return "ERROR: User Not Updated"
    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno, e)

@app.route('/hecate/api/v1.0/create_user', methods=['POST'])
@oauth.require_oauth()
def create_user():
    data = {}
    try:
        data = ast.literal_eval(request.data)
    except ValueError as e:
        print ( "<p>Error: %s</p>" % e.message )
    print data

    user = User()
    response = user.CreateUser(data)

    return response

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
