#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# tests/api_tests/api_tests.py
# --------------------------------------

import sys
import os
from unittest import main, TestCase
import requests
FILE_ABSOLUTE_PATH = os.path.abspath(__file__)  # get absolute filepath
CURRENT_DIR = os.path.dirname(FILE_ABSOLUTE_PATH)  # get directory path of file
PARENT_DIR = os.path.dirname(CURRENT_DIR)  # get parent directory path
BASE_DIR = os.path.dirname(PARENT_DIR)  # get grand parent directory path
sys.path.append(BASE_DIR)
from tacoapi import close_places
from models import Hotel, Restaurant, Attraction

API_URL = "http://api.tacoboutaustin.me/"

class TestApi(TestCase):


    def test_message_restaurant(self):
        response = requests.get(API_URL + "restaurants")
        #print(response.json())
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_hotel(self):
        response = requests.get(API_URL + "hotels")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_attraction(self):
        response = requests.get(API_URL + "attractions")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_restaurant_id_1(self):
        response = requests.get(API_URL + "restaurants/0")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_restaurant_id_2(self):
        response = requests.get(API_URL + "restaurants/201") # invalid id
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_message_hotel_id_1(self):
        response = requests.get(API_URL + "hotels/0")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_hotel_id_2(self):
        response = requests.get(API_URL + "hotels/201")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_message_attraction_id_1(self):
        response = requests.get(API_URL + "attractions/1")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_attraction_id_2(self):
        response = requests.get(API_URL + "attractions/201")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_close_by_1(self):
        places_data = close_places("restaurant", 2, 78704)
        self.assertEqual(len(places_data), 2)
        for place in places_data:
            self.assertTrue(place, Restaurant)
            detail = Restaurant.query.filter_by(id = place['id']).first()
            self.assertEqual(detail.zipcode, 78704)

    def test_close_by_2(self):
        places_data = close_places("restaurant", 2, 79107)
        self.assertEqual(len(places_data), 0)

    def test_close_by_3(self):
        places_data = close_places("hotel", 2, 78704)
        self.assertEqual(len(places_data), 2)
        for place in places_data:
            self.assertTrue(place, Hotel)
            detail = Hotel.query.filter_by(id = place['id']).first()
            self.assertEqual(detail.zipcode, 78704)

    def test_close_by_4(self):
        places_data = close_places("hotel", 2, 79107)
        self.assertEqual(len(places_data), 0)

    def test_close_by_5(self):
        places_data = close_places("attraction", 2, 78704)
        self.assertEqual(len(places_data), 2)
        for place in places_data:
            self.assertTrue(place, Attraction)
            detail = Attraction.query.filter_by(id = place['id']).first()
            self.assertEqual(detail.zipcode, 78704)

    def test_close_by_6(self):
        places_data = close_places("attraction", 2, 79107)
        self.assertEqual(len(places_data), 0)


if __name__ == "__main__":
    main()
