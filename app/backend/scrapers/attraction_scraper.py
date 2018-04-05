#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/scraper/attraction_scraper.py
# --------------------------------------

from helper_methods import *

#  Atractions in Austin
AUSTIN_ATRACTION = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=going_out&limit=200"

def scrap_attractions():
	response = requests.get(AUSTIN_ATRACTION, headers = sygic_headers)
	attractions = response.json()['data']['places']

	#default_image_url = "https://freefuninaustin.com/wp-content/uploads/sites/44/2016/01/10487454_1006645319401332_8704118089041012520_n-1.jpg"
	for attraction in attractions:
		name = attraction['name']
		lon, lat =  attraction['location']['lng'], attraction['location']['lat']
		detail, review = scrap_yelp_data(name, lon, lat)
		rating = 0.0
		number = ""
		image = ['', '', '']
		address = ['', '']

		if not detail is None and len(detail['location']['display_address']) > 1:
			rating = detail['rating']
			number = detail['display_phone']
			if len(detail['location']['display_address']) == 3:
				address[0]  =  detail['location']['display_address'][0] + ", " + detail['location']['display_address'][1]
				address[1] = detail['location']['display_address'][2]
			else:
				address[0] = detail['location']['display_address'][0]
				address[1] = detail['location']['display_address'][1]
			
			new_attraction = Attraction(detail['name'], attraction['location']['lng'], attraction['location']['lat'], rating, number)
			for x in range(0, len(detail['photos'])):
				new_attraction.addImage(detail['photos'][x])
			addCover(detail['photos'][0])
			new_attraction.addAddress(address, int(detail['location']['zip_code']))

			if not review is None:
				for x in range(0, min(3, review['total'])):
					new_attraction.addReview(review['reviews'][x]['text'], review['reviews'][x]['url'])
			db.session.add(new_attraction)
			db.session.commit()
	db.session.commit()

if __name__ == '__main__':
	#db.drop_all()
	#db.create_all()
	#db.session.commit()
	scrap_attractions()