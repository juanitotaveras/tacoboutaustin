#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring
# pylint: disable = import-error

# --------------------------------------
# app/frontend/guitests/test_hotels.py
# --------------------------------------

# -*- coding: utf-8 -*-
# dependencies required:
# pip install pyvirtualdisplay selenium
# apt-get install xvfb xserver-xephyr
from unittest import main, TestCase
#import unittest
#import time
#import re
#from selenium.webdriver.common.by import By
#from selenium.webdriver.common.keys import Keys
#from selenium.webdriver.support.ui import Select
#from selenium.common.exceptions import NoAlertPresentException
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from pyvirtualdisplay import Display



NOT_VISIBLE = 0
VISIBLE = 1
class HotelsTest(TestCase):
    def setUp(self):
        self.display = Display(visible=NOT_VISIBLE, size=(1920, 1080))
        self.display.start()
        self.driver = webdriver.Chrome("./chromedriver")
        self.base_url = 'http://tacoboutaustin.me'
        self.verificationErrors = []
        self.driver.implicitly_wait(10)
        # self.accept_next_alert = True

    def test_click_on_hotel_details(self):
        # self.driver.find_element_by_xpath
        #           ("//div[@id='root']/div/div/nav/div/ul/li[3]/a/h3").click()

        driver = self.driver
        driver.get(self.base_url)
        driver.find_element_by_id("root").click()
        driver.find_element_by_link_text("Hotels").click()
        driver.find_element_by_link_text("Check it out!").click()

    def is_element_present(self, how, what):
        try:
            self.driver.find_element(by=how, value=what)
        except NoSuchElementException:
            return False
        return True

    # def is_alert_present(self):
    #     try: self.driver.switch_to_alert()
    #     except NoAlertPresentException as e: return False
    #     return True

    # def close_alert_and_get_its_text(self):
    #     try:
    #         alert = self.driver.switch_to_alert()
    #         alert_text = alert.text
    #         if self.accept_next_alert:
    #             alert.accept()
    #         else:
    #             alert.dismiss()
    #         return alert_text
    #     finally: self.accept_next_alert = True

    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    main()
