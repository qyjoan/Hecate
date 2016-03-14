
import json
import logging
import models
import os
import webapp2
import server_api

from predict import get_best_times_for_route

from google.appengine.ext.webapp import template


class RouteHandler(webapp2.RedirectHandler):
    def post(self):
        body_dict = json.loads(self.request.body)

        # call the backend
        response = server_api.consumeGETRequestSync(body_dict)

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