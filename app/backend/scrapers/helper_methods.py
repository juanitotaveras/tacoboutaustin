import requests
import sys, os
FILE_ABSOLUTE_PATH = os.path.abspath(__file__)  # get absolute filepath
CURRENT_DIR = os.path.dirname(FILE_ABSOLUTE_PATH)  # get directory path of file
PARENT_DIR = os.path.dirname(CURRENT_DIR)  # get parent directory path
BASE_DIR = os.path.dirname(PARENT_DIR)  # get grand parent directory path
sys.path.append(BASE_DIR)
from models import *
#from sqlalchemy import func
import pprint

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
YELP_KEY = "Bearer r1UIaTkCCqXMdMJC1Zu5KO5LYMU_k_e5eyttQlGbKcj7RYgued3tsikm4QnsX0GBRVVQ-1bIyxr6mSTD-Pl0MHrODWAxgakZF38cG-TVcnaiwc8idbB53rjQGwSDWnYx"
GOOGLE_KEY = "AIzaSyD6F4xULR2I7GtEAH82L9vL6dAaEQAqnpQ"

sygic_headers = {'x-api-key': SYGIC_KEY}
yelp_headers = {'Authorization': YELP_KEY}

def scrap_yelp_data(name, longitude, latitude):
    url = "https://api.yelp.com/v3/businesses/search?term=" + "\"" + name + "\"&latitude=" + str(latitude) + "&longitude=" + str(longitude)
    response = requests.get(url, headers = yelp_headers)
    response_json = response.json()
    if response_json['total'] <= 0 or len(response_json['businesses']) == 0:
        return None, None
    #pp = pprint.PrettyPrinter(indent=4)
    #pp.pprint(response.json())
    id = response_json['businesses'][0]['id']

    url = "https://api.yelp.com/v3/businesses/" + id
    response = requests.get(url, headers = yelp_headers)
    detail = response.json()

    url = "https://api.yelp.com/v3/businesses/" + id + "/reviews"
    response = requests.get(url, headers = yelp_headers)
    review = response.json()
    
    return detail, review

"""
Sun - Thu: 11 am - 10:30 pm 
Fri - Sat: 11 am - 11:30 pm
"""

days = {0:"Sunday", 1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday"}


def convert_hour(hours):
    start_hours = ["closed", "closed", "closed", "closed", "closed", "closed", "closed"]
    end_hours = ["", "", "", "", "", "", ""]
    open_hours = ""

    table = {}
    for i in range(len(hours)):
        day_num = hours[i]['day']
        table[day_num] = hours[i]

    for day, value in table.items():
        start_hours[day] = convert_military(table[day]['start'])
        end_hours[day] = " - " + convert_military(table[day]['end'])
    
    for i in range(7):
        open_hours += days[i] + ": "
        if not end_hours is "":
            open_hours += start_hours[i] + end_hours[i] + "<br>"
    return open_hours

def convert_military(time):
    hour_num = int(time[:2])
    if hour_num > 12:
        return str(hour_num - 12) + ":" + time[-2:] + "PM"
    else:
        return str(hour_num) + ":" + time[-2:] +"AM"

"""
def close_places(place_type, number, zip_code):
    places = None
    if place_type == "restaurant":
        places = Restaurant.query.filter_by(zipcode=zip_code).order_by(
            func.random()).limit(number).all()
    if place_type == "hotel":
        places = Hotel.query.filter_by(zipcode=zip_code).order_by(
            func.random()).limit(number).all()
    if place_type == "attraction":
        places = Attraction.query.filter_by(zipcode=zip_code).order_by(
            func.random()).limit(number).all()
    places_data = []
    if places is not None:
        for place in places:
            place_data = {}
            place_data['id'] = place.id
            place_data['name'] = place.name
            place_data['images'] = [place.image1, place.image2, place.image3]
            place_data['rating'] = place.rating
            place_data['address'] = [place.address1, place.address2]
            places_data.append(place_data)
    return places_data
"""

if __name__ == "__main__":
    print(convert_military("1130"))
    #places_data = close_places("restaurant", 2, 78752)
    #restaurant = Restaurant.query.filter_by(zipcode=78752).all()
    #print(restaurant)
    #print(places_data)
