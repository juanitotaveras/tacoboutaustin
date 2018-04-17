#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/tests.py
# --------------------------------------

from unittest import main, TestCase
import requests
from flask_json_multidict import MultiDict
from tacoapi import close_places, isOpen, getSearchQuery, getFilterQuery, getSortAndPageQuery
from models import Hotel, Restaurant, Attraction, Place, Hour, Distance
from main import app

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
        restaurant_1 = Restaurant.query.filter_by(restaurant_id = 1).first()
        places_data = close_places(restaurant_1, "hotel", 1)
        self.assertEqual(len(places_data), 1)

    def test_close_by_2(self):
        restaurant_1 = Restaurant.query.filter_by(restaurant_id = 1).first()
        places_data = close_places(restaurant_1, "hotel", 0)
        self.assertEqual(len(places_data), 0)

    def test_close_by_3(self):
        restaurant_1 = Restaurant.query.filter_by(restaurant_id = 1).first()
        places_data = close_places(restaurant_1, "attraction", 5)
        self.assertEqual(len(places_data), 5)

    def test_close_by_4(self):
        hotel_1 = Hotel.query.filter_by(hotel_id = 1).first()
        places_data = close_places(hotel_1, "restaurant", 1)
        self.assertEqual(len(places_data), 1)

    def test_close_by_5(self):
        hotel_1 = Hotel.query.filter_by(hotel_id = 1).first()
        places_data = close_places(hotel_1, "restaurant", 0)
        self.assertEqual(len(places_data), 0)

    def test_close_by_6(self):
        hotel_1 = Hotel.query.filter_by(hotel_id = 10).first()
        places_data = close_places(hotel_1, "attraction", 10)
        self.assertEqual(len(places_data), 10)

    def test_close_by_7(self):
        attraction_1 = Attraction.query.filter_by(attraction_id = 1).first()
        places_data = close_places(attraction_1, "restaurant", 1)
        self.assertEqual(len(places_data), 1)

    def test_close_by_8(self):
        attraction_1 = Attraction.query.filter_by(attraction_id = 1).first()
        places_data = close_places(attraction_1, "restaurant", 0)
        self.assertEqual(len(places_data), 0)

    def test_close_by_9(self):
        attraction_1 = Attraction.query.filter_by(attraction_id = 10).first()
        places_data = close_places(attraction_1, "hotel", 10)
        self.assertEqual(len(places_data), 10)

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

    def test_search_query_1(self):
        args = MultiDict([('search', 'taco')])
        query = getSearchQuery(args, Restaurant)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Restaurant))
            self.assertTrue("taco" in place.name.lower() or "taco" in str(place.zipcode))
    
    def test_search_query_2(self):
        args = MultiDict([('search', 'taco,78701'), ('search_type', 'and')])
        query = getSearchQuery(args, Restaurant)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Restaurant))
            name_check = "taco" in place.name.lower() or "78701" in place.name.lower()
            zipcode_check = "taco" in str(place.zipcode) or "78701" in str(place.zipcode)
            self.assertTrue( name_check and zipcode_check)

    def test_search_query_3(self):
        args = MultiDict([('search', 'Austin')])
        query = getSearchQuery(args, Hotel)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Hotel))
            self.assertTrue("austin" in place.name.lower() or "austin" in str(place.zipcode))
    
    def test_search_query_4(self):
        args = MultiDict([('search', 'austin,78701'), ('search_type', 'and')])
        query = getSearchQuery(args, Hotel)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Hotel))
            name_check = "austin" in place.name.lower() or "78701" in place.name.lower()
            zipcode_check = "austin" in str(place.zipcode) or "78701" in str(place.zipcode)
            self.assertTrue( name_check and zipcode_check)
    
    def test_search_query_5(self):
        args = MultiDict([('search', 'Austin')])
        query = getSearchQuery(args,Attraction)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Attraction))
            self.assertTrue("austin" in place.name.lower() or "austin" in str(place.zipcode))
    
    def test_search_query_6(self):
        args = MultiDict([('search', 'austin,78701'), ('search_type', 'and')])
        query = getSearchQuery(args, Attraction)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Attraction))
            name_check = "austin" in place.name.lower() or "78701" in place.name.lower()
            zipcode_check = "austin" in str(place.zipcode) or "78701" in str(place.zipcode)
            self.assertTrue( name_check and zipcode_check)
    
    def test_filter_query_1(self):
        args = MultiDict([('zipcode', '78701')])
        query = getFilterQuery(Hotel.query, args, Hotel)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Hotel))
            self.assertEqual(place.zipcode, 78701)

    def test_filter_query_2(self):
        args = MultiDict([('zipcode', '78701')])
        query = getFilterQuery(Restaurant.query, args, Restaurant)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Restaurant))
            self.assertEqual(place.zipcode, 78701)
    
    def test_zipcode_filter_query_1(self):
        args = MultiDict([('zipcode', '78701')])
        query = getFilterQuery(Attraction.query, args, Attraction)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Attraction))
            self.assertEqual(place.zipcode, 78701)
    def test_zipcode_filter_query_2(self):
        args = MultiDict([('zipcode', '78701')])
        query = getFilterQuery(Hotel.query, args, Hotel)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Hotel))
            self.assertEqual(place.zipcode, 78701)

    def test_categories_filter_query_1(self):
        args = MultiDict([('categories', 'cocktailbars')])
        query = getFilterQuery(Restaurant.query, args, Restaurant)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Restaurant))
            haveCategories = False
            for assoc in place.categories:
                haveCategories = haveCategories or assoc.category_id == "cocktailbars"
            self.assertTrue(haveCategories)

    def test_categories_filter_query_2(self):
        args = MultiDict([('categories', 'japanese,cocktailbars')])
        query = getFilterQuery(Restaurant.query, args, Restaurant)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Restaurant))
            haveCategories = False
            for assoc in place.categories:
                haveCategories = haveCategories or assoc.category_id == "japanese" or assoc.category_id == "cocktailbars"
            self.assertTrue(haveCategories)

    def test_categories_filter_query_3(self):
        args = MultiDict([('categories', 'musicvenues')])
        query = getFilterQuery(Hotel.query, args, Hotel)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Hotel))
            haveCategories = False
            for assoc in place.categories:
                haveCategories = haveCategories or assoc.category_id == "musicvenues"
            self.assertTrue(haveCategories)

    def test_categories_filter_query_4(self):
        args = MultiDict([('categories', 'musicvenues,divebars')])
        query = getFilterQuery(Hotel.query, args, Hotel)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Hotel))
            haveCategories = False
            for assoc in place.categories:
                haveCategories = haveCategories or assoc.category_id == "musicvenues" or assoc.category_id == "divebars"
            self.assertTrue(haveCategories)
    def test_categories_filter_query_5(self):
        args = MultiDict([('categories', 'hiking')])
        query = getFilterQuery(Attraction.query, args, Attraction)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Attraction))
            haveCategories = False
            for assoc in place.categories:
                haveCategories = haveCategories or assoc.category_id == "hiking"
            self.assertTrue(haveCategories)

    def test_categories_filter_query_6(self):
        args = MultiDict([('categories', 'hiking,parks')])
        query = getFilterQuery(Attraction.query, args, Attraction)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Attraction))
            haveCategories = False
            for assoc in place.categories:
                haveCategories = haveCategories or assoc.category_id == "hiking" or assoc.category_id == "parks"
            self.assertTrue(haveCategories)

    def test_rating_filter_query_1(self):
        args = MultiDict([('rating', '4')])
        query = getFilterQuery(Hotel.query, args, Hotel)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Hotel))
            self.assertTrue(place.rating >= 4)
    def test_rating_filter_query_2(self):
        args = MultiDict([('rating', '4')])
        query = getFilterQuery(Restaurant.query, args, Restaurant)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Restaurant))
            self.assertTrue(place.rating >= 4)
    def test_rating_filter_query_3(self):
        args = MultiDict([('rating', '4')])
        query = getFilterQuery(Attraction.query, args, Attraction)
        response = query.all()
        for place in response:
            self.assertTrue(isinstance(place, Attraction))
            self.assertTrue(place.rating >= 4)

    def test_paging_query_1(self):
        args = MultiDict([('page', '1')])
        query = getSortAndPageQuery(Attraction.query, args, Attraction)
        response = query.all()
        self.assertTrue(len(response) <= 12)
        for place in response:
            self.assertTrue(isinstance(place, Attraction))

    def test_paging_query_2(self):
        args = MultiDict([('page', '1')])
        query = getSortAndPageQuery(Hotel.query, args, Hotel)
        response = query.all()
        self.assertTrue(len(response) <= 12)
        for place in response:
            self.assertTrue(isinstance(place, Hotel))

    def test_paging_query_3(self):
        args = MultiDict([('page', '1')])
        query = getSortAndPageQuery(Restaurant.query, args, Restaurant)
        response = query.all()
        self.assertTrue(len(response) <= 12)
        for place in response:
            self.assertTrue(isinstance(place, Restaurant))

    def test_sorting_query_1(self):
        args = MultiDict([('order_by', 'rating'), ('order', 'asc')])
        query = getSortAndPageQuery(Attraction.query, args, Attraction)
        response = query.all()
        pre_rating = response[0].rating
        for place in response:
            self.assertTrue(isinstance(place, Attraction))
            self.assertTrue(pre_rating <= place.rating)
            pre_rating = place.rating

    def test_sorting_query_2(self):
        args = MultiDict([('order_by', 'name'), ('order', 'desc')])
        query = getSortAndPageQuery(Attraction.query, args, Attraction)
        response = query.all()
        pre_name = response[0].name
        for place in response:
            self.assertTrue(isinstance(place, Attraction))
            self.assertTrue(pre_name >= place.name)
            pre_name = place.name

    def test_sorting_query_3(self):
        args = MultiDict([('order_by', 'rating'), ('order', 'asc')])
        query = getSortAndPageQuery(Hotel.query, args, Hotel)
        response = query.all()
        pre_rating = response[0].rating
        for place in response:
            self.assertTrue(isinstance(place, Hotel))
            self.assertTrue(pre_rating <= place.rating)
            pre_rating = place.rating

    def test_sorting_query_4(self):
        args = MultiDict([('order_by', 'name'), ('order', 'desc')])
        query = getSortAndPageQuery(Hotel.query, args, Hotel)
        response = query.all()
        pre_name = response[0].name
        for place in response:
            self.assertTrue(isinstance(place, Hotel))
            self.assertTrue(pre_name >= place.name)
            pre_name = place.name

    def test_sorting_query_5(self):
        args = MultiDict([('order_by', 'rating'), ('order', 'asc')])
        query = getSortAndPageQuery(Restaurant.query, args, Restaurant)
        response = query.all()
        pre_rating = response[0].rating
        for place in response:
            self.assertTrue(isinstance(place, Restaurant))
            self.assertTrue(pre_rating <= place.rating)
            pre_rating = place.rating

    def test_sorting_query_6(self):
        args = MultiDict([('order_by', 'name'), ('order', 'desc')])
        query = getSortAndPageQuery(Restaurant.query, args, Restaurant)
        response = query.all()
        pre_name = response[0].name
        for place in response:
            self.assertTrue(isinstance(place, Restaurant))
            self.assertTrue(pre_name >= place.name)
            pre_name = place.name

if __name__ == "__main__":
    main()
