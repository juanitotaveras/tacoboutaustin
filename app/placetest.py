from flask import render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, or_
from main import app
from copy import copy
from models import Place, Restaurant, Hotel, Image, Review, Attraction, Category, Hour, Zipcode

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
        print(zipcode.value, restaurants, hotels, attractions)

if __name__ == '__main__':
    test1()
