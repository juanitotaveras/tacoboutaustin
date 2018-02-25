import requests
import sys, os
FILE_ABSOLUTE_PATH = os.path.abspath(__file__)  # get absolute filepath
CURRENT_DIR = os.path.dirname(FILE_ABSOLUTE_PATH)  # get directory path of file
PARENT_DIR = os.path.dirname(CURRENT_DIR)  # get parent directory path
BASE_DIR = os.path.dirname(PARENT_DIR)  # get grand parent directory path
sys.path.append(BASE_DIR)
from models import *

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
headers = {'x-api-key': SYGIC_KEY}

# hotels in Austin
AUSTIN_HOTEL = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=sleeping&limit=20"


def scrap_hotels():
	#	db.drop_all()
	#   db.create_all()
	response = requests.get(AUSTIN_HOTEL, headers = headers)
	hotels = response.json()['data']['places']
	id = 1
	default_image_url = "http://www.jetsetz.com/uploads/profiles/best-luxury-hotels-in-austin-texas-jetsetz.jpg"
	for hotel in hotels:
		new_hotel = Hotel(id, hotel['name'], default_image_url, hotel['location']['lng'], hotel['location']['lat'], hotel['rating'], hotel['name'] + " address, Austin")
		db.session.add(new_hotel)
		id+=1
	db.session.commit()

if __name__ == '__main__':
	scrap_hotels()
