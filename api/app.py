#!/usr/bin/python2.7
from flask import Flask, jsonify, request
from flask.ext.sentinel import ResourceOwnerPasswordCredentials, oauth
from flask import make_response, request, current_app
from functools import update_wrapper
import math

import json
import sys
import ast

sys.path.append('../')
from c_Google import *
from c_User import *
import urlparse
import jsonpickle
import os
from bson.objectid import ObjectId


def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        f.required_methods = ['OPTIONS']
        return update_wrapper(wrapped_function, f)

    return decorator


def initialise_days(days):
    day_to_date = {}
    # Monday is 0, Sunday is 6. So we want 0 (Monday) and 4 (Friday)
    today = datetime.today().date()

    day_to_date['Monday'] = today + timedelta((0 - today.weekday()) % 7)
    day_to_date['Tuesday'] = today + timedelta((1 - today.weekday()) % 7)
    day_to_date['Wednesday'] = today + timedelta((2 - today.weekday()) % 7)
    day_to_date['Thursday'] = today + timedelta((3 - today.weekday()) % 7)
    day_to_date['Friday'] = today + timedelta((4 - today.weekday()) % 7)
    day_to_date['Saturday'] = today + timedelta((5 - today.weekday()) % 7)
    day_to_date['Sunday'] = today + timedelta((6 - today.weekday()) % 7)

    for day in days:
        if day_to_date[day] <= today:
            day_to_date[day] = day_to_date[day] + timedelta(days=7)

    return_dates = []
    for day in days:
        return_dates.append(day_to_date[day])
    return return_dates


app = Flask(__name__)

@app.route('/hecate/api/v1.0/login', methods=['POST'])
@crossdomain(origin='*')
# @oauth.require_oauth()
def login():
    try:
        user_Object = User()

        username = request.form['username']
        password = request.form['password']

        print 'Loggin In with username %s and password %s' %(username, password)

        # Ensure the username hasn't come through with quotes at the beginning and end
        if username.startswith('"') and username.endswith('"'):
            username = username[1:-1]

        # Initialise the user object
        user_Object.Initialise(username)

        if password == user_Object.password:
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        return json.dumps({'success': False}), 200, {'ContentType': 'application/json'}

@app.route('/hecate/api/v1.0/getUser', methods=['GET'])
@crossdomain(origin='*')
# @oauth.require_oauth()
def get_user():
    try:
        user_Object = User()

        username = request.args.get('username')
        print 'Username: %s' %username

        if username <> None:
            # Ensure the username hasn't come through with quotes at the beginning and end
            if username.startswith('"') and username.endswith('"'):
                username = username[1:-1]

            # Initialise the user object
            user_Object.Initialise(username)

            response = user_Object.JSON_Output()

            return json.dumps({'success': True, 'data': response}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': False}), 400, {'ContentType': 'application/json'}

        # return jsonpickle.encode(user_Object)

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)


@app.route('/hecate/api/v1.0/updateUser', methods=['POST'])
@crossdomain(origin='*')
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
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': False}), 200, {'ContentType': 'application/json'}

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno, e)


@app.route('/hecate/api/v1.0/updateRoute', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*')
def update_route():
    try:
        data = {}
        data = request.json
        username = request.form['username']
        route = ast.literal_eval(request.form['route'])

        user_Object = User()

        # Initialise the user object
        user_Object.Initialise(username)

        response = user_Object.update_Mongo('route', route)

        if response > 0:
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': False}), 200, {'ContentType': 'application/json'}

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno, e)


