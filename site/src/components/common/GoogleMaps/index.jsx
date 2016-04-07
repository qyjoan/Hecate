var React = require('react'),
    vent = require('./util/vent'),
    Header = require('./components/header'),
    RouteTabs = require('./components/route-tabs'),
    RoutePlan = require('./components/route-plan'),
    Map = require('./components/map'),
    Place = require('./components/place'),
    RouteCollection = require('./models/routes'),
    RouteModel = require('./models/route'),
    WayPoints = require('./models/way-points'),
    SeedData = require('./util/seed-data'),
    Routes = require('./models/routes'),
    Route = require('./models/route'),
    routes,
    route;

function newRoute() {
    return new Route({
        name: 'Route name',
        wayPoints: new WayPoints([
            {name: 'Start'},
            {name: 'End'}
        ])
    });
}

var MapRoute = React.createClass({
    getInitialState: function () {
        return {
            routes: this.load(),
            previousRoute: -1,
            activeRoute: 0,
            selectedPlace: null
        };
    },
    componentDidMount: function () {
        vent.trigger('map:places:refresh');
        this.state.routes.on('remove change', this.updateRouteWayPoints);
        vent.on('app:save', this.save, this);
        vent.on('place:select', this.onSelectPlace, this);
        vent.on('place:close', this.onClosePlace, this);
    },
    onSelectPlace: function (place) {
        this.setState({
            selectedPlace: place
        });
    },
    onClosePlace: function () {
        this.setState({
            selectedPlace: null
        });
    },
    onAction: function (action, value) {
        switch (action) {
            case 'change-name':
                this.onRouteNameChange(value);
                break;
            case 'remove':
                this.onRouteRemove();
                break;
        }
    },
    onRouteSwitch: function (routeIndex) {
        this.setState({
            hideActiveRoute: true
        }, function () {
            setTimeout(function () {
                this.setState({
                    hideActiveRoute: false,
                    previousRoute: this.state.activeRoute,
                    activeRoute: routeIndex
                }, function () {
                    vent.trigger('map:route:way-points:update');
                });
            }.bind(this), 250);
        })
    },
    onRouteNameChange: function (value) {
        var route = this.state.routes.at(this.state.activeRoute);
        route.set('name', value);
        this.save();
        this.setState({
            routeUpdated: new Date().getTime()
        });
    },
    onRouteAdd: function () {
        var routes = this.state.routes;
        routes.add(SeedData.newRoute());
        this.save();
        this.setState({
            activeRoute: routes.length - 1
        });
    },
    onRouteRemove: function () {
        var routes = this.state.routes;
        routes.remove(routes.at(this.state.activeRoute), {silent: true});
        this.save();
        if (routes.length === 0) {
            this.onRouteAdd();
        } else {
            if (this.state.activeRoute > 0) {
                this.setState({
                    activeRoute: this.state.activeRoute - 1
                });
            } else {
                this.setState({
                    activeRoute: 0
                });
            }
        }
    },
    updateRouteWayPoints: function () {
        vent.trigger('map:route:way-points:update');
    },
    load: function () {
        var saved = null,
            routes = null;
            var route = this.props.user['route'];
            if (route == undefined) {
                route = {};
                route['days'] = [];
                var start = '';
                var end = '';
            }
            else {
                var address = route['address'];
                var start_location = address['start_location'];
                var start = start_location['formatted_address'];
                var end_location = address['end_location'];
                var end = end_location['formatted_address'];
                var days = ''
                var first = true
                route['days'].forEach(function (s) {
                    if (first == true) {
                        days = s
                        first = false
                    }
                    else {
                        days = days + ', ' + s
                    }
                });

                routes = new RouteCollection();

                routes = new Routes();
                routes.add(new Route({
                    name: 'Your Route',
                    wayPoints: new WayPoints([
                        {name: start, address: start},
                        {name: end, address: end}
                    ])
                }));

            }
        return routes;
    }
    ,
    save: function () {
        localStorage.setItem('routes', JSON.stringify(this.state.routes.toJSON()));
    }
    ,
    render: function () {
        var mapService = this.props.mapService,
            route = this.state.routes.at(this.state.activeRoute);
        return (

            <div className='route-planner'>
                <Header/>
                <Map mapService={mapService} route={route}/>

                <div className='panel'>
                </div>
            </div>
        );
    }
});

module.exports = MapRoute;