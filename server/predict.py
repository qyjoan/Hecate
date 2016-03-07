



def get_best_times_for_route(route):
    # TODO: this!

    return {
        "route": route.key.urlsafe(),
        "leave_times": ["7:30", "7:40", "7:50", "8:00"],
        "leave_savings": [-10, -10, 0, 10],
        "return_times": ["4:40", "4:50", "5:00", "5:10"],
        "return_savings": [-10, -5, 0, 5]
    }
