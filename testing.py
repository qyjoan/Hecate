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


{
    "_id" : ObjectId("56befcc48dde12240b0347c4"),
    "username" : "samacart",
    "name" : "Simon Macarthur",
    "admin" : true,
    "route" : {
        "times" : {
            "outbound" : {
                "Thursday" : {
                    "earliest_start" : "06:30",
                    "start_commute" : "07:00",
                    "current_start" : "06:30",
                    "latest_arrive" : "09:00",
                    "user_travel_time" : 90,
                    "current_duration" : 3181,
                    "earliest_arrive" : "07:30",
                    "latest_start" : "07:30"
                },
                "Tuesday" : {
                    "earliest_start" : "06:30",
                    "start_commute" : "07:00",
                    "current_start" : "06:30",
                    "latest_arrive" : "09:00",
                    "user_travel_time" : 90,
                    "current_duration" : 2919,
                    "earliest_arrive" : "07:30",
                    "latest_start" : "07:30"
                },
                "Friday" : {
                    "earliest_start" : "06:30",
                    "start_commute" : "07:00",
                    "current_start" : "07:30",
                    "latest_arrive" : "09:00",
                    "user_travel_time" : 90,
                    "current_duration" : 3378,
                    "earliest_arrive" : "07:30",
                    "latest_start" : "07:30"
                },
                "Wednesday" : {
                    "earliest_start" : "06:30",
                    "start_commute" : "07:00",
                    "current_start" : "06:30",
                    "latest_arrive" : "09:00",
                    "user_travel_time" : 90,
                    "current_duration" : 3028,
                    "earliest_arrive" : "07:30",
                    "latest_start" : "07:30"
                },
                "Monday" : {
                    "earliest_start" : "06:30",
                    "start_commute" : "07:00",
                    "current_start" : "06:30",
                    "latest_arrive" : "09:00",
                    "user_travel_time" : 90,
                    "current_duration" : 2918,
                    "earliest_arrive" : "07:30",
                    "latest_start" : "07:30"
                }
            },
            "homebound" : {
                "Thursday" : {
                    "earliest_start" : "16:00",
                    "start_commute" : "16:30",
                    "current_start" : "17:40",
                    "user_travel_time" : 60,
                    "current_duration" : 2324,
                    "latest_start" : "18:30"
                },
                "Tuesday" : {
                    "earliest_start" : "16:00",
                    "start_commute" : "16:30",
                    "current_start" : "18:00",
                    "user_travel_time" : 60,
                    "current_duration" : 2322,
                    "latest_start" : "18:30"
                },
                "Friday" : {
                    "earliest_start" : "16:00",
                    "start_commute" : "16:30",
                    "current_start" : "18:30",
                    "user_travel_time" : 60,
                    "current_duration" : 2341,
                    "latest_start" : "18:30"
                },
                "Wednesday" : {
                    "earliest_start" : "16:00",
                    "start_commute" : "16:30",
                    "current_start" : "17:50",
                    "user_travel_time" : 60,
                    "current_duration" : 2315,
                    "latest_start" : "18:30"
                },
                "Monday" : {
                    "earliest_start" : "16:00",
                    "start_commute" : "16:30",
                    "current_start" : "18:30",
                    "user_travel_time" : 60,
                    "current_duration" : 2321,
                    "latest_start" : "18:30"
                }
            }
        },
        "transportation" : "driving",
        "days" : [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],
        "address" : {
            "start_location" : {
                "geometry" : {
                    "location" : {
                        "lat" : -33.9752737000000025,
                        "lng" : 151.0950191000000018
                    },
                    "location_type" : "RANGE_INTERPOLATED",
                    "viewport" : {
                        "northeast" : {
                            "lat" : -33.9739322197085016,
                            "lng" : 151.0963705802915058
                        },
                        "southwest" : {
                            "lat" : -33.9766301802915009,
                            "lng" : 151.0936726197085136
                        }
                    },
                    "bounds" : {
                        "northeast" : {
                            "lat" : -33.9752737000000025,
                            "lng" : 151.0950240999999892
                        },
                        "southwest" : {
                            "lat" : -33.9752887000000001,
                            "lng" : 151.0950191000000018
                        }
                    }
                },
                "address_components" : [
                    {
                        "long_name" : "55",
                        "short_name" : "55",
                        "types" : [
                            "street_number"
                        ]
                    },
                    {
                        "long_name" : "Hurstville Road",
                        "short_name" : "Hurstville Rd",
                        "types" : [
                            "route"
                        ]
                    },
                    {
                        "long_name" : "Hurstville Grove",
                        "short_name" : "Hurstville Grove",
                        "types" : [
                            "locality",
                            "political"
                        ]
                    },
                    {
                        "long_name" : "New South Wales",
                        "short_name" : "NSW",
                        "types" : [
                            "administrative_area_level_1",
                            "political"
                        ]
                    },
                    {
                        "long_name" : "Australia",
                        "short_name" : "A",
                        "types" : [
                            "country",
                            "political"
                        ]
                    },
                    {
                        "long_name" : "2220",
                        "short_name" : "2220",
                        "types" : [
                            "postal_code"
                        ]
                    }
                ],
                "place_id" : "EjY1NSBIdXJzdHZpbGxlIFJkLCBIdXJzdHZpbGxlIEdyb3ZlIE5TVyAyMjIwLCBBdXN0cmFsaWE",
                "formatted_address" : "55 Hurstville Rd,Hurstville Grove NSW 2220,Australia",
                "types" : [
                    "street_address"
                ]
            },
            "end_location" : {
                "geometry" : {
                    "location" : {
                        "lat" : -33.8461459000000033,
                        "lng" : 151.2396310000000028
                    },
                    "location_type" : "ROOFTOP",
                    "viewport" : {
                        "northeast" : {
                            "lat" : -33.8447969197085001,
                            "lng" : 151.2409799802915131
                        },
                        "southwest" : {
                            "lat" : -33.8474948802914994,
                            "lng" : 151.2382820197084925
                        }
                    },
                    "bounds" : {
                        "northeast" : {
                            "lat" : -33.8458028000000013,
                            "lng" : 151.2398987999999918
                        },
                        "southwest" : {
                            "lat" : -33.8464889999999983,
                            "lng" : 151.2393632000000139
                        }
                    }
                },
                "address_components" : [
                    {
                        "long_name" : "Taronga Zoo",
                        "short_name" : "Taronga Zoo",
                        "types" : [
                            "premise"
                        ]
                    },
                    {
                        "long_name" : "Athol Wharf Road",
                        "short_name" : "Athol Wharf Rd",
                        "types" : [
                            "route"
                        ]
                    },
                    {
                        "long_name" : "Mosman",
                        "short_name" : "Mosman",
                        "types" : [
                            "locality",
                            "political"
                        ]
                    },
                    {
                        "long_name" : "New South Wales",
                        "short_name" : "NSW",
                        "types" : [
                            "administrative_area_level_1",
                            "political"
                        ]
                    },
                    {
                        "long_name" : "Australia",
                        "short_name" : "A",
                        "types" : [
                            "country",
                            "political"
                        ]
                    }
                ],
                "place_id" : "ChIJmd8-VC-sEmsRaRpiZS5eBd4",
                "formatted_address" : "Taronga Zoo, Athol Wharf Rd, Mosman NSW, Australia",
                "types" : [
                    "premise"
                ]
            }
        }
    },
    "updated_at" : ISODate("2016-03-27T23:37:02.432Z"),
    "password" : "password",
    "created_at" : "2016-02-1320:22",
    "next_check_time" : ISODate("2016-04-24T06:20:49.108Z")
}