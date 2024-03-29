import googlemaps
import datetime
from datetime import timedelta
import time
from dateutil import tz
import time
from c_Google import *
from c_User import *

user = User('samacart')
user.Initialise()
user.set_Next_Check_Time(datetime.now() +  + timedelta(hours=-11))

user.print_Details()

# Monday is 0, Sunday is 6. So we want 0 (Monday) and 4 (Friday)
# today = datetime.today().date()
# monday = today + timedelta( (0-today.weekday()) % 7 )
# friday = today + timedelta( (4-today.weekday()) % 7 )
#
# print 'Monday is: ' + str(monday)
# print 'Friday is: ' + str(friday)
#
# departure_time_min = datetime.strptime('07:00:00', '%H:%M:%S').time()
# departure_time_max = datetime.strptime('08:00:00', '%H:%M:%S').time()
# g = Google('Menai, NSW', 'Taronga Zoo, NSW', 'driving', monday, friday, departure_time_min, departure_time_max)
# g.obtain_Insert_API_Data()


# Geocoding an address
# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

# Look up an address with reverse geocoding
#reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

# Request directions via public transit
#now = datetime.now()
#directions_result = gmaps.directions("Menai, NSW",
#                                     "Taronga Zoo, NSW",
#                                     mode="driving",
#                                     departure_time=departure_time)

#print directions_result
