#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/scraper/init_data.py
# --------------------------------------

from hotel_scraper import scrap_hotels
from restaurant_scraper import scrap_restaurants
from attraction_scraper import scrap_attractions
from fix_data import fix_all
from helper_methods import db

def init_db():
    db.drop_all()
    db.create_all()
    scrap_restaurants()
    scrap_hotels()
    scrap_attractions()
    fix_all()
    print("everything done.")

if __name__ == '__main__':
    init_db()
