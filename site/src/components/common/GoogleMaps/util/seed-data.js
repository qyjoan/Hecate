var Routes = require('../models/routes'),
    Route = require('../models/route'),
    WayPoints = require('../models/way-points'),
    routes,
    route;

routes = new Routes();
routes.add(new Route({
    name: 'Weekend drive',
    wayPoints: new WayPoints([
        {name: 'San Diego Zoo', address: 'San Diego Zoo'},
        {name: 'Half moon bay, CA', address: 'Half moon bay, CA'}
    ])
}));

function newRoute() {
    return new Route({
        name: 'Route name',
        wayPoints: new WayPoints([
            {name: 'Start'},
            {name: 'End'}
        ])
    });
}

module.exports = {
    routes: routes,
    newRoute: newRoute
};




