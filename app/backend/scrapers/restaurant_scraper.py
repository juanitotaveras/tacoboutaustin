from helper_methods import *

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
headers = {'x-api-key': SYGIC_KEY}

AUSTIN_EATING = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=eating&limit=40"

def is_restaurant(restaurant):
	return len(restaurant['categories']) == 1
	#return restaurant['id'] == "amys-ice-creams-austin-8"

def scrap_restaurants():
	response = requests.get(AUSTIN_EATING, headers = sygic_headers)
	restaurants = response.json()['data']['places']

	id = 0
	default_image_api = "http://images.huffingtonpost.com/2013-06-18-untitled48.jpg"
	for restaurant in filter(is_restaurant, restaurants):
		name = restaurant['name']
		lon, lat =  restaurant['location']['lng'], restaurant['location']['lat']
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

			new_restaurant = Restaurant(id, restaurant['name'], restaurant['location']['lng'], restaurant['location']['lat'], rating, convert_hour(detail['hours'][0]['open']), number)
			new_restaurant.addImage(image)
			new_restaurant.addAddress(address, int(detail['location']['zip_code']))
			#print(detail['name'])
			#print(detail['hours'][0]['open'])

			if not review is None:
				for x in range(0, min(3, review['total'])):
					new_restaurant.addReview(review['reviews'][x]['text'], review['reviews'][x]['url'], x)
			db.session.add(new_restaurant)
			id+=1
	db.session.commit()

if __name__ == '__main__':
	db.drop_all()
	db.create_all()
	db.session.commit()
	scrap_restaurants()
