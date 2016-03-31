import logging
import os

URL = "fill_me_in"
ACCESS_TOKEN = "wouldn't you like to know"


try:
    # settingslocal will be up a directory so we must do some trickery
    import sys
    server_path = os.path.abspath(os.path.dirname(__file__))
    sys.path.insert(0, server_path)
    import settingslocal
except ImportError:
    logging.warning("settingslocal.py not found!")
    settingslocal = None

if settingslocal:
    for setting in dir(settingslocal):
        if setting.upper() == setting:
            globals()[setting.upper()] = getattr(settingslocal, setting)