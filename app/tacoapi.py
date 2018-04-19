#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/tacoapi.py
# --------------------------------------

from flask import render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, or_, text
from main import app,db
from copy import copy
from models import Place, Restaurant, Hotel, Image, Review, Attraction, Category, Hour, Distance, Zipcode
import re

numberOfClosePlace = 4

dayDict = {"Sunday": 0, "Monday": 1, "Tuesday": 2,
           "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6}

def getOtherType(type):
    if type == "restaurant":
        return "hotel", "attraction" 
    if type == "hotel":
        return "restaurant", "attraction"
    if type == "attraction":
        return "restaurant", "hotel"

def getIdType(model, type):
    if type == "restaurant":
        return model.restaurant_id
    if type == "hotel":
        return model.hotel_id
    if type == "attraction":
        return model.attraction_id
    return model.id

def close_places(original_place, type, number):
    query_string = "SELECT place.*, place.id as place_id, " + \
    type + ".*, distance.* FROM " + type + " inner join distance ON " + \
    type + ".id = distance.second_place_id inner join place ON " + type + \
    ".id = place.id WHERE distance.id = " + str(original_place.id) + \
    " ORDER BY distance.distance asc LIMIT " + str(number) 

    query = text(query_string)
    places = db.session.execute(query)
    places_data = []
    if places is not None:
        for place in places:
            place_data = {}
            place_data['id'] = getIdType(place, type)
            place_data['name'] = place.name
            place_data['image'] = place.cover_image
            place_data['rating'] = place.rating
            place_data['address'] = [place.address1, place.address2]
            place_data['zip_code'] = place.zipcode  
            place_data['distance'] = place.distance

            category_string = "SELECT category.* FROM category inner join association on category.id = association.category_id inner join place on place.id = association.place_id where place.id = " + str(place.place_id)
            category_query = text(category_string)
            categories = db.session.execute(category_query)
            place_data['categories'] = []
            for category in categories:
                category_data = {}
                category_data['id'] = category.id
                category_data['name'] = category.name
                place_data['categories'].append(category_data)
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
    if timeGet > open_time and timeGet < close_time:
        return True
    return False

def isOpen(hours, time):
    result = False
    day = dayDict[time[0]]
    timeComp = time[1].split(":")
    timeGet = int(timeComp[0])*60 + int(timeComp[1])
    if int(timeComp[0]) < 6:
        timeGet += 1440
    for open_hour in hours:
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

def getSearchQuery(args, Model):
    search = args.get('search', default=None, type=str)
    search_type = args.get('search_type', default=None, type=str)

    if(search_type == 'and' or search is None):
        query = Model.query
    else:
        query = Model.query.filter_by(id=-1)
    if search is not None:
        searchTokens = search.split(',')
        for token in searchTokens:
            if(search_type == 'and'):
                query = query.filter(or_(Model.zipcode.like(token), Model.name.like("%"+token+"%")))
            else:
                query = Model.query.filter(or_(or_(Model.zipcode.like(token), Model.name.like("%"+token+"%"), Model.id.in_(place.id for place in query.all()))))
    return query

def getFilterQuery(query, args, Model):
    rating = args.get('rating', default=None, type=str)
    zipcode = args.get('zipcode', default=None, type=str)
    categories = args.get('categories', default=None, type=str)

    if rating is not None:
        query = query.filter(Model.rating >= float(rating))
    if categories is not None:
        categoriesTokens = categories.split(',')
        for token in categoriesTokens:
            query = query.filter(Model.categories.any(category_id = token))
    if zipcode is not None:
        zipcodesTokens = zipcode.split(',')
        query = query.filter(Model.zipcode.in_(zipcodesTokens))
    if Model == Restaurant:  # special case with restaurant, because restaurant have open hour and categories
        time = args.get('time', default=None, type=str)
        if time is not None:
            restaraunts = query.all()
            open_restaurants = []
            for restaurant in restaraunts:
                timeList = time.split(",")
                if isOpen(restaurant.hours, timeList):
                    open_restaurants.append(restaurant)
            query = query.filter(Restaurant.id.in_((rest.id for rest in open_restaurants)))
    return query


def getSortAndPageQuery(query, args, Model):
    order_by = args.get('order_by', default=None, type=str)
    order = args.get('order', default=None, type=str)
    page = args.get('page', default=None, type=int)

    if order_by is None:
        order_by = 'name'
    if order is not None:
        if order == 'asc':
            query = query.order_by(getQueryCol(Model, order_by).asc())
        else:
            query = query.order_by(getQueryCol(Model, order_by).desc())
    if page is not None:
        query = query.limit(12).offset(12*(page-1))

    return query


# type: "restaurant", "hotel", "attraction"
# args = requests.args
def getList(args, type):
    Model = getModel(type)  # get the right model

    # Get search query
    query = getSearchQuery(args, Model)
    # Get all filter queries: rating, zipcode, categories, time
    query = getFilterQuery(query, args, Model)
    # Get sort and pagination queries
    query = getSortAndPageQuery(query, args, Model)

    # get the output of the request (a list of places with type provided)
    places = query.all()
    output = []
    for place in places:
        place_data = {}
        place_data['id'] = getIdType(place, type)
        place_data['name'] = place.name
        place_data['image'] = place.cover_image
        place_data['rating'] = place.rating
        place_data['address'] = [place.address1, place.address2]
        place_data['zip_code'] = place.zipcode

        place_data['categories'] = []
        for association in place.categories:
            category_data = {}
            category_data['id'] = association.category.id
            category_data['name'] = association.category.name
            place_data['categories'].append(category_data)
        output.append(place_data)
    return output

def getOne(id, type):
    global numberOfClosePlace
    Model = getModel(type)
    place = Model.query.filter(getIdType(Model, type) == id).first()
    if place == None:
        response = jsonify({'status': "INVALID_ID"})
        response.status_code = 404
        return response, None, None, None, None

    place_data = {}
    place_data['id'] = getIdType(place, type)
    place_data['name'] = place.name
    place_data['phone'] = place.phone 
    place_data['location'] = {
        'lat': place.latitude, 'long': place.longtitude}
    place_data['address'] = [place.address1, place.address2]
    place_data['rating'] = place.rating
    place_data['reviews'] = []
    for review in place.reviews:
        place_data['reviews'] += [{'text': review.text, 'link': review.link}]

    image_data = []
    for image in place.images:
        image_data += [image.image_url]
    place_data['images'] = image_data
    if type == "restaurant":
        hours_data = []
        for hour in place.hours:
            hour_data = {}
            hour_data['day'] = hour.day
            hour_data['open_time'] = hour.open_time
            hour_data['close_time'] = hour.close_time
            hours_data += [hour_data]
        place_data['hours'] = hours_data
 
    place_data['categories'] = []
    for association in place.categories:
        category_data = {}
        category_data['id'] = association.category.id
        category_data['name'] = association.category.name
        place_data['categories'].append(category_data)

    type1, type2 = getOtherType(type)
    type1_place = close_places(place, type1, numberOfClosePlace)
    type2_place = close_places(place, type2, numberOfClosePlace)
    close_by_type1 = "close_by_" + type1 + "s"
    close_by_type2 = "close_by_" + type2 + "s"
    return place_data, close_by_type1, type1_place, close_by_type2, type2_place

@app.route('/')
def hello_user():
    return render_template('hello.html')

@app.route('/restaurants')
def get_restaurants():
    output = getList(request.args, "restaurant")
    return jsonify({'status': "OK", 'list': output, 'total': len(output)})

@app.route('/restaurants/<id>')
def get_restaurant(id):
    restaurant_data, type1, type1_place, type2, type2_place = getOne(id, "restaurant")

    if type1 is not None:
        return jsonify({'status': "OK", 'restaurant': restaurant_data, type1: type1_place, type2: type2_place})
    else:
        return restaurant_data


@app.route('/hotels')
def get_hotels():
    output = getList(request.args, "hotel")
    return jsonify({'status': "OK", 'list': output, 'total': len(output)})


@app.route('/hotels/<id>')
def get_hotel(id):
    hotel_data, type1, type1_place, type2, type2_place = getOne(id, "hotel")
    
    if type1 is not None:
        return jsonify({'status': "OK", 'hotel': hotel_data, type1: type1_place, type2: type2_place})
    else:
        return hotel_data

@app.route('/attractions')
def get_attractions():
    output = getList(request.args, "attraction")
    return jsonify({'status': "OK", 'list': output, 'total': len(output)})

@app.route('/attractions/<id>')
def get_attraction(id):
    attraction_data, type1, type1_place, type2, type2_place = getOne(id, "attraction")
    if type1 is not None:
        return jsonify({'status': "OK", 'attraction': attraction_data, type1: type1_place, type2: type2_place})
    else:
        return attraction_data

@app.route('/categories')
def get_categories():
    query_string = "SELECT category.*, COUNT(place.id) as Count FROM category inner join association on category.id = association.category_id inner join place on place.id = association.place_id"
    type = request.args.get('type', default=None, type=str)
    if type is not None:
        query_string = query_string + " WHERE place.type = \"" + type + "\""  
    query = text(query_string + " group by category.id")
    categories = db.session.execute(query)
    output = []
    for category in categories:
        category_data = {}
        category_data['value'] = category.id
        category_data['label'] = category.name
        category_data['number'] = category.Count
        output.append(category_data)
    return jsonify({'status': "OK", 'categories': output, 'total': len(output)})

@app.route('/zipcodes')
def get_zipcodes():
    type = request.args.get('type', default=None, type=str)
    query_string = "SELECT zipcode.*, COUNT(place.id) as Count FROM zipcode inner join place on place.zipcode = zipcode.value"
    if type is not None:
        query_string = query_string + " WHERE place.type = \"" + type + "\""  
    query = text(query_string + " GROUP BY zipcode.value")
    zipcodes = db.session.execute(query)

    output = []
    for zipcode in zipcodes:
        zipcode_data = {}
        zipcode_data['value'] = zipcode.value
        zipcode_data['label'] = str(zipcode.value)
        zipcode_data['number'] = zipcode.Count
        output.append(zipcode_data)
    return jsonify({'status': "OK", 'list': output, 'total': len(output)})