from flask import render_template, jsonify
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
        restaurant_data['rating'] = restaurant.rating
        restaurant_data['address'] = restaurant.address
        output.append(restaurant_data)
    return jsonify({'list': output})


@app.route('/api/restaurants/<id>')
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
    restaurant_data['reviewText1'] = restaurant.reviewText1
    restaurant_data['reviewLink1'] = restaurant.reviewLink1

    return jsonify({'restaurant': restaurant_data})


@app.route('/api/hotels')
def get_hotels():
    hotels = Hotel.query.all()
    output = []
    for hotel in hotels:
        hotel_data = {}
        hotel_data['id'] = hotel.id
        hotel_data['name'] = hotel.name
        hotel_data['image'] = hotel.image
        hotel_data['rating'] = hotel.rating
        hotel_data['address'] = hotel.address
        output.append(hotel_data)
    return jsonify({'list': output})


@app.route('/api/hotels/<id>')
def get_hotel(id):
    hotel = Hotel.query.filter_by(id=id).first()
    if (hotel == None):
        return jsonify({'message': "No such hotel!"})

    hotel_data = {}
    hotel_data['id'] = hotel.id
    hotel_data['name'] = hotel.name
    hotel_data['image'] = hotel.image
    hotel_data['location'] = {'lat': hotel.latitude, 'long': hotel.longtitude}
    hotel_data['rating'] = hotel.rating
    hotel_data['address'] = hotel.address
    hotel_data['reviewText1'] = hotel.reviewText1
    hotel_data['reviewLink1'] = hotel.reviewLink1

    return jsonify({'hotel': hotel_data})

@app.route('/api/attractions')
def get_attractions():
    attractions = Attraction.query.all()
    output = []
    for attraction in attractions:
        attraction_data = {}
        attraction_data['id'] = attraction.id
        attraction_data['name'] = attraction.name
        attraction_data['image'] = attraction.image
        attraction_data['rating'] = attraction.rating
        attraction_data['address'] = attraction.address
        output.append(attraction_data)
    return jsonify({'list': output})


@app.route('/api/attractions/<id>')
def get_attraction(id):
    attraction = Attraction.query.filter_by(id=id).first()
    if (attraction == None):
        return jsonify({'message': "No such attraction!"})

    attraction_data = {}
    attraction_data['id'] = attraction.id
    attraction_data['name'] = attraction.name
    attraction_data['image'] = attraction.image
    attraction_data['location'] = {'lat': attraction.latitude, 'long': attraction.longtitude}
    attraction_data['rating'] = attraction.rating
    attraction_data['address'] = attraction.address
    attraction_data['reviewText1'] = attraction.reviewText1
    attraction_data['reviewLink1'] = attraction.reviewLink1

    return jsonify({'hotel': attraction_data})
