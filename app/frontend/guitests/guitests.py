import unittest
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, NoAlertPresentException
from pyvirtualdisplay import Display

from test_about import TestAbout
from test_hotels import HotelsTest
from test_restaurant_details import TestRestaurantDetails
from test_splash_page import HomePageTest
from test_filter import TestFilter
from test_search import TestSearch

if __name__ == 'main':
    unittest.main()
