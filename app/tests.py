#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/tests.py
# --------------------------------------

from unittest import main, TestCase
import requests
from tacoapi import close_places, isOpen
from models import Hotel, Restaurant, Attraction, Place, Hour

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
        restaurant_1 = Restaurant.query.filter_by(id = 1).first()
        places_data = close_places(restaurant_1, "hotel", 2)
        self.assertEqual(len(places_data), 2)
        for place in places_data:
            self.assertTrue(place, Hotel)

    def test_close_by_2(self):
        restaurant_1 = Restaurant.query.filter_by(id = 1).first()
        places_data = close_places(restaurant_1, "attraction", 2)
        self.assertEqual(len(places_data), 2)
        for place in places_data:
            self.assertTrue(place, Attraction)

    def test_close_by_3(self):
        restaurant_1 = Restaurant.query.filter_by(id = 1).first()
        places_data = close_places(restaurant_1, "restaurant", 2)
        self.assertEqual(len(places_data), 2)
        for place in places_data:
            self.assertTrue(place, Restaurant)


    def test_close_by_4(self):
        restaurant_1 = Restaurant.query.filter_by(id = 10).first()
        places_data = close_places(restaurant_1, "restaurant", 10)
        self.assertEqual(len(places_data), 10)
        for place in places_data:
            self.assertTrue(place, Restaurant)


    def test_close_by_5(self):
        restaurant_1 = Restaurant.query.filter_by(id = 10).first()
        places_data = close_places(restaurant_1, "restaurant", 0)
        self.assertEqual(len(places_data), 0)

    def test_is_open_1(self):
        restaurant_1 = Restaurant.query.filter_by(id = 1).first()
        open_now = isOpen(restaurant_1.hours, ("Monday", "14:00"))
        self.assertEqual(open_now, True)

    def test_is_open_2(self):
        restaurant_1 = Restaurant.query.filter_by(id = 1).first()
        open_now = isOpen(restaurant_1.hours, ("Wednesday", "11:00"))
        self.assertEqual(open_now, True)

    def test_is_open_3(self):
        restaurant_1 = Restaurant.query.filter_by(id = 1).first()
        open_now = isOpen(restaurant_1.hours, ("Wednesday", "1:00"))
        self.assertEqual(open_now, False)

    def test_is_open_4(self):
        restaurant_1 = Restaurant.query.filter_by(id = 41).first()
        open_now = isOpen(restaurant_1.hours, ("Thursday", "1:00"))
        self.assertEqual(open_now, True)

    def test_is_open_5(self):
        restaurant_1 = Restaurant.query.filter_by(id = 41).first()
        open_now = isOpen(restaurant_1.hours, ("Thursday", "3:00"))
        self.assertEqual(open_now, False)


if __name__ == "__main__":
    main()
