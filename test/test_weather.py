import pyowm
import json

owm = pyowm.OWM('24d3c38432258a49a6a101c36f314732')

# You have a pro subscription? Use:
# owm = pyowm.OWM(API_key='your-API-key', subscription_type='pro')

# Will it be sunny tomorrow at this time in Milan (Italy) ?
forecast = owm.daily_forecast("Milan,it")
tomorrow = pyowm.timeutils.tomorrow()
forecast.will_be_sunny_at(tomorrow)  # Always True in Italy, right? ;-)

# Search for current weather in London (UK)
observation = owm.weather_at_place('London,uk')
w = observation.get_weather()
print(w)                      # <Weather - reference time=2013-12-18 09:20,
                              # status=Clouds>

# Weather details
print w.get_wind()                  # {'speed': 4.6, 'deg': 330}
print w.get_humidity()              # 87
print w.get_temperature('celsius')  # {'temp_max': 10.5, 'temp': 9.7, 'temp_min': 9.0}

# Search current weather observations in the surroundings of
# lat=22.57W, lon=43.12S (Rio de Janeiro, BR)

fc =  owm.daily_forecast('Sydney', limit=7)
f = fc.get_forecast()

lst = f.get_weathers()

for weather in lst:
    print (weather.get_reference_time('iso'),weather.get_status(), weather.get_temperature('celsius'), weather.get_temperature('fahrenheit'))

    weather_dict = {}
    weather_dict['start_location'] = {}
    weather_dict['start_location']['temperature'] = {}

    weather_dict['start_location']['weather'] = weather.get_status()
    weather_dict['start_location']['temperature']['celcius'] = weather.get_temperature('celsius')
    weather_dict['start_location']['temperature']['fahrenheit'] = weather.get_temperature('fahrenheit')
    print json.dumps(weather_dict)
