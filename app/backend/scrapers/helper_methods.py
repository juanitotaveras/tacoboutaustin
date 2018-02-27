import requests
import sys, os
FILE_ABSOLUTE_PATH = os.path.abspath(__file__)  # get absolute filepath
CURRENT_DIR = os.path.dirname(FILE_ABSOLUTE_PATH)  # get directory path of file
PARENT_DIR = os.path.dirname(CURRENT_DIR)  # get parent directory path
BASE_DIR = os.path.dirname(PARENT_DIR)  # get grand parent directory path
sys.path.append(BASE_DIR)
from models import *
import pprint

SYGIC_KEY = "EPrgMMQzpr9RMzaj25Tsw9QXrjtKbVMX2kY4NdWz"
YELP_KEY = "Bearer r1UIaTkCCqXMdMJC1Zu5KO5LYMU_k_e5eyttQlGbKcj7RYgued3tsikm4QnsX0GBRVVQ-1bIyxr6mSTD-Pl0MHrODWAxgakZF38cG-TVcnaiwc8idbB53rjQGwSDWnYx"
GOOGLE_KEY = "AIzaSyD6F4xULR2I7GtEAH82L9vL6dAaEQAqnpQ"

sygic_headers = {'x-api-key': SYGIC_KEY}
yelp_headers = {'Authorization': YELP_KEY}

def scrap_yelp_data(name, longitude, latitude):
    url = "https://api.yelp.com/v3/businesses/search?term=" + "\"" + name + "\"&latitude=" + str(latitude) + "&longitude=" + str(longitude)
    response = requests.get(url, headers = yelp_headers)
    if response.json()['total'] <= 0:
        return None, None
    id = response.json()['businesses'][0]['id']

    url = "https://api.yelp.com/v3/businesses/" + id
    response = requests.get(url, headers = yelp_headers)
    detail = response.json()

    url = "https://api.yelp.com/v3/businesses/" + id + "/reviews"
    response = requests.get(url, headers = yelp_headers)
    review = response.json()
    
    return detail, review
