#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/tacoapi.py
# --------------------------------------

from flask import render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, or_
from main import app
from copy import copy
from models import Restaurant, Hotel, Images, Review, Attraction
import re

dayDict = {"Sunday": 0, "Monday": 1, "Tuesday": 2,
           "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6}

def close_places(place_type, number, zip_code):
    places = None
    if place_type == "restaurant":
        places = Restaurant.query.filter_by(zipcode=zip_code).order_by(
            func.random()).limit(number).all()
    if place_type == "hotel":
        places = Hotel.query.filter_by(zipcode=zip_code).order_by(
            func.random()).limit(number).all()
    if place_type == "attraction":
        places = Attraction.query.filter_by(zipcode=zip_code).order_by(
            func.random()).limit(number).all()
    places_data = []
    if places is not None:
        for place in places:
            place_data = {}
            place_data['id'] = place.id
            place_data['name'] = place.name
            place_data['image'] = place.cover_image
            place_data['rating'] = place.rating
            place_data['address'] = [place.address1, place.address2]
            places_data.append(place_data)
    return places_data

#time is a tuple w/ day, hour, AM/PM
def isOpen(hours, time):
    days = hours.split("<br>")
    day = days[dayDict[time[0]]]
    hour = day.split(": ")
    hourList = hour[1].split(" - ")
    if(hourList[0] == 'closed'):
        return False
    timeComp = time[1].split(":")
    hourComp = list(tok.split(":") for tok in (comp[:-2] for comp in hourList))
    if((int(timeComp[0]) > int(hourComp[0][0]) or (int(timeComp[0]) == int(hourComp[0][0]) and int(timeComp[1]) >= int(hourComp[0][1]))) or time[2] > hourList[0][-2:]):
        if((int(timeComp[0]) < int(hourComp[1][0]) or (int(timeComp[0]) == int(hourComp[1][0]) and int(timeComp[1]) <= int(hourComp[1][1]))) or time[2] < hourList[1][-2:]):
            print(timeComp)
            print(hourComp)
            return True
    return False
    
    
def getQueryCol(model, s):
    if s == 'name':
        return model.name
    if s == 'zipcode':
        return model.zipcode
    if s == 'rating':
        return model.rating
    return None

@app.route('/')
def hello_user():
    return render_template('hello.html')

@app.route('/restaurants')
def get_restaurants():
    search = request.args.get('search', default=None, type=str)
    page = request.args.get('page', default=None, type=int)
    order_by = request.args.get('order_by', default=None, type=str)
    order = request.args.get('order', default=None, type=str)
    search_type = request.args.get('search_type', default=None, type=str)
    filter_by = request.args.get('filter_by', default=None, type=str)
    rating = request.args.get('rating', default=None, type=str)
    time = request.args.get('time', default=None, type=str)
    zipcode = request.args.get('zipcode', default=None, type=str)
    category = request.args.get('category', default=None, type=str)

    if(search_type == 'or'):
        query = Restaurant.query.filter_by(id=-1)
    else:
        query = Restaurant.query
    if search is not None:
        searchTokens = search.split(',')
        for token in searchTokens:
            if(search_type == 'or'):
                query = Restaurant.query.filter(or_(or_(Restaurant.zipcode.like(token), Restaurant.name.like("%"+token+"%"), Restaurant.id.in_(restaurant.id for restaurant in query.all()))))
            else:
                query = query.filter(or_(Restaurant.zipcode.like(token), Restaurant.name.like("%"+token+"%")))
    if filter_by is not None:
        filterTokens = filter_by.split(",")
        for token in filterTokens:
            if token == 'rating' and rating is not None:
                query = query.filter(Restaurant.rating >= float(rating))
            if token == 'open_hour' and time is not None:
                restaraunts = query.all()
                open_restaurants = []
                for restaurant in restaraunts:
                    timeList = time.split(",")
                    if isOpen(restaurant.open_hour, timeList):
                        open_restaurants.append(restaurant)
                query = query.filter(Restaurant.id.in_((rest.id for rest in open_restaurants)))
            if token == 'zipcode' and zipcode is not None:
                query = query.filter_by(zipcode=zipcode)
            if token == category and category is not None:
                pass
    if order_by is None:
        order_by = 'name'
    if order is not None:
        if order == 'asc':
            query = query.order_by(getQueryCol(Restaurant, order_by).asc())
        else:
            query = query.order_by(getQueryCol(Restaurant, order_by).desc())
    if page is not None:
        query = query.limit(12).offset(12*(page-1))
    restaurants = query.all()

    output = []
    for restaurant in restaurants:
        restaurant_data = {}
        restaurant_data['id'] = restaurant.id
        restaurant_data['name'] = restaurant.name
        restaurant_data['image'] = restaurant.cover_image
        restaurant_data['rating'] = restaurant.rating
        restaurant_data['address'] = [restaurant.address1, restaurant.address2]
        restaurant_data['categories'] = []
        restaurant_data['zip_code'] = restaurant.zipcode
        for association in restaurant.categories:
            category_data = {}
            category_data['id'] = association.category.id
            category_data['name'] = association.category.name
            restaurant_data['categories'].append(category_data)
        output.append(restaurant_data)
    return jsonify({'status': "OK", 'list': output, 'total': len(restaurants)})


@app.route('/restaurants/<id>')
def get_restaurant(id):
    restaurant = Restaurant.query.filter_by(id=id).first()
    if (restaurant == None):
        response = jsonify({'status': "INVALID_ID"})
        response.status_code = 404
        return response

    restaurant_data = {}
    restaurant_data['id'] = restaurant.id
    restaurant_data['name'] = restaurant.name
    restaurant_data['images'] = [restaurant.images.image1,
                                 restaurant.images.image2, restaurant.images.image3]
    restaurant_data['phone'] = restaurant.phone
    restaurant_data['hours'] = restaurant.open_hour
    restaurant_data['location'] = {
        'lat': restaurant.latitude, 'long': restaurant.longtitude}
    restaurant_data['address'] = [restaurant.address1, restaurant.address2]
    restaurant_data['rating'] = restaurant.rating
    restaurant_data['reviews'] = [{'text': restaurant.reviews[0].text, 'link': restaurant.reviews[0].link}, {
        'text': restaurant.reviews[1].text, 'link': restaurant.reviews[1].link}, {
        'text': restaurant.reviews[2].text, 'link': restaurant.reviews[2].link}]
        
    restaurant_data['categories'] = []
    for association in restaurant.categories:
        category_data = {}
        category_data['id'] = association.category.id
        category_data['name'] = association.category.name
        restaurant_data['categories'].append(category_data)

    hotels = close_places("hotel", 2, restaurant.zipcode)
    attractions = close_places("attraction", 2, restaurant.zipcode)

    return jsonify({'status': "OK", 'restaurant': restaurant_data, 'close_by_hotels': hotels, 'close_by_attractions': attractions})


@app.route('/hotels')
def get_hotels():
    search = request.args.get('search', default=None, type=str)
    page = request.args.get('page', default=None, type=int)
    order_by = request.args.get('order_by', default=None, type=str)
    order = request.args.get('order', default=None, type=str)
    search_type = request.args.get('search_type', default=None, type=str)
    filter_by = request.args.get('filter_by', default=None, type=str)
    rating = request.args.get('rating', default=None, type=str)
    zipcode = request.args.get('zipcode', default=None, type=str)
    category = request.args.get('category', default=None, type=str)

    if(search_type == 'or'):
        query = Hotel.query.filter_by(id=-1)
    else:
        query = Hotel.query
    if search is not None:
        searchTokens = search.split(',')
        for token in searchTokens:
            if(search_type == 'or'):
                query = Hotel.query.filter(or_(or_(Hotel.zipcode.like(token), Hotel.name.like("%"+token+"%"), Hotel.id.in_(hotel.id for hotel in query.all()))))
            else:
                query = query.filter(or_(Hotel.zipcode.like(token), Hotel.name.like("%"+token+"%")))
    if filter_by is not None:
        filterTokens = filter_by.split(",")
        for token in filterTokens:
            if token == 'rating' and rating is not None:
                query = query.filter(Hotel.rating >= float(rating))
            if token == 'zipcode' and zipcode is not None:
                query = query.filter_by(zipcode=zipcode)
            if token == category and category is not None:
                pass
    if order_by is None:
        order_by = 'name'
    if order is not None:
        if order == 'asc':
            query = query.order_by(getQueryCol(Hotel, order_by).asc())
        else:
            query = query.order_by(getQueryCol(Hotel, order_by).desc())
    if page is not None:
        query = query.limit(12).offset(12*(page-1))
    hotels = query.all()
    output = []
    for hotel in hotels:
        hotel_data = {}
        hotel_data['id'] = hotel.id
        hotel_data['name'] = hotel.name
        hotel_data['image'] = hotel.cover_image
        hotel_data['rating'] = hotel.rating
        hotel_data['address'] = [hotel.address1, hotel.address2]
        hotel_data['zip_code'] = hotel.zipcode
        output.append(hotel_data)
    return jsonify({'status': "OK", 'list': output, 'total': len(hotels)})


@app.route('/hotels/<id>')
def get_hotel(id):
    hotel = Hotel.query.filter_by(id=id).first()
    if (hotel == None):
        response = jsonify({'status': "INVALID_ID"})
        response.status_code = 404
        return response

    hotel_data = {}
    hotel_data['id'] = hotel.id
    hotel_data['name'] = hotel.name
    hotel_data['images'] = [hotel.images.image1, hotel.images.image2, hotel.images.image3]
    hotel_data['phone'] = hotel.phone
    hotel_data['location'] = {'lat': hotel.latitude, 'long': hotel.longtitude}
    hotel_data['rating'] = hotel.rating
    hotel_data['address'] = [hotel.address1, hotel.address2]
    hotel_data['reviews'] = [{'text': hotel.reviews[0].text, 'link': hotel.reviews[0].link}, {
        'text': hotel.reviews[1].text, 'link': hotel.reviews[1].link}, {
        'text': hotel.reviews[2].text, 'link': hotel.reviews[2].link}]

    restaurants = close_places("restaurant", 2, hotel.zipcode)
    attractions = close_places("attraction", 2, hotel.zipcode)

    return jsonify({'status': "OK", 'hotel': hotel_data, 'close_by_restaurants': restaurants, 'close_by_attractions': attractions})


@app.route('/attractions')
def get_attractions():
    search = request.args.get('search', default=None, type=str)
    page = request.args.get('page', default=None, type=int)
    order_by = request.args.get('order_by', default=None, type=str)
    order = request.args.get('order', default=None, type=str)
    search_type = request.args.get('search_type', default=None, type=str)
    filter_by = request.args.get('filter_by', default=None, type=str)
    rating = request.args.get('rating', default=None, type=str)
    zipcode = request.args.get('zipcode', default=None, type=str)
    category = request.args.get('category', default=None, type=str)

    if(search_type == 'or'):
        query = Attraction.query.filter_by(id=-1)
    else:
        query = Attraction.query
    if search is not None:
        searchTokens = search.split(',')
        for token in searchTokens:
            if(search_type == 'or'):
                query = Attraction.query.filter(or_(or_(Attraction.zipcode.like(token), Attraction.name.like("%"+token+"%"), Attraction.id.in_(attraction.id for attraction in query.all()))))
            else:
                query = query.filter(or_(Attraction.zipcode.like(token), Attraction.name.like("%"+token+"%")))
    if filter_by is not None:
        filterTokens = filter_by.split(",")
        for token in filterTokens:
            if token == 'rating' and rating is not None:
                query = query.filter(Restaurant.rating >= float(rating))
            if token == 'zipcode' and zipcode is not None:
                query = query.filter_by(zipcode=zipcode)
            if token == category and category is not None:
                pass
    if order_by is None:
        order_by = 'name'
    if order is not None:
        if order == 'asc':
            query = query.order_by(getQueryCol(Attraction, order_by).asc())
        else:
            query = query.order_by(getQueryCol(Attraction, order_by).desc())
    if page is not None:
        query = query.limit(12).offset(12*(page-1))
    attractions = query.all()
    output = []
    for attraction in attractions:
        attraction_data = {}
        attraction_data['id'] = attraction.id
        attraction_data['name'] = attraction.name
        attraction_data['image'] = attraction.cover_image
        attraction_data['rating'] = attraction.rating
        attraction_data['address'] = [attraction.address1, attraction.address2]
        attraction_data['zip_code'] = attraction.zipcode
        output.append(attraction_data)
    return jsonify({'status': "OK", 'list': output, 'total': len(attractions)})


@app.route('/attractions/<id>')
def get_attraction(id):
    attraction = Attraction.query.filter_by(id=id).first()
    if (attraction == None):
        response = jsonify({'status': "INVALID_ID"})
        response.status_code = 404
        return response

    attraction_data = {}
    attraction_data['id'] = attraction.id
    attraction_data['name'] = attraction.name
    attraction_data['images'] = [attraction.images.image1,
                                 attraction.images.image2, attraction.images.image3]
    attraction_data['phone'] = attraction.phone
    attraction_data['location'] = {
        'lat': attraction.latitude, 'long': attraction.longtitude}
    attraction_data['rating'] = attraction.rating
    attraction_data['address'] = [attraction.address1, attraction.address2]
    attraction_data['reviews'] = [{'text': attraction.reviews[0].text, 'link': attraction.reviews[0].link}, {
        'text': attraction.reviews[1].text, 'link': attraction.reviews[1].link}, {
        'text': attraction.reviews[2].text, 'link': attraction.reviews[2].link}]

    restaurants = close_places("restaurant", 2, attraction.zipcode)
    hotels = close_places("hotel", 2, attraction.zipcode)

    return jsonify({'status': "OK", 'attraction': attraction_data, 'close_by_restaurants': restaurants, 'close_by_hotels': hotels})
