from helper_methods import *

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
headers = {'x-api-key': SYGIC_KEY}

AUSTIN_EATING = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=eating"

def scrap_restaurants():
	response = requests.get(AUSTIN_EATING, headers = sygic_headers)
	restaurants = response.json()['data']['places']

	id = 1
	default_image_api = "http://images.huffingtonpost.com/2013-06-18-untitled48.jpg"
	for restaurant in restaurants:
		new_restaurant = Restaurant(id, restaurant['name'], default_image_api, restaurant['location']['lng'], restaurant['location']['lat'], restaurant['rating'], restaurant['name'] + " address, Austin", "hours")
		db.session.add(new_restaurant)
		id+=1
	db.session.commit()