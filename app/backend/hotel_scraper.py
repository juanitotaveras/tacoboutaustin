import requests

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
headers = {'x-api-key': SYGIC_KEY}

# hotels in Austin
AUSTIN_HOTEL = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=sleeping"

# three sample Hotels in Austin
DRISKILL = "https://api.sygictravelapi.com/1.0/en/places/poi:1768303"
OMNI = "https://api.sygictravelapi.com/1.0/en/places/poi:698874"
RESIDENCE = "https://api.sygictravelapi.com/1.0/en/places/poi:382553"


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
	scrap_three_hotels()
