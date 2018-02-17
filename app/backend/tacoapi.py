from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from routes import app
from models import *


@app.route('/api')
def hello_user():
    return 'hello world'

@app.route('/api/restaurants')
def get_restaurants():
    restaurants = Restaurant.query.all()
    output = []
    for restaurant in restaurants:
        restaurant_data = {}
        restaurant_data['id'] = restaurant.id
        restaurant_data['name'] = restaurant.name
        restaurant_data['image'] = restaurant.image
        restaurant_data['location'] = {'lat': restaurant.latitude, 'long': restaurant.longtitude}
        restaurant_data['rating'] = restaurant.rating
        restaurant_data['address'] = restaurant.address
        output.append(restaurant_data)
    return jsonify({'list': output})

"""
@app.route('api/restaurant/<anid>', method = ['GET'])
def get_restaurant(anid):
    return 'hello {anid}'
"""