@app.route('/hecate/api/v1.0/create_user', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*')
# @oauth.require_oauth()
def create_user():
    data = {}
    try:
        data = json.loads(request.get_data())
    except ValueError as e:
        print ("<p>Error: %s</p>" % e.message)

    user = User()
    response = user.CreateUser(data['user'])

    if response == "Error: User Already Exists":
        return json.dumps({'success': False,
                       'error': 'User Already Exists.'
                       }), 200, {'ContentType': 'application/json'}
    else:
        return json.dumps({'success': True,
                           }), 200, {'ContentType': 'application/json'}

    return response

# Function: getGeneralisedWeatherFactor
# Parameters:
#   - inWeather: string
#                The type of weather the generalised weather factor is for
#                Valid options are: Rain, Snow, Clear, Cloud
def getGeneralisedWeatherFactor(inWeather):

    if inWeather not in ('Rain', 'Snow', 'Clear', 'Cloud'):
        return 'Error: Invalid Weather Type provided'

    weather_data = None

    # Connect to MongoDB
    client = MongoClient()

    db = client.Hecate
    collection = db.weather

    weather_data = collection.find_one({'weather': inWeather})

    # If there is no multiplying factor for weather, return 0
    if weather_data == None:
        return 0
    else:
        return weather_data['weather_impact']

def buildJSON(data):
    day = {}
    try:

        for item in data:
            route = item[0]
            day_name = route['departure_day']
            day[day_name] = {}
            d = {}
            d['start_address'] = route['start_address']
            d['end_address'] = route['end_address']
            if 'weather' in route:
                d['weather'] = route['weather']
            else:
                d['weather'] = 'Clear'
            d['routes'] = []
            day[day_name] = d

        for item in data:
            route = item[0]
            day_name = route['departure_day']
            i = {}

            legs = {}
            legs = route['legs'][0]
            duration = {}
            duration = legs['duration_in_traffic']
            i['duration_in_traffic'] = duration
            i['duration_in_traffic_value'] = duration['value']
            if 'weather' in route:
                route_weather = {}
                route_weather = route['weather']
                if 'start_address' in route_weather:
                    weather = route_weather['start_address']
                    weather_impact = getGeneralisedWeatherFactor(weather['weather'])
                else:
                    weather_impact = 0
            else:
                weather_impact = 0
            i['weather_impact'] = weather_impact
            i['duration_in_traffic_weather_value'] = duration['value'] + (duration['value'] * weather_impact)
            i['duration_in_traffic_weather_text'] = str(int(duration['value'] + (duration['value'] * weather_impact))/60) + ' mins'
            i['departure_time_of_day'] = route['departure_time_of_day']
            i['departure_day'] = route['departure_day']
            i['fastest'] = False

            d = day[day_name]
            d['routes'].append(i)

        for d in day:
            day_data = day[d]
            l = day_data['routes']

            fastest_index = 0
            current_fastest = 9999
            fastest_tod = ""

            idx = 0
            for item in l:
                if item['duration_in_traffic_weather_value'] < current_fastest:
                    fastest_tod = item['departure_time_of_day']
                    fastest_duration = item['duration_in_traffic_weather_text']

                    current_fastest = item['duration_in_traffic_weather_value']
                    fastest_index = idx
                idx += 1

            data = {}
            data = l[fastest_index]
            data['fastest'] = True
            day_data['optimal_time'] = fastest_tod
            day_data['optimal_duration'] = fastest_duration
            day_data['optimal_duration_value'] = int(current_fastest)

        return day

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno, e)

@app.route('/hecate/api/v1.0/route', methods=['POST'])
@crossdomain(origin='*')
# @oauth.require_oauth()
def get_route():
    try:
        # data = dict(urlparse.parse_qsl(request.data))
        start_address = request.form['start_address']
        end_address = request.form['end_address']
        transport_method = request.form['transport_method']
        travel_days = initialise_days(request.form['days'].split(","))
        homebound_outbound = request.form['homebound_outbound']
        outbound_times = json.loads(request.form['outbound_times'])

        for item in outbound_times:
            outbound_times[item]['earliest_start'] = outbound_times[item]['earliest_start'].replace('am', '')
            outbound_times[item]['latest_start'] = outbound_times[item]['latest_start'].replace('am', '').replace('pm', '')
            outbound_times[item]['current_start'] = outbound_times[item]['current_start'].replace('am', '').replace('pm',
                                                                                                                    '')
        homebound_times = json.loads(request.form['homebound_times'])
        for item in homebound_times:
            homebound_times[item]['earliest_home'] = homebound_times[item]['earliest_home'].replace('am', '').replace('pm',
                                                                                                                      '')
            homebound_times[item]['latest_home'] = homebound_times[item]['latest_home'].replace('am', '').replace('pm', '')
            homebound_times[item]['current_home'] = homebound_times[item]['current_home'].replace('am', '').replace('pm','')

        # TODO: REPEAT FOR HOMEBOUND
        g_outbound = Google()
        g_outbound.init_Future(start_address, end_address, transport_method, travel_days, outbound_times, homebound_times,
                               'anonymous', 'departure', homebound_outbound, 'api')
        outbound_results = g_outbound.obtain_Insert_API_Data(homebound_outbound)


        g_homebound = Google()
        g_homebound.init_Future(start_address, end_address, transport_method, travel_days, outbound_times, homebound_times,
                               'anonymous', 'departure', 'homebound', 'api')

        homebound_results = g_homebound.obtain_Insert_API_Data(homebound_outbound)

        outbound_routes = buildJSON(outbound_results)

        homebound_routes = buildJSON(homebound_results)


        return json.dumps({'success': True,
                           'outbound_data': outbound_routes,
                           'homebound_data': homebound_routes
                           }), 200, {'ContentType': 'application/json'}

    except Exception, e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)


