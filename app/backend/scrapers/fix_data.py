#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/scraper/fix_data.py
# --------------------------------------

from helper_methods import *
from math import radians, cos, sin, asin, sqrt

def fix_sixth_street():
    attraction = Attraction.query.filter_by(name='Sixth street').first()
    attraction.addAddress(["W 6th St", "Austin, TX 78703"], 78703)
    db.session.commit()

def fix_hotels():
    hotel = Hotel.query.filter_by(name ="Pecan Grove Rv Park").first()
    hotel.addImage("http://www.freedomintow.com/wp-content/uploads/2015/07/PecanGroveEntrance.jpg")
    hotel.addCover("http://www.freedomintow.com/wp-content/uploads/2015/07/PecanGroveEntrance.jpg")
    hotel.addImage("http://www.freedomintow.com/wp-content/uploads/2015/07/PecanGroveDrive.jpg")
    
    hotel = Hotel.query.filter_by(address1 = "109 E 7th St").first()
    hotel.name = "Aloft Austin Downtown"
    
    hotel = Hotel.query.filter_by(name = "Mehl's Motel").first()
    hotel.addImage("http://2.bp.blogspot.com/_YUD_TKP5xJk/TE3qHiCAGQI/AAAAAAAAADE/XNsebuQEf_Y/s1600/DSC08018.JPG")
    hotel.addCover("http://2.bp.blogspot.com/_YUD_TKP5xJk/TE3qHiCAGQI/AAAAAAAAADE/XNsebuQEf_Y/s1600/DSC08018.JPG")

    hotel = Hotel.query.filter_by(name = "Austin Folk House").first()
    hotel.addImage("https://media.dexknows.com/media/photos/8532/b254/2c5d/a06e/9060/0d94/8eef/c653/image/8532b2542c5da06e90600d948eefc653.jpeg")
    hotel.addCover("https://media.dexknows.com/media/photos/8532/b254/2c5d/a06e/9060/0d94/8eef/c653/image/8532b2542c5da06e90600d948eefc653.jpeg")

    hotel = Hotel.query.filter_by(name = "Studio 6 Austin").first()
    if hotel is not None:
        db.session.delete(hotel)

    hotel1 = Hotel.query.filter_by(name = "Archer Hotel Austin").first()
    print(hotel1)
    if hotel is not None:
        print(hotel1)
        db.session.delete(hotel)

    hotel2 = Hotel.query.filter_by(name = "Omni Austin Hotel Downtown").first()
    if hotel2 is not None:
        db.session.delete(hotel2)
   
    db.session.commit()

def fix_attractions():
    attraction = Attraction.query.filter_by(name = "HandleBar").first()
    if attraction is not None:
        db.session.delete(attraction)
    
    attraction = Attraction.query.filter_by(name = "Backbeat").first()
    if attraction is not None:
        db.session.delete(attraction)
    db.session.commit()

def delete_restaurant(restaurant):
    associations = Association.query.filter_by(restaurant_id = restaurant.id).all()
    for association in associations:
        db.session.delete(association)
    db.session.delete(restaurant)

def fix_zip_code():
    for zipcode in Zipcode.query.all():
        count = Place.query.filter_by(zipcode = zipcode.value).count()
        if count < 1:
            db.session.delete(zipcode)
            db.session.commit()
def fix_categories():
    for category in Category.query.all():
        if len(category.places) == 0:
            db.session.delete(category)
            db.session.commit()

def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    miles = 3963*c # radius of the earth ~ 3963 miles
    return miles

"""
def test1():
    restaurant = Restaurant.query.filter_by(id = 1).first()
    restaurants = Restaurant.query.filter(Restaurant.id != 1).all()
    close_restaurant = restaurants[0]
    for restaurantC in restaurants:
        print(close_restaurant.id, haversine(close_restaurant.longtitude, close_restaurant.latitude, restaurant.longtitude, restaurant.latitude), restaurantC.id, haversine(restaurantC.longtitude, restaurantC.latitude,restaurant.longtitude, restaurant.latitude))
        if compareDistance(restaurant, restaurantC, close_restaurant):
            close_restaurant = restaurantC
"""

def init_distances():
    places = Place.query.all()
    for place in places:
        other_places = Place.query.filter(Place.id != place.id)
        for other_place in other_places:
            place.addDistance(other_place, haversine(place.longtitude, place.latitude, other_place.longtitude, other_place.latitude))
        db.session.commit()

def fix_all():
    fix_sixth_street()
    fix_hotels()
    fix_attractions()
    fix_categories()
    fix_zip_code()
    print("finish fixing data, start initialize distances table")
    init_distances()


if __name__ == "__main__":
    fix_all()
    db.session.commit()
