#Value Proposition

On average commuters spend x minutes in traffic. If we can reduce that time by 10% we can save the average person Y hours of time in traffic per year!

---

#JSON Templates

## User:
Each user has a profile in this collection.
````
{
    "username" : <Username of this user>,
    "next_check_time" : <Next time to poll the Google API for this route>,
    "name" : <Name of this user>,
    "admin" : <Admin flag - possibly use on front end>,
    "route" : { <The route to track>
        "times" : {
            "outbound" : {
                "Monday": {
	                "earliest_start" : <Earliest time this user wants to depart from location A to location B>,
	                "current_start" : <Time this user currently departs from location A to location B>,
	                "latest_arrive" : <Latest time this user wants to arrive at Location B from Location A>,
	                "current_duration" : <Current time this user states it takes to go from Location A to Location B>,
	                "earliest_arrive" :  <Earliest time this user wants to arrive at Location B from Location A>,,
	                "latest_start" : <Latest time this user wants to depart from location A to location B>
	            },
                "Wednesday": {
	                "earliest_start" : <Earliest time this user wants to depart from location A to location B>,
	                "current_start" : <Time this user currently departs from location A to location B>,
	                "latest_arrive" : <Latest time this user wants to arrive at Location B from Location A>,
	                "current_duration" : <Current time this user states it takes to go from Location A to Location B>,
	                "earliest_arrive" :  <Earliest time this user wants to arrive at Location B from Location A>,,
	                "latest_start" : <Latest time this user wants to depart from location A to location B>
	            },
                "Friday": {
	                "earliest_start" : <Earliest time this user wants to depart from location A to location B>,
	                "current_start" : <Time this user currently departs from location A to location B>,
	                "latest_arrive" : <Latest time this user wants to arrive at Location B from Location A>,
	                "current_duration" : <Current time this user states it takes to go from Location A to Location B>,
	                "earliest_arrive" :  <Earliest time this user wants to arrive at Location B from Location A>,,
	                "latest_start" : <Latest time this user wants to depart from location A to location B>
	            }
            },
            "homebound" : {
                "Monday": {
	                "earliest_start" : <Earliest time this user wants to depart from location B to location A>,
	                "latest_start" : <Latest time this user wants to depart from location B to location A>,
	                "current_duration" : <Current time this user states it takes to go from Location B to Location A>,
	                "current_start" : <Time this user currently departs from location B to location A>
                },
                "Wednesday": {
	                "earliest_start" : <Earliest time this user wants to depart from location B to location A>,
	                "latest_start" : <Latest time this user wants to depart from location B to location A>,
	                "current_duration" : <Current time this user states it takes to go from Location B to Location A>,
	                "current_start" : <Time this user currently departs from location B to location A>
                },
                "Friday": {
	                "earliest_start" : <Earliest time this user wants to depart from location B to location A>,
	                "latest_start" : <Latest time this user wants to depart from location B to location A>,
	                "current_duration" : <Current time this user states it takes to go from Location B to Location A>,
	                "current_start" : <Time this user currently departs from location B to location A>
                }
            }
        },
        "transportation" : <Method of Transportation - options are driving, walking, bicycling, transit>,
        "days" : [ <List of days the user travels this route> ],
        "address" : {
            "start_location" : {
                "formatted_address" : <Address of Start Location - location A>,
                "last_updated" : <Date when start location was last updated>
            },
            "end_location" : {
                "formatted_address" : <Address of Start Location - location B>
                "last_updated" : <Date when end location was last updated>
            }
        }
    },
    "password" : <User Password to access system (if needed)>,
    "created_at" : <Date this record was created>,
    "updated_at" : <Date this record was amended>
}
````

## Route:

Route information from the Google API is stored in this collection.

Most of this information is the response from Google, with more details found at https://developers.google.com/maps/documentation/directions/intro

Additional items are added for the purposes of the Hecate application. These include:
	- username: the username from the User collection so data can be linked as needed.
	- start_address: the address this route started from - can be location A or Location B
	- travel_mode: Method of Transportation - options are driving, walking, bicycling, transit
	- departure_time_of_day: The time of day this information relates to
	- departure_day: The day of week that this information relates to
	- method_time: The time method used in the API call - departure or arrival
	- departure_time: The exact date and time used in the API call
	- route_type: The type of route - homebound or outbound
	- live: A true / false flag to indicate if this was live traffic data

## Stats:

Recommendation for routes:

###Logic:

	- find all google routes results with estimated duration less than user input
	- for each day that the user travel update with new recommendation (if exists)

###Data Structure:

````
{'username': 'qyjoan', 
 'outbound':
	{'monday': 
		{'new_recommendation':,           #True/False
         	 'current_departure':,            #Current Departure Time
         	 'suggested_departure':,          #Suggested Departure Time (None if not exists)
         	 'current_duration':,             #Current Duration (min)
         	 'suggested_route_duration':,     #Suggested Duration (None if not exists)
         	 'time_saved':                    #Number of minutes saved
        	 },
         'tuesday': 
		{'new_recommendation':,           #True/False
         	 'current_departure':,            #Current Departure Time
         	 'suggested_departure':,          #Suggested Departure Time (None if not exists)
         	 'current_duration':,             #Current Duration (min)
         	 'suggested_route_duration':,     #Suggested Duration (None if not exists)
         	 'time_saved':                    #Number of minutes saved
        	 }
     	},
'homebound':
	{'monday': {'new_recommendation':,
         	    'current_departure':,
         	    'suggested_departure':,
         	    'current_duration':,
         	    'suggested_route_duration':,
         	    'time_saved':
         	   },
         'tuesday': {'new_recommendation':,
         	    'current_departure':,
         	    'suggested_departure':,
         	    'current_duration':,
         	    'suggested_route_duration':,
         	    'time_saved':
         	   }
     	}
}

````
