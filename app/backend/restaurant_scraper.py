import requests

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
headers = {'x-api-key': SYGIC_KEY}

AUSTIN_EATING = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=eating"

HOPDODDY = "https://api.sygictravelapi.com/1.0/en/places/poi:12260"
TORCHY = "https://api.sygictravelapi.com/1.0/en/places/poi:12294"
FRANKLIN = "https://api.sygictravelapi.com/1.0/en/places/poi:64645"

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
	scrap_three_restaurants()