@app.route('/hecate/api/v1.0/stats', methods=['GET'])
@crossdomain(origin='*')
# @oauth.require_oauth()
def get_stats():
    try:
        username = request.args.get('username')

        # Ensure the username hasn't come through with quotes at the beginning and end
        if username.startswith('"') and username.endswith('"'):
            username = username[1:-1]

        # Connect to MongoDB
        client = MongoClient()

        db = client.Hecate
        collection = db.Stats

        # Obtain the user details from the DB
        stats = collection.find({'username': username})

        if stats <> None:
            total_saved = {}
            total_saved['outbound'] = {}
            total_saved['homebound'] = {}
            min_date = None
            total_saved_seconds = 0
            hours_per_year = 0  # Hours saved per week x 48 weeks.
            total_days = 0
            today_outbound_departure = 'No'
            today_outbound_time_saved = 0
            today_homebound_departure = 'No'
            today_homebound_time_saved = 0

            first_week = False
            for stat in stats:
                if min_date == None or stat['updated_at'] < min_date:
                    min_date = stat['updated_at']

                days = {}
                ts_out = total_saved['outbound']
                days = stat['outbound']
                outbound = {}
                homebound = {}

                for day in days:
                    d = {}
                    d = days[day]
                    if day == calendar.day_name[datetime.today().weekday()]:
                        today_outbound_departure = d['suggested_departure']
                        today_outbound_time_saved = d['time_saved']

                    total_saved_seconds += d['time_saved']
                    total_days += 1
                    if day in ts_out:
                        ts_out[day] += d['time_saved']
                    else:
                        ts_out[day] = d['time_saved']

                    o = {}
                    if 'route' in d:
                        route = d['route']
                        if 'weather' in route:
                            weather = route['weather']
                            if 'start_address' in weather:
                                w = weather['start_address']
                                temp = w['temperature']
                                far = temp['fahrenheit']
                                o['weather'] = w['weather']
                                o['min_temp'] = int(far['min'])
                                o['max_temp'] = int(far['max'])
                            else:
                                o['weather'] = 'Clear'
                                o['min_temp'] = 0
                                o['max_temp'] = 0
                        else:
                            o['weather'] = 'Clear'
                            o['min_temp'] = 0
                            o['max_temp'] = 0
                    else:
                        o['weather'] = 'Clear'
                        o['min_temp'] = 0
                        o['max_temp'] = 0
                    o['departure_time']= d['suggested_departure']
                    dt=datetime.strptime(d['suggested_departure'],"%H:%M")
                    arrival = dt + timedelta(minutes=int((d['suggested_duration'] + d['weather_impact'] ) / 60.0))
                    o['est_arrival'] = str(datetime.strftime(arrival,"%H:%M"))
                    o['duration']= int(d['suggested_duration'] / 60.0)
                    o['weather_impact'] = float("{0:.2f}".format(d['weather_impact'] / 60.0))
                    o['duration_weather'] =  int((d['suggested_duration'] + d['weather_impact'] ) / 60.0)

                    outbound[day] = o

                wday = datetime.today() + timedelta(days=1)
                day_check = calendar.day_name[wday.weekday()]
                if today_outbound_departure == None:
                    for day in days:
                        d = {}
                        d = days[day]
                        if day == day_check:
                            today_outbound_departure = d['suggested_departure']
                            today_outbound_time_saved = d['time_saved']

                days = {}
                ts_home = total_saved['homebound']
                days = stat['homebound']
                for day in days:
                    d = {}
                    d = days[day]
                    if day == calendar.day_name[datetime.today().weekday()]:
                        today_homebound_departure = d['suggested_departure']
                        today_homebound_time_saved = d['time_saved']

                    total_saved_seconds += d['time_saved']
                    total_days += 1
                    if day in ts_home:
                        ts_home[day] += d['time_saved']
                    else:
                        ts_home[day] = d['time_saved']

                    o = {}
                    if 'route' in d:
                        route = d['route']
                        if 'weather' in route:
                            weather = route['weather']
                            if 'start_address' in weather:
                                w = weather['start_address']
                                temp = w['temperature']
                                far = temp['fahrenheit']
                                o['weather'] = w['weather']
                                o['min_temp'] = int(far['min'])
                                o['max_temp'] = int(far['max'])
                            else:
                                o['weather'] = 'Clear'
                                o['min_temp'] = 0
                                o['max_temp'] = 0
                        else:
                            o['weather'] = 'Clear'
                            o['min_temp'] = 0
                            o['max_temp'] = 0
                    else:
                        o['weather'] = 'Clear'
                        o['min_temp'] = 0
                        o['max_temp'] = 0
                    o['departure_time']= d['suggested_departure']
                    dt=datetime.strptime(d['suggested_departure'],"%H:%M")
                    arrival = dt + timedelta(minutes=int((d['suggested_duration'] + d['weather_impact'] ) / 60.0))
                    o['est_arrival'] = str(datetime.strftime(arrival,"%H:%M"))
                    o['duration']= int(d['suggested_duration'] / 60.0)
                    o['weather_impact'] = float("{0:.2f}".format(d['weather_impact'] / 60.0))
                    o['duration_weather'] =  int((d['suggested_duration'] + d['weather_impact'] ) / 60.0)

                    homebound[day] = o

            if total_days > 0:
                hours_per_year = ((total_saved_seconds / 60.0) / 60.0) * 336.0 / total_days

            return json.dumps({'success': True,
                               'total_saved_minutes': float("{0:.2f}".format(total_saved_seconds / 60.0)),
                               'total_saved': total_saved,
                               'since': str(min_date),
                               'yearly_projected': float("{0:.2f}".format(hours_per_year)),
                               'today_outbound_departure': today_outbound_departure,
                               'today_outbound_time_saved': today_outbound_time_saved / 60.0,
                               'today_homebound_departure': today_homebound_departure,
                               'today_homebound_time_saved': today_homebound_time_saved / 60.0,
                               'outbound' : outbound,
                               'homebound': homebound
                               }), 200, {'ContentType': 'application/json'}
        else:
            print 'Stats not found'
            return json.dumps({'success': False}), 200, {'ContentType': 'application/json'}

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)


