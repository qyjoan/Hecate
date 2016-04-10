import Stats
from util import utils
from Stats import Recommendation
import sys
from datetime import datetime
from pymongo import MongoClient
import copy

DEFAULT_ACCEPT = {day : True for day in ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']}

client = MongoClient()
db = client.Hecate
users = db.User
stats = db.Stats

def print_updates(updates):
    if updates == {}:
        return "no updates"
    for rt in ['outbound', 'homebound']:
        print rt
        print "====="
        if updates[rt] == {}:
            print "no updates for {}".format(rt)
            continue
        else:
            for day in updates[rt]:
                print day
                for k in updates[rt][day]:
                    if k != 'route':
                        print "   {}: {}".format(k, updates[rt][day][k])
    return


def get_latest_stats(username):
    pipeline = [{"$match": {"username": username}},
                {"$group": {"_id": "$username", "latest_update": {"$max": "$updated_at"}}}]
    update_dt = stats.aggregate(pipeline).next().get('latest_update')
    latest_stat = stats.find_one({"username": username, "updated_at": update_dt})
    return latest_stat

def update_user(rec, update, accepted=DEFAULT_ACCEPT):
    user = rec.user
    for route_type in user['route']['times']:
        for day in user['route']['times'][route_type]:
            if accepted.get(day) and update.has_key(route_type) and update[route_type].has_key(day) and update[route_type][day]['new_recommendation']:
                user['route']['times'][route_type][day]['current_duration'] = update[route_type][day]['suggested_duration']
                user['route']['times'][route_type][day]['current_start'] = update[route_type][day]['suggested_departure']
    user.pop("_id")
    return user

def print_user_updates(old_user, new_user):
    print "          old, new"
    for route_type in ['outbound', 'homebound']:
        print route_type
        for day in old_user['route']['times'][route_type]:
            print day
            for k in old_user['route']['times'][route_type][day]:
                print "{}:{},{}".format(k, old_user['route']['times'][route_type][day][k], new_user['route']['times'][route_type][day][k])

def fill_missing_update(last_update, cur_update):
    current_update = copy.deepcopy(cur_update)
    missing = 0
    for route_type in ['homebound', 'outbound']:
        current_update[route_type] = current_update.get(route_type, {})
        for day in last_update[route_type]:
            # fill in with last update if missing
            if current_update[route_type].get(day) is None:
                missing += 1
                print "No new route updates for {} on {}.".format(route_type, day)
                print "Using last recommendation for user."
                current_update[route_type][day] = last_update[route_type][day]
                current_update[route_type][day]['new_recommendation'] = False
    if missing == 0:
        print "No missing for user {}.".format(last_update['username'])
    else:
        print "Total missing values filled: {}".format(missing)
    return current_update

def main(username, no_update=True):
    print username
    update = {}
    rec = Recommendation(username)
    for route_type in ['outbound','homebound']:
        print "Getting recommendation for {}...".format(route_type)
        df = rec.GetLatestFutureRoutes(route_type)
        if not df.empty:
            df_min = rec.AddMinDuration(df)
            df_min_rows = rec.GetMinDurationDepartureTimes(df_min)
            optimal = rec.GetOptimal(rec.MinTravelTimesByDay(df_min_rows), route_type)
            current_estimate = rec.GetCurrentEstimate(df_min, route_type)
            update[route_type] = rec.GenerateResult(current_estimate, optimal)
            update['username'] = username
            update['updated_at'] = datetime.now()
        else:
            print "No update for {}. Using last recommendation.".format(route_type)
            update[route_type] = {}
            update['username'] = username
            update['updated_at'] = datetime.now()

    last_update = get_latest_stats(username)
    print "Cheking last recommendation for missing field..."
    update_filled = fill_missing_update(last_update, update)
    #print_updates(update)
    #print_updates(update_filled)
    if update != {}:
        new_user = update_user(rec, update)
    #    print_user_updates(rec.user, new_user)
    if not no_update:
        print "Updating User table for {}".format(username)
        users.find_one_and_replace({'username':username}, new_user, upsert=False)
        #new_user['testing'] = True
        #users.insert_one(new_user)
        print "Inserting new record into Stats table for {}".format(username)
        #update['testing'] = True
        stats.insert_one(update)

if __name__=="__main__":
    args = sys.argv[1].split(',')
    if len(args) == 0:
        print "Argument required."
    elif len(args) == 1:
        username = args[0]
        if username != "all":
            main(username)
        else:
            for user in users.find():
                main(user['username'])
    elif len(args) == 2:
        username, update = args
        if username != "all" and update == 'update':
            print "updating one user: {}".format(username)
            main(username, False)
        elif username == "all" and update == 'update':
            print "Updating all users..."
            for user in users.find():
                main(user['username'], False)
        else:
             print "Argument format: all/username or all,update/username,update."
