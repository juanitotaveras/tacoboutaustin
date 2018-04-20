#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring
# pylint: disable = import-error
# pylint: disable = access-member-before-definition
# pylint: disable = attribute-defined-outside-init

# --------------------------------------
# app/frontend/guitests/test_about.py
# --------------------------------------

# -*- coding: utf-8 -*-
# dependencies required:
# pip install pyvirtualdisplay selenium
# apt-get install xvfb xserver-xephyr

#from unittest import main, TestCase
import unittest
#import unittest, time, re
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, NoAlertPresentException
from pyvirtualdisplay import Display
from guitest_config import settings, initialize
#from selenium.webdriver.common.by import By
#from selenium.webdriver.common.keys import Keys
#from selenium.webdriver.support.ui import Select


NOT_VISIBLE = 0
VISIBLE = 1
class TestFilter(unittest.TestCase):
    def setUp(self):
        self = initialize(self)
    
    def test_filter(self):
        driver = self.driver
        driver.find_element_by_xpath("//div[@id='root']/div/div/nav/div/ul/li[3]/a/h3").click()
        driver.find_element_by_id("ratingFilter").click()
        driver.find_element_by_id("ratingFilter").clear()
        driver.find_element_by_id("ratingFilter").send_keys("4")
        driver.find_element_by_xpath("(//button[@type='button'])[2]").click()
        driver.find_element_by_xpath("//div[@id='root']/div/div[2]/div/div[2]/div[2]/div/div[3]/div/div/div/a/button").click()
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
