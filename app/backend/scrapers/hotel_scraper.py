from helper_methods import *

# Hotels in Austin
AUSTIN_HOTEL = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=sleeping&limit=20"


def scrap_hotels():
	response = requests.get(AUSTIN_HOTEL, headers = sygic_headers)
	hotels = response.json()['data']['places']
	id = 0

	default_image_url = "http://www.jetsetz.com/uploads/profiles/best-luxury-hotels-in-austin-texas-jetsetz.jpg"
	for hotel in hotels:
		name = hotel['name']
		lon, lat =  hotel['location']['lng'], hotel['location']['lat']
		detail, review = scrap_yelp_data(name, lon, lat)
		rating = 0.0
		number = ""
		image = ['', '', '']
		address = ['', '']

		if not detail is None:
			rating = detail['rating']
			number = detail['display_phone']
			for x in range(0, len(detail['photos'])):
				image[x] = detail['photos'][x]
			address[0] = detail['location']['display_address'][0]
			address[1] = detail['location']['display_address'][1]
			new_hotel = Hotel(id, hotel['name'], hotel['location']['lng'],hotel['location']['lat'], rating, number)
			new_hotel.addImage(image)
			#print(detail)
			new_hotel.addAddress(address, int(detail['location']['zip_code']))

			if not review is None:
				for x in range(0, min(3, review['total'])):
					new_hotel.addReview(review['reviews'][x]['text'], review['reviews'][x]['url'], x)
			db.session.add(new_hotel)
			id+=1
		
		
	db.session.commit()
