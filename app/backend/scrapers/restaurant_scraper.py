#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/scraper/restaurant_scraper.py
# --------------------------------------

from helper_methods import *

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
headers = {'x-api-key': SYGIC_KEY}

AUSTIN_EATING = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=eating&limit=200"

def is_restaurant(restaurant):
	return len(restaurant['categories']) == 1
	#return restaurant['id'] == "amys-ice-creams-austin-8"

def scrap_restaurants():
	response = requests.get(AUSTIN_EATING, headers = sygic_headers)
	restaurants = response.json()['data']['places']

	default_image_api = "http://images.huffingtonpost.com/2013-06-18-untitled48.jpg"
	for restaurant in filter(is_restaurant, restaurants):
		name = restaurant['name']
		lon, lat =  restaurant['location']['lng'], restaurant['location']['lat']
		detail, review = scrap_yelp_data(name, lon, lat)
		rating = 0.0
		number = ""
		address = ['', '']

		if not detail is None and 'hours' in detail:
			rating = detail['rating']
			number = detail['display_phone']
			if len(detail['location']['display_address']) == 3:
				address[0]  =  detail['location']['display_address'][0] + ", " + detail['location']['display_address'][1]
				address[1] = detail['location']['display_address'][2]
			else:
				address[0] = detail['location']['display_address'][0]
				address[1] = detail['location']['display_address'][1]

			new_restaurant = Restaurant(detail['name'], restaurant['location']['lng'], restaurant['location']['lat'], rating, number)
			for x in range(0, len(detail['photos'])):
				new_restaurant.addImage(detail['photos'][x])
			new_restaurant.addCover(detail['photos'][0])
			for time in detail['hours'][0]['open']:
				new_restaurant.addHour(time)
			new_restaurant.addAddress(address, int(detail['location']['zip_code']))

			for category in detail['categories']:
				a = Association()
				a.category = Category.get_or_create(category['alias'], category['title'])
				new_restaurant.categories.append(a)
			if not review is None:
				for x in range(0, min(3, review['total'])):
					new_restaurant.addReview(review['reviews'][x]['text'], review['reviews'][x]['url'])
			db.session.add(new_restaurant)
			db.session.commit()
	db.session.commit()

if __name__ == '__main__':
	db.drop_all()
	db.create_all()
	print("start")
	db.session.commit()
	scrap_restaurants()
