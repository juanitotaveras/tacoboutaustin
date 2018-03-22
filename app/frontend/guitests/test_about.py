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
#from selenium.webdriver.common.by import By
#from selenium.webdriver.common.keys import Keys
#from selenium.webdriver.support.ui import Select


NOT_VISIBLE = 0
VISIBLE = 1
class TestAbout(unittest.TestCase):
    def setUp(self):
        self.display = Display(visible=NOT_VISIBLE, size=(1920, 1080))
        self.display.start()
        self.driver = webdriver.Chrome("./chromedriver")
        self.base_url = 'http://tacoboutaustin.me'
        self.verificationErrors = []
        self.driver.get(self.base_url)
        self.driver.implicitly_wait(20)
        # self.accept_next_alert = True

    def test_about(self):
        driver = self.driver
        driver.find_element_by_id("root").click()
        driver.find_element_by_xpath("//div[@id='root']/div/div/nav/div/ul/li[4]/a/h3").click()

    def is_element_present(self, how, what):
        try:
            self.driver.find_element(by=how, value=what)
        except NoSuchElementException:
            return False
        return True

    def is_alert_present(self):
        try:
            self.driver.switch_to_alert()
        except NoAlertPresentException:
            return False
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
