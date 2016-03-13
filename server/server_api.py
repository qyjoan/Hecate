import requests
import json

from constants import START_ADDRESS, END_ADDRESS, DAYS, TRANSPORT_METHOD, \
    OUTBOUND, HOMEBOUND, EARLIEST_START, LATEST_START, CURRENT_START, \
    EARLIEST_HOME, LATEST_HOME, CURRENT_HOME, OUTBOUND_HOMEBOUND, \
    OUTBOUND_TIMES, HOMEBOUND_TIMES

def consumeGETRequestSync():
    params = {}
    params[START_ADDRESS] = '10 Bourke Street, Sydney, NSW, Australia'
    params[END_ADDRESS] = '320 Pitt Street, Sydney, NSW, Australia'
    params[DAYS] = ['Monday','Tuesday', 'Friday']
    params[TRANSPORT_METHOD] = 'driving'
    params[OUTBOUND_HOMEBOUND] = 'outbound'

    # Setup outbound days and times
    params[OUTBOUND_TIMES] = {}
    times = {}

    # Monday
    time = {}
    time[EARLIEST_START] = '07:30'
    time[LATEST_START] = '08:30'
    time[CURRENT_START] = '08:00'
    times['Monday'] = time

    # Tuesday
    time = {}
    time[EARLIEST_START] = '07:30'
    time[LATEST_START] = '08:30'
    time[CURRENT_START] = '08:00'
    times['Tuesday'] = time

    # Friday
    time = {}
    time[EARLIEST_START] = '07:00'
    time[LATEST_START] = '08:00'
    time[CURRENT_START] = '08:00'
    times['Friday'] = time

    params[OUTBOUND_TIMES] = times

    # Setup homebound days and times
    params[HOMEBOUND_TIMES] = {}
    times = {}

    # Monday
    time = {}
    time[EARLIEST_HOME] = '17:30'
    time[LATEST_HOME] = '18:30'
    time[CURRENT_HOME] = '18:00'
    times['Monday'] = time

    # Tuesday
    time = {}
    time[EARLIEST_HOME] = '17:30'
    time[LATEST_HOME] = '18:30'
    time[CURRENT_HOME] = '18:00'
    times['Tuesday'] = time

    # Friday
    time = {}
    time[EARLIEST_HOME] = '17:00'
    time[LATEST_HOME] = '18:00'
    time[CURRENT_HOME] = '18:00'
    times['Friday'] = time

    params[HOMEBOUND_TIMES] = times

    url = 'https://54.191.104.28:5000/hecate/api/v1.0/route'

    access_token = 'pPtnW5rm3FolTDVcGUvBH89CfC8lqR'
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

consumeGETRequestSync()