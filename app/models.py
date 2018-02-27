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
    
    reviewText1 = db.Column(db.String(200))
    reviewLink1 = db.Column(db.String(200))
    reviewText2 = db.Column(db.String(200))
    reviewLink2 = db.Column(db.String(200))
    reviewText3 = db.Column(db.String(200))
    reviewLink3 = db.Column(db.String(200))

    def __init__(self, id, name, image, longtitude, latitude, rating, address):
        self.id = id
        self.name = name
        self.image = image
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.address = address

    def addReview(self, text, link, index):
        if index == 0:
            self.reviewText1 = text
            self.reviewLink1 = link 
        elif index == 1:
            self.reviewText2 = text
            self.reviewLink2 = link
        elif index == 2:
            self.reviewText3 = text
            self.reviewLink3 = link


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
    
    reviewText1 = db.Column(db.String(200))
    reviewLink1 = db.Column(db.String(200))
    reviewText2 = db.Column(db.String(200))
    reviewLink2 = db.Column(db.String(200))
    reviewText3 = db.Column(db.String(200))
    reviewLink3 = db.Column(db.String(200))

    def __init__(self, id, name, image, longtitude, latitude, rating, address, open_hour):
        self.id = id
        self.name = name
        self.image = image
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.address = address
        self.open_hour = open_hour

    def addReview(self, text, link, index):
        if index == 0:
            self.reviewText1 = text
            self.reviewLink1 = link 
        elif index == 1:
            self.reviewText2 = text
            self.reviewLink2 = link
        elif index == 2:
            self.reviewText3 = text
            self.reviewLink3 = link

class Attraction (db.Model):
    __tablename__ = "attraction"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    image = db.Column(db.String(200))
    longtitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address = db.Column(db.String(100))
    
    reviewText1 = db.Column(db.String(200))
    reviewLink1 = db.Column(db.String(200))
    reviewText2 = db.Column(db.String(200))
    reviewLink2 = db.Column(db.String(200))
    reviewText3 = db.Column(db.String(200))
    reviewLink3 = db.Column(db.String(200))

    def __init__(self, id, name, image, longtitude, latitude, rating, address):
        self.id = id
        self.name = name
        self.image = image
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.address = address 

    def addReview(self, text, link, index):
        if index == 0:
            self.reviewText1 = text
            self.reviewLink1 = link 
        elif index == 1:
            self.reviewText2 = text
            self.reviewLink2 = link
        elif index == 2:
            self.reviewText3 = text
            self.reviewLink3 = link


    