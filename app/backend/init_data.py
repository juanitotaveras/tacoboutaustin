from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import *

def init_db():
    db.drop_all()
    db.create_all()
    db.session.commit()
    new_restaurant = Restaurant(id = 1, name = 'abc', image = 'abc', latitude = 1.1, longtitude = 1.2, rating = 1.3, address =  'new address', open_hour = '10am')
    db.session.add(new_restaurant)
    db.session.commit()

if __name__ == '__main__':
    init_db()
