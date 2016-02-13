import googlemaps

for line in open("hecate.conf"):
    data = line.split('\n')[0].split('\t')
    api_type = data[0]
    api_key = data[1]

    if api_type == "Google":
        api_key = api_key

# Get the handle to the API
gmaps = googlemaps.Client(key=api_key)

# Geocoding an address
geocode_result = gmaps.geocode('Taronga Zoo, NSW, Australia')

print geocode_result

