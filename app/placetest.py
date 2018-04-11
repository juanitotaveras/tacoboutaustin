from flask import render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, or_
from main import app
from copy import copy
from models import Place, Restaurant, Hotel, Image, Review, Attraction, Category, Hour, Zipcode, Association, Distance

def test1():
    """restaurants = Restaurant.query.all()
    for restaurant in restaurants:
        print(restaurant.name)
        for hour in restaurant.hours:
            print(hour.day, hour.open_time, hour.close_time)"""
    for zipcode in Zipcode.query.all():
        restaurants = Restaurant.query.filter_by(zipcode = zipcode.value).all()
        hotels = Hotel.query.filter_by(zipcode = zipcode.value).all()
        attractions = Attraction.query.filter_by(zipcode = zipcode.value).all()
        count = Place.query.filter_by(zipcode = zipcode.value).count() 
        print(zipcode.value, count, len(restaurants), len(hotels), len(attractions))
    #places = Place.query.limit(5)
    #query = Place.query.filter_by(id = 4)
    #print(type(query))
    #noImageCount = 0
    """for place in places:
        print(place.id, place.name)
        close_places_id = Distance.query.filter_by(first_place_id = place.id).order_by(Distance.distance.asc()).with_entities(Distance.second_place_id).limit(5)
        close_places = Place.query.filter(Place.id.in_(close_places_id))
        for close_place in close_places:
            print(close_place.id, close_place.name)"""
        #for close in place.close_by_places:
        #    print(close.name, close.type)

    #restaurants = Restaurant.query.all()
    #hotels = Hotel.query.all()
    #attractions = Attraction.query.all()
    #print(noImageCount, len(places), len(restaurants), len(hotels), len(attractions))

    """categories = Category.query.all()
    print(len(categories))
    for category in categories:
        print(category.name, len(category.restaurants))
        #print(category.restaurants)"""

if __name__ == '__main__':
    test1()
