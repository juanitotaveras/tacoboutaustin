#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/scraper/Helper_methods.py
# --------------------------------------
from __future__ import print_function
import requests
import sys, os
FILE_ABSOLUTE_PATH = os.path.abspath(__file__)  # get absolute filepath
CURRENT_DIR = os.path.dirname(FILE_ABSOLUTE_PATH)  # get directory path of file
PARENT_DIR = os.path.dirname(CURRENT_DIR)  # get parent directory path
BASE_DIR = os.path.dirname(PARENT_DIR)  # get grand parent directory path
sys.path.append(BASE_DIR)
from main import app, db
from models import Place, Restaurant, Hotel, Image, Review, Attraction, Category, Association, Zipcode
#from sqlalchemy import func
import pprint

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
YELP_KEY = "Bearer r1UIaTkCCqXMdMJC1Zu5KO5LYMU_k_e5eyttQlGbKcj7RYgued3tsikm4QnsX0GBRVVQ-1bIyxr6mSTD-Pl0MHrODWAxgakZF38cG-TVcnaiwc8idbB53rjQGwSDWnYx"
GOOGLE_KEY = "AIzaSyD6F4xULR2I7GtEAH82L9vL6dAaEQAqnpQ"

sygic_headers = {'x-api-key': SYGIC_KEY}
yelp_headers = {'Authorization': YELP_KEY}


pp = pprint.PrettyPrinter(indent=4)

def getModel(type):
    if type == "restaurant":
        return Restaurant
    if type == "hotel":
        return Hotel
    if type == "attraction":
        return Attraction
    return Place

def scrap_yelp_data(name, longitude, latitude):
    url = "https://api.yelp.com/v3/businesses/search?term=" + "\"" + name + "\"&latitude=" + str(latitude) + "&longitude=" + str(longitude)
    response = requests.get(url, headers = yelp_headers)
    response_json = response.json()
    if 'error' in response_json or response_json['total'] <= 0 or len(response_json['businesses']) == 0:
        return None, None
    found = False
    for business in response_json['businesses']:
        if isNotExist(business):
            id = business['id']
            found = True
            break
    if not found:
        return None, None

    url = "https://api.yelp.com/v3/businesses/" + id
    response = requests.get(url, headers = yelp_headers)
    detail = response.json()

    if len(detail['location']['display_address']) < 2 or detail['location']['zip_code'] == '':
        return None, None

    url = "https://api.yelp.com/v3/businesses/" + id + "/reviews"
    response = requests.get(url, headers = yelp_headers)
    review = response.json()
    
    return detail, review


def isNotExist(business):
    another_place = Place.query.filter_by(name = business['name']).filter_by(phone = business['display_phone']).first() 
    return (another_place is None)

def isHotel(categories):
    for category in categories:
        if category['alias'] == "realestateagents" or category['alias'] == "homedecor" or category['alias'] == "collegeuniv" or category['alias'] == "structuralengineers" or category['alias'] == "hair_extensions":
            return False
    return True

if __name__ == "__main__":
    pass