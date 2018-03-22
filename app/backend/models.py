#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/models.py
# --------------------------------------

from flask_sqlalchemy import SQLAlchemy 
from flask import jsonify
from main import app

db = SQLAlchemy(app)

imageID = 0
class Images(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True)
    image1 = db.Column(db.String(200))
    image2 = db.Column(db.String(200))
    image3 = db.Column(db.String(200))
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'), nullable=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=True)
    attraction_id = db.Column(db.Integer, db.ForeignKey('attraction.id'), nullable=True)

    hotel = db.relationship('Hotel', backref=db.backref('images',lazy=True, uselist=False))
    restaurant = db.relationship('Restaurant', backref=db.backref('images',lazy=True, uselist=False))
    attraction = db.relationship('Attraction', backref=db.backref('images',lazy=True, uselist=False))


    def __init__(self, images):
        global imageID
        self.id = imageID
        imageID += 1
        self.image1 = images[0]
        self.image2 = images[1]
        self.image3 = images[2]

reviewID = 0
class Review(db.Model):
    __tablename__ = "review"
    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String(200))
    text = db.Column(db.String(200))
    place_id = db.Column(db.Integer, db.ForeignKey('hotel.id'), nullable=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=True)
    attraction_id = db.Column(db.Integer, db.ForeignKey('attraction.id'), nullable=True)

    hotel = db.relationship('Hotel', backref=db.backref('reviews',lazy=True))
    restaurant = db.relationship('Restaurant', backref=db.backref('reviews',lazy=True))
    attraction = db.relationship('Attraction', backref=db.backref('reviews',lazy=True))

    def __init__(self, ReviewText, ReviewLink):
        global reviewID
        self.id = reviewID
        reviewID += 1
        self.text = ReviewText
        self.link = ReviewLink

class Hotel (db.Model):
    __tablename__ = "hotel"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    cover_image = db.Column(db.String(200))
    longtitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address1 = db.Column(db.String(100))
    address2 = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    zipcode = db.Column(db.Integer)

    def __init__(self, id, name, longtitude, latitude, rating, phone):
        self.id = id
        self.name = name
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.phone = phone

    def addReview(self, text, link):
        new_review = Review(text, link)
        self.reviews.append(new_review)
    
    def addImage(self, images):
        self.cover_image = images[0]
        new_images = Images(images)
        self.images = new_images
    
    def addAddress(self, address, zipcode):
        self.address1 = address[0]
        self.address2 = address[1]
        self.zipcode = zipcode
    


class Restaurant (db.Model):
    __tablename__ = "restaurant"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    cover_image = db.Column(db.String(200))

    latitude = db.Column(db.Float)
    longtitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address1 = db.Column(db.String(100))
    address2 = db.Column(db.String(100))
    open_hour = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    zipcode = db.Column(db.Integer)

    def __init__(self, id, name, longtitude, latitude, rating, open_hour, phone):
        self.id = id
        self.name = name
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.open_hour = open_hour
        self.phone = phone

    def addReview(self, text, link):
        new_review = Review(text, link)
        self.reviews.append(new_review)

    def addImage(self, images):
        self.cover_image = images[0]
        new_images = Images(images)
        self.images = new_images
    
    def addAddress(self, address, zipcode):
        self.address1 = address[0]
        self.address2 = address[1]
        self.zipcode = zipcode

class Attraction (db.Model):
    __tablename__ = "attraction"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    

    cover_image = db.Column(db.String(200))
    longtitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address1 = db.Column(db.String(100))
    address2 = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    zipcode = db.Column(db.Integer)

    def __init__(self, id, name, longtitude, latitude, rating, phone):
        self.id = id
        self.name = name
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.phone = phone

    def addReview(self, text, link):
        new_review = Review(text, link)
        self.reviews.append(new_review)

    def addImage(self, images):
        self.cover_image = images[0]
        new_images = Images(images)
        self.images = new_images

    def addAddress(self, address, zipcode):
        self.address1 = address[0]
        self.address2 = address[1]
        self.zipcode = zipcode


    
