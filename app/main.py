import os
import sys
from flask import Flask, send_from_directory,render_template, jsonify

from routes import app
from models import *
import tacoapi

# BASE_DIR is directory above config.py
BASE_DIR = os.path.abspath(os.path.dirname('__file__'))

# append path BASE_DIR to parksrus-frontend/build to get absolute path
REACT_FILES = os.path.join(BASE_DIR, 'frontend/build')

# app = Flask(__name__, static_folder= 'frontend/build/static')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///idb.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


#Serve React App
@app.route('/', defaults={'path': ''})
@app.route("/<string:path>")
@app.route('/<path:path>')
def serve(path):
    if(path == ""):
        return send_from_directory(REACT_FILES, 'index.html')
    else:
        if(os.path.exists(os.path.join(REACT_FILES, path))):
            return send_from_directory(REACT_FILES, path)
        else:
            return send_from_directory(REACT_FILES, 'index.html')

if __name__ == '__main__':
    app.run(port=5000, use_reloader=True, threaded=True)