@app.route('/hecate/api/v1.0/dayStats', methods=['GET'])
@crossdomain(origin='*')
# @oauth.require_oauth()
def get_day_stats():
    try:
        username = request.args.get('username')

        # Ensure the username hasn't come through with quotes at the beginning and end
        if username.startswith('"') and username.endswith('"'):
            username = username[1:-1]

        # Connect to MongoDB
        client = MongoClient()
        db = client.Hecate
        collection = db.Checks

        # Obtain the user details from the DB
        stats = collection.find({'username': username}).sort("updated_at", -1)

        if stats <> None:
            stat = stats[0]
            return json.dumps({'success': True,
                               'outbound': stat['outbound'],
                               'homebound':stat['homebound']
                               }), 200, {'ContentType': 'application/json'}
        else:
            print 'Stats not found'
            return json.dumps({'success': False}), 200, {'ContentType': 'application/json'}

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

@app.route('/hecate/api/v1.0/dayWeather', methods=['GET'])
@crossdomain(origin='*')
# @oauth.require_oauth()
def get_day_weather():
    try:
        route_id = request.args.get('routeId')

        # Connect to MongoDB
        client = MongoClient()
        db = client.Hecate
        collection = db.Travel_Route

        # Obtain the user details from the DB
        route = collection.find({'_id': ObjectId(route_id)})

        if route <> None:
            r = route[0]
            weather_object = r['weather']
            if 'start_address' in weather_object:
                start_address = weather_object['start_address']
                weather = start_address['weather']
                temp = start_address['temperature']
                faren = temp['fahrenheit']
                min_temp = faren['min']
                max_temp = faren['max']
            else:
                weather = 'Clear'
                min_temp = 0
                max_temp = 0

            return json.dumps({'success': True,
                               'weather': weather,
                               'min': min_temp,
                               'max': max_temp,
                               }), 200, {'ContentType': 'application/json'}
        else:
            print 'Stats not found'
            return json.dumps({'success': False}), 200, {'ContentType': 'application/json'}

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)


