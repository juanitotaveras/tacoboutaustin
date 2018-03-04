from flask import render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from routes import app
from models import *


def close_places(place_type, number, zip_code):
    places = None
    if place_type == "restaurant":
        places = Restaurant.query.filter_by(zipcode = zip_code).order_by(func.random()).limit(number).all()
    if place_type == "hotel":
        places = Hotel.query.filter_by(zipcode = zip_code).order_by(func.random()).limit(number).all()
    if place_type == "attraction":
        places = Attraction.query.filter_by(zipcode = zip_code).order_by(func.random()).limit(number).all() 
    places_data = []
    if places is not None:
        for place in places:
            place_data = {}
            place_data['id'] = place.id
            place_data['name'] = place.name
            place_data['images'] = [place.image1, place.image2, place.image3]
            place_data['rating'] = place.rating
            place_data['address'] = [place.address1, place.address2]
            places_data.append(place_data)
    return places_data


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
        restaurant_data['images'] = [restaurant.image1, restaurant.image2, restaurant.image3]
        restaurant_data['rating'] = restaurant.rating
        restaurant_data['address'] = [restaurant.address1, restaurant.address2]
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
    restaurant_data['images'] = [restaurant.image1, restaurant.image2, restaurant.image3]
    restaurant_data['phone'] = restaurant.phone
    restaurant_data['hours'] = restaurant.open_hour
    restaurant_data['location'] = {'lat': restaurant.latitude, 'long': restaurant.longtitude}
    restaurant_data['address'] = [restaurant.address1, restaurant.address2]
    restaurant_data['rating'] = restaurant.rating
    restaurant_data['reviews'] = [{'text': restaurant.reviewText1, 'link': restaurant.reviewLink1}, {
        'text': restaurant.reviewText2, 'link': restaurant.reviewLink2}, {
        'text': restaurant.reviewText3, 'link': restaurant.reviewLink3}]

    hotels = close_places("hotel", 2, restaurant.zipcode)
    restaurant_data['close_by_hotels'] = hotels
    attractions = close_places("attraction", 2, restaurant.zipcode)
    restaurant_data['close_by_attractions'] = attractions

    return jsonify({'restaurant': restaurant_data})


@app.route('/api/hotels')
def get_hotels():
    hotels = Hotel.query.all()
    output = []
    for hotel in hotels:
        hotel_data = {}
        hotel_data['id'] = hotel.id
        hotel_data['name'] = hotel.name
        hotel_data['image1'] = hotel.image1
        hotel_data['rating'] = hotel.rating
        hotel_data['address'] = [hotel.address1, hotel.address2]
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
    hotel_data['images'] = [hotel.image1, hotel.image2, hotel.image3]
    hotel_data['phone'] = hotel.phone
    hotel_data['location'] = {'lat': hotel.latitude, 'long': hotel.longtitude}
    hotel_data['rating'] = hotel.rating
    hotel_data['address'] = [hotel.address1, hotel.address2]
    hotel_data['reviews'] = [{'text': hotel.reviewText1, 'link': hotel.reviewLink1}, {
        'text': hotel.reviewText2, 'link': hotel.reviewLink2}, {
        'text': hotel.reviewText3, 'link': hotel.reviewLink3}]
    
    restaurants = close_places("restaurant", 2, hotel.zipcode)
    hotel_data['close_by_restaurants'] = restaurants
    attractions = close_places("attraction", 2, hotel.zipcode)
    hotel_data['close_by_attractions'] = attractions

    return jsonify({'hotel': hotel_data})

@app.route('/api/attractions')
def get_attractions():
    attractions = Attraction.query.all()
    output = []
    for attraction in attractions:
        attraction_data = {}
        attraction_data['id'] = attraction.id
        attraction_data['name'] = attraction.name
        attraction_data['image1'] = attraction.image1
        attraction_data['rating'] = attraction.rating
        attraction_data['address'] = [attraction.address1, attraction.address2]
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
    attraction_data['image1'] = attraction.image1
    attraction_data['image2'] = attraction.image2
    attraction_data['image3'] = attraction.image3
    attraction_data['phone'] = attraction.phone
    attraction_data['location'] = {'lat': attraction.latitude, 'long': attraction.longtitude}
    attraction_data['rating'] = attraction.rating
    attraction_data['address'] = [attraction.address1, attraction.address2]
    attraction_data['reviews'] = [{'text': attraction.reviewText1, 'link': attraction.reviewLink1}, {
        'text': attraction.reviewText2, 'link': attraction.reviewLink2}, {
        'text': attraction.reviewText3, 'link': attraction.reviewLink3}]

    restaurants = close_places("restaurant", 2, attraction.zipcode)
    attraction_data['close_by_restaurants'] = restaurants
    hotels = close_places("hotel", 2, attraction.zipcode)
    attraction_data['close_by_hotels'] = hotels

    return jsonify({'attraction': attraction_data})
