#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring
# --------------------------------------
# app/backend/models.py
# --------------------------------------

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from flask import jsonify
from main import app, db


class Image(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(200))

    place_id = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=True)
    place = db.relationship('Place', backref=db.backref('images',lazy=True))

    def __init__(self, image):
        self.image_url = image


class Review(db.Model):
    __tablename__ = "review"
    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String(200))
    text = db.Column(db.String(200))

    place_id = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=True)
    place = db.relationship('Place', backref=db.backref('reviews',lazy=True))

    def __init__(self, ReviewText, ReviewLink):
        self.text = ReviewText
        self.link = ReviewLink

class Association(db.Model):
    __tablename__ = 'association'
    category_id = db.Column(db.String(100), ForeignKey('category.id'), primary_key=True)
    restaurant_id = db.Column(db.Integer, ForeignKey('restaurant.id'), primary_key=True)
    category = relationship("Category", back_populates="restaurants")
    restaurant = relationship("Restaurant", back_populates="categories")

class Category(db.Model):
    __tablename__ = "category"
    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(200))
    restaurants = relationship("Association", back_populates="category", cascade="all, delete-orphan")

    def __init__(self, id, name):
        self.id = id
        self.name = name

    @classmethod
    def get_or_create(self, id, name):
        exists = db.session.query(Category.id).filter_by(id = id).scalar() is not None
        if exists:
            return db.session.query(Category).filter_by(id=id).first()
        return self(id, name)
        
class Place(db.Model):
    __tablename__ = "place"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    type = db.Column(db.String(20))

    cover_image = db.Column(db.String(200))
    longtitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address1 = db.Column(db.String(100))
    address2 = db.Column(db.String(100))
    phone = db.Column(db.String(20))

    zipcode = db.Column(db.Integer)
    def __init__(self, name, longtitude, latitude, rating, phone):
        self.name = name
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.phone = phone

    def addReview(self, text, link):
        new_review = Review(text, link)
        self.reviews.append(new_review)
    
    def addImage(self, image):
        new_images = Image(image)
        self.images.append(new_images)
    
    def addCover(self, cover):
        self.cover_image = cover

    def addAddress(self, address, zipcode):
        self.address1 = address[0]
        self.address2 = address[1]
        self.zipcode = zipcode

    __mapper_args__ = {
        'polymorphic_identity':'place',
        'polymorphic_on':type
    }

class Hotel (Place):
    __tablename__ = "hotel"
    id = db.Column(db.Integer, ForeignKey('place.id'))
    hotel_id = db.Column(db.Integer, primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity':'hotel',
    }

class Attraction (Place):
    __tablename__ = "attraction"
    id = db.Column(db.Integer, ForeignKey('place.id'))
    attraction_id = db.Column(db.Integer, primary_key=True)    
    __mapper_args__ = {
        'polymorphic_identity':'attraction',
    }

class Restaurant (Place):
    __tablename__ = "restaurant" 
    id = db.Column(db.Integer, ForeignKey('place.id'))
    restaurant_id = db.Column(db.Integer, primary_key=True)
    open_hour = db.Column(db.String(200))
    categories = relationship("Association", back_populates="restaurant")

    def addHour(self, hour):
        open_hour = hour

    __mapper_args__ = {
        'polymorphic_identity':'restaurant',
    }
    
