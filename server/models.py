
from google.appengine.ext import ndb


class Route(ndb.Model):
    created = ndb.DateTimeProperty(auto_now_add=True)
    home_address = ndb.StringProperty()
    work_address = ndb.StringProperty()
    mode_of_transport = ndb.StringProperty()

    current_leave_time = ndb.TimeProperty()
    current_leave_transit_time = ndb.IntegerProperty()
    earliest_leave_time = ndb.TimeProperty()
    latest_leave_time = ndb.TimeProperty()

    current_return_time = ndb.TimeProperty()
    current_return_transit_time = ndb.IntegerProperty()
    earliest_return_time = ndb.TimeProperty()
    latest_return_time = ndb.TimeProperty()



