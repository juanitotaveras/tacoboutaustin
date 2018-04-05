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

    def test_is_open_1(self):
        hour = "Sunday: 11:00AM - 10:00PM<br>Monday: 11:00AM - 10:00PM<br>Tuesday: 11:00AM - 10:00PM<br>Wednesday: 11:00AM - 10:00PM<br>Thursday: 11:00AM - 11:00PM<br>Friday: 11:00AM - 11:00PM<br>Saturday: 11:00AM - 10:00PM<br>"
        open_now = isOpen(hour, ("Monday", "2:00", "PM"))
        self.assertEqual(open_now, True)

    def test_is_open_2(self):
        hour = "Sunday: 11:00AM - 10:00PM<br>Monday: 11:00AM - 10:00PM<br>Tuesday: 11:00AM - 10:00PM<br>Wednesday: 11:00AM - 10:00PM<br>Thursday: 11:00AM - 11:00PM<br>Friday: 11:00AM - 11:00PM<br>Saturday: 11:00AM - 10:00PM<br>"
        open_now = isOpen(hour, ("Wednesday", "11:00", "AM"))
        self.assertEqual(open_now, True)

    def test_is_open_3(self):
        hour = "Sunday: 11:00AM - 10:00PM<br>Monday: 11:00AM - 10:00PM<br>Tuesday: 11:00AM - 10:00PM<br>Wednesday: 11:00AM - 10:00PM<br>Thursday: 11:00AM - 11:00PM<br>Friday: 11:00AM - 11:00PM<br>Saturday: 11:00AM - 10:00PM<br>"
        open_now = isOpen(hour, ("Wednesday", "11:00", "PM"))
        self.assertEqual(open_now, False)

    def test_is_open_4(self):
        hour = "Sunday: 11:00AM - 10:00PM<br>Monday: 11:00AM - 10:00PM<br>Tuesday: 11:00AM - 10:00PM<br>Wednesday: 11:00AM - 10:00PM<br>Thursday: 11:00AM - 11:00PM<br>Friday: 11:00AM - 11:00PM<br>Saturday: 11:00AM - 10:00PM<br>"
        open_now = isOpen(hour, ("Wednesday", "11:00", "PM"))
        self.assertEqual(open_now, False)

    def test_is_open_5(self):
        hour = "Sunday: closed<br>Monday: 11:00AM - 10:00PM<br>Tuesday: 11:00AM - 10:00PM<br>Wednesday: 11:00AM - 10:00PM<br>Thursday: 11:00AM - 11:00PM<br>Friday: 11:00AM - 11:00PM<br>Saturday: 11:00AM - 10:00PM<br>"
        open_now = isOpen(hour, ("Sunday", "2:00", "PM"))
        self.assertEqual(open_now, False)


if __name__ == "__main__":
    main()
