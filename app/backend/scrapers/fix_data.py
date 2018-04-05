#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/scraper/fix_data.py
# --------------------------------------

from helper_methods import *

def fix_sixth_street():
    attraction = Attraction.query.filter_by(name='Sixth street').first()
    attraction.address1 = "W 6th St"
    attraction.address2 = "Austin, TX 78703"
    attraction.zipcode = 78703
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

    hotel = Hotel.query.filter_by(name = "Archer Hotel Austin").first()
    if hotel is not None:
        db.session.delete(hotel)

    hotel = Hotel.query.filter_by(name = "Omni Austin Hotel Downtown").first()
    if hotel is not None:
        db.session.delete(hotel)
   
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
    restaurants = Restaurant.query.all()
    hotels = Hotel.query.all()
    attractions = Attraction.query.all()

    for restaurant in restaurants:
        zipcode = restaurant.zipcode
        
        same_zipcode_hotels = Hotel.query.filter_by(zipcode=zipcode).all()
        same_zipcode_attractions = Attraction.query.filter_by(zipcode=zipcode).all()
        if len(same_zipcode_hotels) < 2 or len(same_zipcode_attractions) < 2:
            same_zipcode_restaurants = Restaurant.query.filter_by(zipcode=zipcode).all()
            for res in same_zipcode_restaurants:
                delete_restaurant(res)
            for hot in same_zipcode_hotels:
                db.session.delete(hot)
            for att in same_zipcode_attractions:
                db.session.delete(att)
            db.session.commit()
    
    for attraction in attractions:
        zipcode = attraction.zipcode   
        same_zipcode_restaurants = Restaurant.query.filter_by(zipcode=zipcode).all()
        same_zipcode_hotels = Hotel.query.filter_by(zipcode=zipcode).all()
        
        if len(same_zipcode_restaurants) < 2 or len(same_zipcode_hotels) < 2:
            same_zipcode_attractions = Attraction.query.filter_by(zipcode=zipcode).all()
            for res in same_zipcode_restaurants:
                delete_restaurant(res)
            for hot in same_zipcode_hotels:
                db.session.delete(hot)
            for att in same_zipcode_attractions:
                db.session.delete(att)
            db.session.commit()
            
    for hotel in hotels:
        zipcode = hotel.zipcode
        same_zipcode_restaurants = Restaurant.query.filter_by(zipcode=zipcode).all()
        same_zipcode_attractions = Attraction.query.filter_by(zipcode=zipcode).all()
        
        if len(same_zipcode_restaurants) < 2 or len(same_zipcode_attractions) < 2:
            same_zipcode_hotels = Hotel.query.filter_by(zipcode=zipcode).all()
            for res in same_zipcode_restaurants:
                delete_restaurant(res)
            for hot in same_zipcode_hotels:
                db.session.delete(hot)
            for att in same_zipcode_attractions:
                db.session.delete(att)
            db.session.commit()

if __name__ == "__main__":
    #fix_sixth_street()
    #fix_zip_code()
    fix_hotels()
    fix_attractions()
    db.session.commit()
