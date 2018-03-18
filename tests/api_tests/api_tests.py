import requests
import sys
import os
from unittest import main, TestCase

FILE_ABSOLUTE_PATH = os.path.abspath(__file__)  # get absolute filepath
CURRENT_DIR = os.path.dirname(FILE_ABSOLUTE_PATH)  # get directory path of file
PARENT_DIR = os.path.dirname(CURRENT_DIR)  # get parent directory path
BASE_DIR = os.path.dirname(PARENT_DIR)  # get grand parent directory path
sys.path.append(BASE_DIR)

api_url = "http://api.tacoboutaustin.me/"

#from app.routes import *


class TestApi(TestCase):

    def test_message_restaurant(self):
        response = requests.get(api_url + "restaurants")
        #print(response.json())
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_hotel(self):
        response = requests.get(api_url + "hotels")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_attraction(self):
        response = requests.get(api_url + "attractions")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_restaurant_id_1(self):
        response = requests.get(api_url + "restaurants/0")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")
    
    def test_message_restaurant_id_2(self):
        response = requests.get(api_url + "restaurants/201") # invalid id
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")
    
    def test_message_hotel_id_1(self):
        response = requests.get(api_url + "hotels/0")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_hotel_id_2(self):
        response = requests.get(api_url + "hotels/201")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")

    def test_message_attraction_id_1(self):
        response = requests.get(api_url + "attractions/1")
        status = response.json()['status']
        self.assertEqual(response.ok, True)
        self.assertEqual(status, "OK")

    def test_message_attraction_id_2(self):
        response = requests.get(api_url + "attractions/201")
        status = response.json()['status']
        self.assertEqual(response.ok, False)
        self.assertEqual(status, "INVALID_ID")


if __name__ == "__main__":
    main()


