
import json
import logging
import models
import os
import webapp2

from predict import get_best_times_for_route

from google.appengine.ext.webapp import template


class RouteHandler(webapp2.RedirectHandler):
    def post(self):
        body_dict = json.loads(self.request.body)
        route = models.Route(
            home_address=body_dict.get('home_address'),
            work_address=body_dict.get('work_address'),
            mode_of_transport=body_dict.get('mode_of_transport'),
            current_leave_time=body_dict.get('leave_time'),
            current_leave_transit_time=body_dict.get('leave_transit'),
            earliest_leave_time=body_dict.get('earliest_leave'),
            latest_leave_time=body_dict.get('latest_leave'),
            current_return_time=body_dict.get('current_return'),
            current_return_transit_time=body_dict.get('current_return_transit_time'),
            earliest_return_time=body_dict.get('earliest_return'),
            latest_return_time=body_dict.get('latest_return')
        )
        route.put()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(get_best_times_for_route(route)))


class HomeRouteHandler(webapp2.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), "index.html")
        self.response.out.write(template.render(path, {}))


application = webapp2.WSGIApplication([
    ('/route', RouteHandler),
    ('/.*', HomeRouteHandler)
], debug=True)