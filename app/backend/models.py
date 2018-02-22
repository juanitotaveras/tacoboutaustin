from flask_sqlalchemy import SQLAlchemy 
from flask import jsonify
from routes import app

db = SQLAlchemy(app)


class Hotel (db.Model):
    __tablename__ = "hotel"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    image = db.Column(db.String(200))
    longtitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address = db.Column(db.String(100))

    def __init__(self, id, name, image, longtitude, latitude, rating, address):
        self.id = id
        self.name = name
        self.image = image
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.address = address

class Restaurant (db.Model):
    __tablename__ = "restaurant"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    image = db.Column(db.String(200)) 
    latitude = db.Column(db.Float)
    longtitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address = db.Column(db.String(100))
    open_hour = db.Column(db.String(50))

    def __init__(self, id, name, image, longtitude, latitude, rating, address, open_hour):
        self.id = id
        self.name = name
        self.image = image
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.address = address
        self.open_hour = open_hour

class Attraction (db.Model):
    __tablename__ = "attraction"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    image = db.Column(db.String(200))
    longtitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address = db.Column(db.String(100))

    def __init__(self, id, name, image, longtitude, latitude, rating, address):
        self.id = id
        self.name = name
        self.image = image
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.address = address    


    