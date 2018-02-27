from helper_methods import *

#  Atractions in Austin
AUSTIN_ATRACTION = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=going_out"

def scrap_attractions():
	response = requests.get(AUSTIN_ATRACTION, headers = sygic_headers)
	attractions = response.json()['data']['places']
	id = 0

	default_image_url = "https://freefuninaustin.com/wp-content/uploads/sites/44/2016/01/10487454_1006645319401332_8704118089041012520_n-1.jpg"
	for attraction in attractions:
		name = attraction['name']
		lon, lat =  attraction['location']['lng'], attraction['location']['lat']
		detail, review = scrap_yelp_data(name, lon, lat)
		rating = 0.0
		number = ""
		image = ['', '', '']

		if not detail is None:
			rating = detail['rating']
			number = detail['display_phone']
			for x in range(0, len(detail['photos'])):
				image[x] = detail['photos'][x]
				#print(image[x])
			
		new_attraction = Attraction(id, attraction['name'], attraction['location']['lng'], attraction['location']['lat'], rating,  attraction['name'] + " address, Austin", number)
		new_attraction.addImage(image)

		if not review is None:
			for x in range(0, min(3, review['total'])):
				new_attraction.addReview(review['reviews'][x]['text'], review['reviews'][x]['url'], x)
		db.session.add(new_attraction)
		id+=1
	db.session.commit()

if __name__ == '__main__':
	db.drop_all()
	db.create_all()
	db.session.commit()
	scrap_attractions()