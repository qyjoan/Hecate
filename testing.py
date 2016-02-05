import googlemaps
from datetime import datetime
from dateutil import tz
import time
from c_Google import *

departure_time = datetime.strptime('2016-02-08 07:30:00', '%Y-%m-%d %H:%M:%S')

g = Google('Menai, NSW', 'Taronga Zoo, NSW', 'driving', departure_time)
g.obtain_Insert_API_Data()

# Geocoding an address
#geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

# Look up an address with reverse geocoding
#reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

# Request directions via public transit
#now = datetime.now()
#directions_result = gmaps.directions("Menai, NSW",
#                                     "Taronga Zoo, NSW",
#                                     mode="driving",
#                                     departure_time=departure_time)

#print directions_result
