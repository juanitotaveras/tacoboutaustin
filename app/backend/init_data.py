from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import *

def init_db():
    db.drop_all()
    db.create_all()
    db.session.commit()
    new_restaurant = Restaurant(1, 'abc', 'abc', 1.1, 1.2, 1.3, 'new address', '10am')
    db.session.add(new_restaurant)
    db.session.commit()

if __name__ == '__main__':
    init_db()
