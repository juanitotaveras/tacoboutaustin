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
    place = db.relationship('Place', backref=db.backref('images',lazy=True, cascade= "all, delete-orphan"))

    def __init__(self, image):
        self.image_url = image


class Review(db.Model):
    __tablename__ = "review"
    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String(200))
    text = db.Column(db.String(200))

    place_id = db.Column(db.Integer, db.ForeignKey('place.id'), nullable=True)
    place = db.relationship('Place', backref=db.backref('reviews',lazy=True, cascade= "all, delete-orphan"))

    def __init__(self, ReviewText, ReviewLink):
        self.text = ReviewText
        self.link = ReviewLink

class Hour(db.Model):
    __tablename__ = "hour"
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), primary_key=True)
    restaurant = db.relationship('Restaurant', cascade = "all", back_populates="hours")
    day = db.Column(db.Integer, primary_key = True)
    open_time = db.Column(db.String(4), primary_key = True)
    close_time = db.Column(db.String(4))

    def __init__(self, day, open_time, close_time):
        self.day = day
        self.open_time = open_time
        self.close_time = close_time

class Zipcode(db.Model):
    __tablename__ = "zipcode"
    value = db.Column(db.Integer, primary_key = True)
    places = db.relationship('Place', cascade="all, delete-orphan", back_populates="zip_code")

    def __init__(self, value):
        self.value = value

    @classmethod
    def get_or_create(self, value):
        exists = db.session.query(Zipcode.value).filter_by(value = value).scalar() is not None
        if exists:
            return db.session.query(Zipcode).filter_by(value = value).first()
        new_zipcode = self(value)
        db.session.add(new_zipcode)
        return new_zipcode

class Association(db.Model):
    __tablename__ = 'association'
    category_id = db.Column(db.String(100), ForeignKey('category.id'), primary_key=True)
    place_id = db.Column(db.Integer, ForeignKey('place.id'), primary_key=True)
    category = relationship("Category", back_populates="places")
    place = relationship("Place", back_populates="categories")

class Category(db.Model):
    __tablename__ = "category"
    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(200))
    places = relationship("Association", back_populates="category", cascade="all, delete-orphan")

    def __init__(self, id, name):
        self.id = id
        self.name = name

    @classmethod
    def get_or_create(self, id, name):
        exists = db.session.query(Category.id).filter_by(id = id).scalar() is not None
        if exists:
            return db.session.query(Category).filter_by(id=id).first()
        return self(id, name)
class Distance(db.Model):
    __tablename__ = 'distance'
    id = db.Column(db.Integer, ForeignKey('place.id'), primary_key = True)
    second_place_id = db.Column(db.Integer, ForeignKey('place.id'), primary_key = True)
    distance = db.Column(db.Float)

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

    zipcode = db.Column(db.Integer, ForeignKey('zipcode.value'))
    zip_code = relationship("Zipcode", back_populates="places")
    distances = relationship("Distance", cascade="all, delete-orphan", primaryjoin=id==Distance.id)

    categories = relationship("Association", back_populates="place", cascade="all, delete-orphan")

    def addCategories(self, categories):
        for category in categories:
            a = Association()
            a.category = Category.get_or_create(category['alias'], category['title'])
            with db.session.no_autoflush:
                self.categories.append(a)

    def addDistance(self, place, distance):
        d = Distance()
        d.second_place_id = place.id
        d.distance = distance
        with db.session.no_autoflush:
            self.distances.append(d)

    def __init__(self, name, longtitude, latitude, rating, phone):
        self.name = name
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.phone = phone

    def addReview(self, text, link):
        new_review = Review(text, link)
        with db.session.no_autoflush:
            self.reviews.append(new_review)
    
    def addImage(self, image):
        new_images = Image(image)
        with db.session.no_autoflush:
            self.images.append(new_images)
    
    def addCover(self, cover):
        self.cover_image = cover

    def addAddress(self, address, zipcode):
        if len(address) == 3:
            self.address1 = address[0] + ", " + address[1]
            self.address2 = address[2]
        else:
            self.address1 = address[0]
            self.address2 = address[1]
        new_zipcode = Zipcode.get_or_create(zipcode)
        with db.session.no_autoflush:
            self.zip_code = new_zipcode

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
    hours = relationship("Hour", back_populates = "restaurant", cascade="all, delete-orphan")


    def addHour(self, time):
        new_hour = Hour(time['day'], time['start'], time['end'])
        with db.session.no_autoflush:
            self.hours.append(new_hour)

    __mapper_args__ = {
        'polymorphic_identity':'restaurant',
    }
