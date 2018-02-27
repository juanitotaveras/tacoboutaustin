from flask_sqlalchemy import SQLAlchemy 
from flask import jsonify
from routes import app

db = SQLAlchemy(app)


class Hotel (db.Model):
    __tablename__ = "hotel"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    image1 = db.Column(db.String(200))
    image2 = db.Column(db.String(200))
    image3 = db.Column(db.String(200))

    longtitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address1 = db.Column(db.String(100))
    address2 = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    
    reviewText1 = db.Column(db.String(200))
    reviewLink1 = db.Column(db.String(200))
    reviewText2 = db.Column(db.String(200))
    reviewLink2 = db.Column(db.String(200))
    reviewText3 = db.Column(db.String(200))
    reviewLink3 = db.Column(db.String(200))

    def __init__(self, id, name, longtitude, latitude, rating, phone):
        self.id = id
        self.name = name
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.phone = phone

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
    
    def addImage(self, images):
        self.image1 = images[0]
        self.image2 = images[1]
        self.image3 = images[2]
    
    def addAddress(self, address):
        self.address1 = address[0]
        self.address2 = address[1]
    


class Restaurant (db.Model):
    __tablename__ = "restaurant"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    image1 = db.Column(db.String(200))
    image2 = db.Column(db.String(200))
    image3 = db.Column(db.String(200))

    latitude = db.Column(db.Float)
    longtitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address1 = db.Column(db.String(100))
    address2 = db.Column(db.String(100))
    open_hour = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    
    reviewText1 = db.Column(db.String(200))
    reviewLink1 = db.Column(db.String(200))
    reviewText2 = db.Column(db.String(200))
    reviewLink2 = db.Column(db.String(200))
    reviewText3 = db.Column(db.String(200))
    reviewLink3 = db.Column(db.String(200))

    def __init__(self, id, name, longtitude, latitude, rating, open_hour, phone):
        self.id = id
        self.name = name
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.open_hour = open_hour
        self.phone = phone

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

    def addImage(self, images):
        self.image1 = images[0]
        self.image2 = images[1]
        self.image3 = images[2]
    
    def addAddress(self, address):
        self.address1 = address[0]
        self.address2 = address[1]

class Attraction (db.Model):
    __tablename__ = "attraction"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    

    image1 = db.Column(db.String(200))
    image2 = db.Column(db.String(200))
    image3 = db.Column(db.String(200))

    longtitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    address1 = db.Column(db.String(100))
    address2 = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    
    reviewText1 = db.Column(db.String(200))
    reviewLink1 = db.Column(db.String(200))
    reviewText2 = db.Column(db.String(200))
    reviewLink2 = db.Column(db.String(200))
    reviewText3 = db.Column(db.String(200))
    reviewLink3 = db.Column(db.String(200))

    def __init__(self, id, name, longtitude, latitude, rating, phone):
        self.id = id
        self.name = name
        self.longtitude = longtitude
        self.latitude = latitude
        self.rating = rating
        self.phone = phone

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

    def addImage(self, images):
        self.image1 = images[0]
        self.image2 = images[1]
        self.image3 = images[2]

    def addAddress(self, address):
        self.address1 = address[0]
        self.address2 = address[1]


    