@crossdomain(origin='*')
def next_weekday(d, weekday):
    try:
        d = d.date()
        days_ahead = weekday - d.weekday()

        if days_ahead <= 0:  # Target day already happened this week
            days_ahead += 7

        temp = d + timedelta(days=days_ahead)
        return str(d + timedelta(days=days_ahead))

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)


@app.route('/hecate/api/v1.0/recommendationsNews', methods=['GET'])
@crossdomain(origin='*')
# @oauth.require_oauth()
def get_recommendations():
    try:
        username = request.args.get('username')

        # Ensure the username hasn't come through with quotes at the beginning and end
        if username.startswith('"') and username.endswith('"'):
            username = username[1:-1]

        # Connect to MongoDB
        client = MongoClient()

        db = client.Hecate
        collection = db.Stats

        # Obtain the user details from the DB
        stats = collection.find({'username': username}).sort("updated_at", -1)

        if stats <> None:
            recommendation = ''
            day_numbers = {}
            for dayname, ind in zip(list(calendar.day_name), range(7)):
                day_numbers[dayname] = ind

            for stat in stats:
                r = {}
                days = {}
                days = stat['outbound']
                count = 0
                for day in days:
                    d = {}
                    d = days[day]
                    if d['new_recommendation'] == True:
                        r['day'] = day
                        r['date'] = next_weekday(stat['updated_at'], day_numbers[day])
                        r['suggested_departure'] = d['suggested_departure']
                        r['route_type'] = 'Outbound'
                        if d['time_saved'] / 60.0 < 1.0:
                            r['time_saved'] = '<1 minute!'
                        else:
                            r['time_saved'] = str(d['time_saved'] / 60) + ' minutes!'
                        r['updated_date'] = str(stat['updated_at'])

                        if count < 4:
                            recommendation += '<li><a href="">New Recommendation: %s. Possible time saving of %s</a> <span className="feed-date">%s</span><br/><br/></li>' % (
                            day, r['time_saved'], stat['updated_at'].date())

                days = {}
                days = stat['homebound']
                count = 0
                for day in days:
                    d = {}
                    d = days[day]
                    if d['new_recommendation'] == True:
                        r['day'] = day
                        r['date'] = next_weekday(stat['updated_at'], day_numbers[day])
                        r['suggested_departure'] = d['suggested_departure']
                        r['route_type'] = 'Outbound'
                        if (d['time_saved'] / 60.0) < 1.0:
                            r['time_saved'] = '<1 minute!'
                        else:
                            r['time_saved'] = str(d['time_saved'] / 60) + ' minutes!'
                        r['updated_date'] = str(stat['updated_at'])

                        if count < 4:
                            recommendation += '<li><a href="">New Recommendation: %s. Possible time saving of %s</a> <span className="feed-date">%s</span><br/><br/></li>' % (
                            day, r['time_saved'], stat['updated_at'].date())

            return json.dumps(recommendation), 200, {'ContentType': 'application/json'}
        else:
            print 'Stats not found'
            return json.dumps({'success': False}), 200, {'ContentType': 'application/json'}

    except Exception, e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)


@app.route('/')
def index():
    return "Hello, World!"


if __name__ == '__main__':
    #   ResourceOwnerPasswordCredentials(app)
    #   app.run(ssl_context='adhoc', host='0.0.0.0')
    app.run(host='0.0.0.0')
