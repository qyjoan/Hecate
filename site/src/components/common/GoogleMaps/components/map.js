var React = require('react'),
    vent = require('../util/vent'),
    Promise = require('promise');

var directionsDisplay,
    directionsService,
    placesService,
    DEFAULT_LOCATION,
    LatLng;

var Map = React.createClass({

    componentDidMount: function () {
        var google = this.props.mapService;
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();
        DEFAULT_LOCATION = new google.maps.LatLng(13.0827, 80.2707);
        LatLng = google.maps.LatLng;
        this.renderMap({
            zoom: 7,
            center: DEFAULT_LOCATION,
            disableDefaultUI:true
        });
        placesService = new google.maps.places.PlacesService(this.map);

        vent.on('map:nearby:places:refresh', this.refreshNearby, this);
        vent.on('map:places:refresh', this.refreshPlaces, this);
        vent.on('map:route:way-points:update', this.updateWayPoints, this);
        this.updateWayPoints();
    },
    updateDistanceData: function (response) {
        vent.trigger('map:route:distance:update', response);
    },
    refreshNearby: function () {
        var wayPoints = this.props.route.get('wayPoints'),
            nearByPromises = [];
        wayPoints.each(function (wayPoint) {
            var placeId = wayPoint.get('placeId'),
                nearBy = wayPoint.get('nearBy'),
                placeDetails = wayPoint.get('placeDetails') || {},
                geometry = placeDetails.geometry || {},
                location = geometry || {},
                latlng = new LatLng(location.k, location.D),
                promise;
            if (placeId && !nearBy) {
                promise = new Promise(function (resolve) {
                    placesService.nearbySearch({
                        location: latlng,
                        radius: '50',
                        query: 'attractions'
                    }, function (results, status) {
                        if (status === 'OK') {
                            wayPoint.set('nearBy', results, {silent: true});
                            resolve();
                        }
                    });
                });
                nearByPromises.push(promise);
            }
        });
        if (nearByPromises.length > 0) {
            Promise.all(nearByPromises).then(function () {
                vent.trigger('app:save');
            });
        }
    },
    refreshPlaces: function () {
        var wayPoints = this.props.route.get('wayPoints'),
            placePromises = [];
        wayPoints.each(function (wayPoint) {
            var placeId = wayPoint.get('placeId'),
                placeDetails = wayPoint.get('placeDetails'),
                promise;

            if (placeId && !placeDetails) {
                promise = new Promise(function (resolve) {
                    placesService.getDetails({
                        placeId: placeId
                    }, function (place, status) {
                        if (status === 'OK') {
                            wayPoint.set({
                                placeId: place.place_id,
                                placeDetails: place
                            }, {silent: true});
                            resolve();
                        }
                    });
                });
                placePromises.push(promise);
            }
        });
        if (placePromises.length > 0) {
            Promise.all(placePromises).then(function () {
                //vent.trigger('map:nearby:places:refresh');
                vent.trigger('app:save');
            });
        } else {
            //vent.trigger('map:nearby:places:refresh');
        }
    },
    updateWayPoints: function () {
        var wayPoints = this.props.route.get('wayPoints'),
            google = this.props.mapService,
            request = {
                origin: wayPoints.at(0).get('name'),
                destination: wayPoints.at(wayPoints.length - 1).get('name'),
                travelMode: google.maps.TravelMode.DRIVING
            },
            wayPointsList = [],
            i,
            noOfWayPoints = wayPoints.length - 2,
            self = this;

        if (noOfWayPoints > 0) {
            for (i = 1; i <= noOfWayPoints; i++) {
                wayPointsList.push({
                    location: wayPoints.at(i).get('name')
                });
            }
            request.waypoints = wayPointsList;
        }

        directionsService.route(request, function (response, status) {
            if (status === 'OK') {
                self.updateDistanceData(response);
                directionsDisplay.setDirections(response);
            }
        });
    },
    renderMap: function (mapOptions) {
        var google = this.props.mapService,
            mapCanvas = document.getElementById('map'),
            vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        mapCanvas.style.height = vH + 'px';
        this.map = new google.maps.Map(mapCanvas, mapOptions);
        directionsDisplay.setMap(this.map);

    },
    render: function () {
        return (
            <div id='map' className='route-map'></div>
            );
    }
});

module.exports = Map;