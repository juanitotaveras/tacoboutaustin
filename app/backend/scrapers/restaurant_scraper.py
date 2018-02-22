import requests
import sys
sys.path.append('/mnt/c/Users/thaia/Documents/projects/tacoboutaustin/app/backend')

from models import *

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
headers = {'x-api-key': SYGIC_KEY}

AUSTIN_EATING = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=eating"

HOPDODDY = "https://api.sygictravelapi.com/1.0/en/places/poi:12260"
TORCHY = "https://api.sygictravelapi.com/1.0/en/places/poi:12294"
FRANKLIN = "https://api.sygictravelapi.com/1.0/en/places/poi:64645"

def scrap_restaurants():
	#	db.drop_all()
	#   db.create_all()
	response = requests.get(AUSTIN_EATING, headers = headers)
	restaurants = response.json()['data']['places']
	id = 1
	for restaurant in restaurants:
		new_restaurant = Restaurant(id, restaurant['name'], "images_url", restaurant['location']['lng'], restaurant['location']['lat'], restaurant['rating'], "restaurant address, Austin", "hours")
		db.session.add(new_restaurant)
		id+=1
	db.session.commit()

def scrap_three_restaurants():
	response = requests.get(HOPDODDY, headers = headers)
	restaurant1 = response.json()
	print(restaurant1['data']['place']['name'])

	response = requests.get(TORCHY, headers = headers)
	restaurant2 = response.json()
	print(restaurant2['data']['place']['name'])

	response = requests.get(FRANKLIN, headers = headers)
	restaurant3 = response.json()
	print(restaurant3['data']['place']['name'])

	return [restaurant1, restaurant2, restaurant3]

if __name__ == '__main__':
	scrap_restaurants()
