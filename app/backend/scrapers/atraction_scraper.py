import requests
import sys
sys.path.append('/mnt/c/Users/thaia/Documents/projects/tacoboutaustin/app/backend')

from models import *

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
headers = {'x-api-key': SYGIC_KEY}

#  Atraction in Austin
AUSTIN_ATRACTION = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=going_out"

# three sample atractions in Austin
SIX_STREET = "https://api.sygictravelapi.com/1.0/en/places/poi:12246"
PARAMOUNT = "https://api.sygictravelapi.com/1.0/en/places/poi:49042"
LONG_CENTRE = "https://api.sygictravelapi.com/1.0/en/places/poi:36887"

def scrap_attractions():
	#	db.drop_all()
	#   db.create_all()
	response = requests.get(AUSTIN_ATRACTION, headers = headers)
	attractions = response.json()['data']['places']
	id = 1
	for attraction in attractions:
		new_attraction = Attraction(id, attraction['name'], "images_url", attraction['location']['lng'], attraction['location']['lat'], attraction['rating'], "attraction address, Austin")
		db.session.add(new_attraction)
		id+=1
	db.session.commit()

# scrap 3 atractions and return them in a list
def scrap_three_atractions():
	response = requests.get(SIX_STREET, headers = headers)
	atraction1 = response.json()
	print(atraction1['data']['place']['name'])

	response = requests.get(PARAMOUNT, headers = headers)
	atraction2 = response.json()
	print(atraction2['data']['place']['name'])

	response = requests.get(LONG_CENTRE, headers = headers)
	atraction3 = response.json()
	print(atraction3['data']['place']['name'])

	return [atraction1, atraction2, atraction3]

if __name__ == '__main__':
	scrap_atractions()
