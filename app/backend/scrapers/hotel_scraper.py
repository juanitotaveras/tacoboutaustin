import requests
import sys
sys.path.append('/mnt/c/Users/thaia/Documents/projects/tacoboutaustin/app/backend')

from models import *

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
headers = {'x-api-key': SYGIC_KEY}

# hotels in Austin
AUSTIN_HOTEL = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=sleeping&limit=20"

# three sample Hotels in Austin
DRISKILL = "https://api.sygictravelapi.com/1.0/en/places/poi:1768303"
OMNI = "https://api.sygictravelapi.com/1.0/en/places/poi:698874"
RESIDENCE = "https://api.sygictravelapi.com/1.0/en/places/poi:382553"

def scrap_hotels():
#	db.drop_all()
#   db.create_all()
    
	response = requests.get(AUSTIN_HOTEL, headers = headers)
	hotels = response.json()['data']['places']
	id = 1
	for hotel in hotels:
		new_hotel = Hotel(id, hotel['name'], "images_url", hotel['location']['lng'], hotel['location']['lat'], hotel['rating'], "hotel address, Austin")
		db.session.add(new_hotel)
		id+=1
	db.session.commit()


# scrap 3 hotels and return them in a list
def scrap_three_hotels():
	response = requests.get(DRISKILL, headers = headers)
	hotel1 = response.json()
	print(hotel1['data']['place']['name'])

	response = requests.get(OMNI, headers = headers)
	hotel2 = response.json()
	print(hotel2['data']['place']['name'])

	response = requests.get(RESIDENCE, headers = headers)
	hotel3 = response.json()
	print(hotel3['data']['place']['name'])

	return [hotel1, hotel2, hotel3]

if __name__ == '__main__':
	scrap_hotels()
