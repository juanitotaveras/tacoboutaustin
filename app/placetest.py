from flask import render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, or_
from main import app
from copy import copy
from models import Place, Restaurant, Hotel, Image, Review, Attraction, Category, Hour, Zipcode, Association

def test1():
    """restaurants = Restaurant.query.all()
    for restaurant in restaurants:
        print(restaurant.name)
        for hour in restaurant.hours:
            print(hour.day, hour.open_time, hour.close_time)"""
    """for zipcode in Zipcode.query.all():
        restaurants = Restaurant.query.filter_by(zipcode = zipcode.value).all()
        hotels = Hotel.query.filter_by(zipcode = zipcode.value).all()
        attractions = Attraction.query.filter_by(zipcode = zipcode.value).all()
        print(zipcode.value, len(restaurants), len(hotels), len(attractions))"""
    places = Place.query.all()
    query = Place.query.filter_by(id = 4)
    print(type(query))
    noImageCount = 0
    for place in places:
        if len(place.images) == 0:
            print(place.name, place.type)
            noImageCount+=1

    restaurants = Restaurant.query.all()
    hotels = Hotel.query.all()
    attractions = Attraction.query.all()
    print(noImageCount, len(places), len(restaurants), len(hotels), len(attractions))

    """categories = Category.query.all()
    print(len(categories))
    for category in categories:
        print(category.name, len(category.restaurants))
        #print(category.restaurants)"""

if __name__ == '__main__':
    test1()
