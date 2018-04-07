#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/scraper/hotel_scraper.py
# --------------------------------------

from helper_methods import *

# Hotels in Austin
AUSTIN_HOTEL = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=sleeping&limit=200"


def scrap_hotels():
	response = requests.get(AUSTIN_HOTEL, headers = sygic_headers)
	hotels = response.json()['data']['places']

	default_image_url = "http://www.jetsetz.com/uploads/profiles/best-luxury-hotels-in-austin-texas-jetsetz.jpg"
	for hotel in hotels:
		name = hotel['name']
		lon, lat =  hotel['location']['lng'], hotel['location']['lat']
		detail, review = scrap_yelp_data(name, lon, lat)
		rating = 0.0
		number = ""
		address = ['', '']

		if not detail is None:
			rating = detail['rating']
			number = detail['display_phone']
			#print(len(detail['location']['display_address']))
			if len(detail['location']['display_address']) == 3:
				address[0]  =  detail['location']['display_address'][0] + ", " + detail['location']['display_address'][1]
				address[1] = detail['location']['display_address'][2]
			else:
				address[0] = detail['location']['display_address'][0]
				address[1] = detail['location']['display_address'][1]


			new_hotel = Hotel(detail['name'], hotel['location']['lng'],hotel['location']['lat'], rating, number)
			for x in range(0, len(detail['photos'])):
				new_hotel.addImage(detail['photos'][x])
			if len(detail['photos']) > 0:
				new_hotel.addCover(detail['photos'][0])
			new_hotel.addAddress(address, int(detail['location']['zip_code']))

			if not review is None:
				for x in range(0, min(3, review['total'])):
					new_hotel.addReview(review['reviews'][x]['text'], review['reviews'][x]['url'])
			db.session.add(new_hotel)
			db.session.commit()
	db.session.commit()

if __name__ == '__main__':
	db.drop_all()
	db.create_all()
	db.session.commit()
	scrap_hotels()