import requests
import sys, os
FILE_ABSOLUTE_PATH = os.path.abspath(__file__)  # get absolute filepath
CURRENT_DIR = os.path.dirname(FILE_ABSOLUTE_PATH)  # get directory path of file
PARENT_DIR = os.path.dirname(CURRENT_DIR)  # get parent directory path
BASE_DIR = os.path.dirname(PARENT_DIR)  # get grand parent directory path
sys.path.append(BASE_DIR)
from models import *

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
headers = {'x-api-key': SYGIC_KEY}

#  Atraction in Austin
AUSTIN_ATRACTION = "https://api.sygictravelapi.com/1.0/en/places/list?parents=city:397&categories=going_out"

def scrap_attractions():
	#	db.drop_all()
	#   db.create_all()
	response = requests.get(AUSTIN_ATRACTION, headers = headers)
	attractions = response.json()['data']['places']
	id = 1
	default_image_url = "https://freefuninaustin.com/wp-content/uploads/sites/44/2016/01/10487454_1006645319401332_8704118089041012520_n-1.jpg"
	for attraction in attractions:
		new_attraction = Attraction(id, attraction['name'], default_image_url, attraction['location']['lng'], attraction['location']['lat'], attraction['rating'],  attraction['name'] + " address, Austin")
		db.session.add(new_attraction)
		id+=1
	db.session.commit()

if __name__ == '__main__':
	scrap_attractions()
