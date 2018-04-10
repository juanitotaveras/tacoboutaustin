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
from models import Place, Restaurant, Hotel, Image, Review, Attraction, Category, Hour
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
            if place_type == "restaurant":
                place_data['id'] = place.restaurant_id
            if place_type == "hotel":
                place_data['id'] = place.hotel_id
            if place_type == "attraction":
                place_data['id'] = place.attraction_id
            place_data['name'] = place.name
            place_data['image'] = place.cover_image
            place_data['rating'] = place.rating
            place_data['address'] = [place.address1, place.address2]
            place_data['zip_code'] = place.zipcode
            places_data.append(place_data)
    return places_data

#time is a tuple w/ day, hour, AM/PM
def isBetween(open_hour, timeGet):
    open_timeH = open_hour.open_time[:-2]
    open_timeM = open_hour.open_time[-2:]
    close_timeH = open_hour.close_time[:-2]
    close_timeM = open_hour.close_time[-2:]
    if close_timeH == "00":
        close_timeH = "24"
    if open_timeH == "00":
        open_timeH = "24"
    open_time = 60 * int(open_timeH) + int(open_timeM)
    close_time = int(close_timeH)*60 + int(close_timeM)
    if int(close_timeH) < 6:
        close_time += 1440
    print(open_time, close_time, timeGet)
    if timeGet > open_time and timeGet < close_time:
        return True
    return False

def isOpen(hours, time):
    result = False
    day = dayDict[time[0]]
    timeComp = time[1].split(":")
    timeGet = int(timeComp[0])*60 + int(timeComp[1])
    for open_hour in hours:
        print(day, open_hour.day, open_hour.open_time, open_hour.close_time)
        if open_hour.day == day and isBetween(open_hour, timeGet):
            result = True
    return result

def getQueryCol(model, s):
    if s == 'name':
        return model.name
    if s == 'zipcode':
        return model.zipcode
    if s == 'rating':
        return model.rating
    return None

def getModel(type):
    if type == "restaurant":
        return Restaurant
    if type == "hotel":
        return Hotel
    if type == "attraction":
        return Attraction
    return Place

def getIdType(model, type):
    if type == "restaurant":
        return model.restaurant_id
    if type == "hotel":
        return model.hotel_id
    if type == "attraction":
        return model.attraction_id
    return model.id

# type: "restaurant", "hotel", "attraction"
# args = requests.args
def getList(args, type):
    # get optional attributes
    search = args.get('search', default=None, type=str)
    page = args.get('page', default=None, type=int)
    order_by = args.get('order_by', default=None, type=str)
    order = args.get('order', default=None, type=str)
    search_type = args.get('search_type', default=None, type=str)
    rating = args.get('rating', default=None, type=str)
    zipcode = request.args.get('zipcode', default=None, type=str)

    Model = getModel(type)  # get the right model

    # process all the optional attributes
    if(search_type == 'and' or search is None):
        query = Model.query.filter_by(type = type)
    else:
        query = Model.query.filter_by(type = type).filter_by(id=-1)
    if search is not None:
        searchTokens = search.split(',')
        for token in searchTokens:
            if(search_type == 'and'):
                query = query.filter(or_(Model.zipcode.like(token), Model.name.like("%"+token+"%")))
            else:
                query = Model.query.filter(or_(or_(Model.zipcode.like(token), Model.name.like("%"+token+"%"), Model.id.in_(place.id for place in query.all()))))
    if rating is not None:
        query = query.filter(Model.rating >= float(rating))
    if type == "restaurant":  # special case with restaurant, because restaurant have open hour and categories
        time = request.args.get('time', default=None, type=str)
        categories = request.args.get('categories', default=None, type=str)
        if time is not None:
            restaraunts = query.all()
            open_restaurants = []
            for restaurant in restaraunts:
                timeList = time.split(",")
                if isOpen(restaurant.hours, timeList):
                    open_restaurants.append(restaurant)
            query = query.filter(Restaurant.id.in_((rest.id for rest in open_restaurants)))
        if categories is not None:
            categoriesTokens = categories.split(',')
            for token in categoriesTokens:
                query = query.filter(Restaurant.categories.any(category_id = token))

    if zipcode is not None:
        query = query.filter_by(zipcode=zipcode)
    if order_by is None:
        order_by = 'name'
    if order is not None:
        if order == 'asc':
            query = query.order_by(getQueryCol(Model, order_by).asc())
        else:
            query = query.order_by(getQueryCol(Model, order_by).desc())
    if page is not None:
        query = query.limit(12).offset(12*(page-1))

    # get the output of the request (a list of places with type provided)
    places = query.all()
    output = []
    for place in places:
        place_data = {}
        id = getIdType(place, type)
        place_data['id'] = id
        place_data['name'] = place.name
        place_data['image'] = place.cover_image
        place_data['rating'] = place.rating
        place_data['address'] = [place.address1, place.address2]
        place_data['zip_code'] = place.zipcode
        if type == "restaurant":
            place_data['categories'] = []
            for association in place.categories:
                category_data = {}
                category_data['id'] = association.category.id
                category_data['name'] = association.category.name
                place_data['categories'].append(category_data)
        if type == "restaurant":
            dayStr = request.args.get('day', default=None, type=str)
            if dayStr is not None:
                day = dayDict[dayStr]
                hours = Hour.query.filter_by(restaurant_id = id).filter_by(day = day)
                hours_data = []
                for hour in hours:
                    hour_data = {}
                    hour_data['day'] = hour.day
                    hour_data['open_time'] = hour.open_time
                    hour_data['close_time'] = hour.close_time
                    hours_data += [hour_data]
                place_data['hours'] = hours_data
            
        output.append(place_data)
    return output

