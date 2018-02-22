from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///idb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

"""
@app.route('api/restaurant?id=<id>', method = ['GET'])
def get_restaurant(id):
    return 'hello id'
"""

import tacoapi
from models import *

if __name__ == '__main__':
    app.run()
