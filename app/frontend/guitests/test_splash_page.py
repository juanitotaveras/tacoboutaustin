#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/frontend/guitests/test_splash_page.py
# --------------------------------------

# dependencies required:
# pip install pyvirtualdisplay selenium
# apt-get install xvfb xserver-xephyr
from unittest import main, TestCase
from selenium import webdriver
from pyvirtualdisplay import Display
from guitest_config import settings, initialize

class HomePageTest(TestCase):
    def setUp(self):
        self = initialize(self)

    def test_home_page_browser_tab_title(self):
        # self.navigate_to_site()
        self.assertEqual(self.driver.title, "Tacoboutaustin")

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verification_errors)

if __name__ == "__main__":
    main()