@app.route('/')
def hello_user():
    return render_template('hello.html')


@app.route('/restaurants')
def get_restaurants():
    output = getList(request.args, "restaurant")
    return jsonify({'status': "OK", 'list': output, 'total': len(output)})


@app.route('/restaurants/<id>')
def get_restaurant(id):
    restaurant = Restaurant.query.filter_by(restaurant_id=id).first()
    if (restaurant == None):
        response = jsonify({'status': "INVALID_ID"})
        response.status_code = 404
        return response

    restaurant_data = {}
    restaurant_data['id'] = restaurant.restaurant_id
    restaurant_data['name'] = restaurant.name
    restaurant_data['phone'] = restaurant.phone 
    restaurant_data['location'] = {
        'lat': restaurant.latitude, 'long': restaurant.longtitude}
    restaurant_data['address'] = [restaurant.address1, restaurant.address2]
    restaurant_data['rating'] = restaurant.rating
    restaurant_data['reviews'] = [{'text': restaurant.reviews[0].text, 'link': restaurant.reviews[0].link}, {
        'text': restaurant.reviews[1].text, 'link': restaurant.reviews[1].link}, {
        'text': restaurant.reviews[2].text, 'link': restaurant.reviews[2].link}]

    image_data = []
    for image in restaurant.images:
        image_data += [image.image_url]
    restaurant_data['images'] = image_data

    hours_data = []
    for hour in restaurant.hours:
        hour_data = {}
        hour_data['day'] = hour.day
        hour_data['open_time'] = hour.open_time
        hour_data['close_time'] = hour.close_time
        hours_data += [hour_data]
    restaurant_data['hours'] = hours_data
 
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
    output = getList(request.args, "hotel")
    return jsonify({'status': "OK", 'list': output, 'total': len(output)})


@app.route('/hotels/<id>')
def get_hotel(id):
    hotel = Hotel.query.filter_by(hotel_id=id).first()
    if (hotel == None):
        response = jsonify({'status': "INVALID_ID"})
        response.status_code = 404
        return response

    hotel_data = {}
    hotel_data['id'] = hotel.hotel_id
    hotel_data['name'] = hotel.name
    hotel_data['phone'] = hotel.phone
    hotel_data['location'] = {'lat': hotel.latitude, 'long': hotel.longtitude}
    hotel_data['rating'] = hotel.rating
    hotel_data['address'] = [hotel.address1, hotel.address2]
    hotel_data['reviews'] = [{'text': hotel.reviews[0].text, 'link': hotel.reviews[0].link}, {
        'text': hotel.reviews[1].text, 'link': hotel.reviews[1].link}, {
        'text': hotel.reviews[2].text, 'link': hotel.reviews[2].link}]
    image_data = []
    for image in hotel.images:
        image_data += [image.image_url]
    hotel_data['images'] = image_data

    restaurants = close_places("restaurant", 2, hotel.zipcode)
    attractions = close_places("attraction", 2, hotel.zipcode)

    return jsonify({'status': "OK", 'hotel': hotel_data, 'close_by_restaurants': restaurants, 'close_by_attractions': attractions})


@app.route('/attractions')
def get_attractions():
    output = getList(request.args, "attraction")
    return jsonify({'status': "OK", 'list': output, 'total': len(output)})



@app.route('/attractions/<id>')
def get_attraction(id):
    attraction = Attraction.query.filter_by(attraction_id=id).first()
    if (attraction == None):
        response = jsonify({'status': "INVALID_ID"})
        response.status_code = 404
        return response

    attraction_data = {}
    attraction_data['id'] = attraction.attraction_id
    attraction_data['name'] = attraction.name
    attraction_data['phone'] = attraction.phone
    attraction_data['location'] = {
        'lat': attraction.latitude, 'long': attraction.longtitude}
    attraction_data['rating'] = attraction.rating
    attraction_data['address'] = [attraction.address1, attraction.address2]
    attraction_data['reviews'] = [{'text': attraction.reviews[0].text, 'link': attraction.reviews[0].link}, {
        'text': attraction.reviews[1].text, 'link': attraction.reviews[1].link}, {
        'text': attraction.reviews[2].text, 'link': attraction.reviews[2].link}]
    image_data = []
    for image in attraction.images:
        image_data += [image.image_url]
    attraction_data['images'] = image_data

    restaurants = close_places("restaurant", 2, attraction.zipcode)
    hotels = close_places("hotel", 2, attraction.zipcode)

    return jsonify({'status': "OK", 'attraction': attraction_data, 'close_by_restaurants': restaurants, 'close_by_hotels': hotels})


@app.route('/categories')
def get_categories():
    categories = Category.query.all()
    output = []
    for category in categories:
        category_data = {}
        category_data['id'] = category.id
        category_data['name'] = category.name
        category_data['number'] = len(category.restaurants)
        output.append(category_data)
    return jsonify({'status': "OK", 'list': output, 'total': len(output)})

