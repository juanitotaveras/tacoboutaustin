import requests
import sys
sys.path.append('/mnt/c/Users/thaia/Documents/projects/tacoboutaustin/app/backend')

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
