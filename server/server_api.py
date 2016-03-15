import json
import logging
import settings
import urllib

from google.appengine.api import urlfetch

from constants import START_ADDRESS, END_ADDRESS, DAYS, TRANSPORT_METHOD, \
    OUTBOUND, HOMEBOUND, EARLIEST_START, LATEST_START, CURRENT_START, \
    EARLIEST_HOME, LATEST_HOME, CURRENT_HOME, OUTBOUND_HOMEBOUND, \
    OUTBOUND_TIMES, HOMEBOUND_TIMES

def consumeGETRequestSync(payload):
    params = {}
    params[START_ADDRESS] = payload.get(START_ADDRESS)
    params[END_ADDRESS] = payload.get(END_ADDRESS)
    params[DAYS] = payload.get(DAYS)
    params[TRANSPORT_METHOD] = 'driving'
    params[OUTBOUND_HOMEBOUND] = 'outbound'

    # Setup outbound days and times
    times = {}

    for day in payload.get(DAYS):
        # Monday
        time = {}
        time[EARLIEST_START] = payload.get(EARLIEST_START)
        time[LATEST_START] = payload.get(LATEST_START)
        time[CURRENT_START] = payload.get(CURRENT_START)
        times[day] = time

    params[OUTBOUND_TIMES] = times

    # Setup homebound days and times
    times = {}

    for day in payload.get(DAYS):
        # Monday
        time = {}
        time[EARLIEST_HOME] = payload.get(EARLIEST_HOME)
        time[LATEST_HOME] = payload.get(LATEST_HOME)
        time[CURRENT_HOME] = payload.get(CURRENT_HOME)
        times[day] = time

    params[HOMEBOUND_TIMES] = times

    url = settings.URL

    access_token = settings.ACCESS_TOKEN
    headers = {
        'Authorization': 'Bearer {}'.format(access_token),
        'Content-Type': 'application/json'
    }

    # call get service with headers and params
    response = urlfetch.fetch(
        url=url,
        payload=json.dumps(params),
        method=urlfetch.POST,
        headers=headers,
        validate_certificate=False
    )

    logging.info("=========================")
    logging.info("=========================")
    logging.info("code:"+ str(response.status_code))
    logging.info("=========================")
    logging.info("headers:"+ str(response.headers))
    logging.info("=========================")
    logging.info("content:"+ str(response.content))
    logging.info("=========================")
    logging.info("json:"+ json.load(response.content))
    logging.info("=========================")
    logging.info("=========================")
    return response.content
