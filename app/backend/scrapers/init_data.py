#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/scraper/init_data.py
# --------------------------------------

from helper_methods import *
from hotel_scraper import *
from restaurant_scraper import *
from attraction_scraper import *
from fix_data import *

def init_db():
    db.drop_all()
    db.create_all()
    print("Getting hotels data.")
    scrap_hotels()
    db.session.commit()
    print("Hotels: done. Getting restaurants data.")
    scrap_restaurants()
    db.session.commit()
    print("Restaurants: done. Getting attractions data.")
    scrap_attractions()
    db.session.commit()
    print("Attractions: done. Start fixing data")
    fix_sixth_street()
    fix_zip_code()
    fix_hotels()
    db.session.commit()
    print("everything done.")

if __name__ == '__main__':
    init_db()
