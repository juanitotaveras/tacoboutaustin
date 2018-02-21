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


@app.route('/api/restaurant/<id>')
def get_restaurant(id):
    restaurant = Restaurant.query.filter_by(id=id).first()
    if (restaurant == None):
        return jsonify({'message': "No such restaurant!"})

    restaurant_data = {}
    restaurant_data['id'] = restaurant.id
    restaurant_data['name'] = restaurant.name
    restaurant_data['image'] = restaurant.image
    restaurant_data['location'] = {'lat': restaurant.latitude, 'long': restaurant.longtitude}
    restaurant_data['rating'] = restaurant.rating
    restaurant_data['address'] = restaurant.address

    return jsonify({'restaurant': restaurant_data})


