from pyvirtualdisplay import Display
from selenium import webdriver

# Will display chrome window while testing
# if set to True
VISIBLE = False
# If no path is set, Selenium will look for 
# the chromedriver in your environment's path
CHROMEDRIVER_PATH = None
# CHROMEDRIVER_PATH = "./chromedriver"
BASE_URL = 'http://tacoboutaustin.me'

v = 1 if VISIBLE else 0

settings = {
	'VISIBLE': v,
	'DRIVER_PATH': CHROMEDRIVER_PATH,
	'BASE_URL': BASE_URL
}

def initialize(test_case):
    test_case.display = Display(visible=settings['VISIBLE'], size=(1920, 1080))
    test_case.display.start()
    if settings['DRIVER_PATH'] == None:
        test_case.driver = webdriver.Chrome()
    else:
        test_case.driver = webdriver.Chrome(settings['DRIVER_PATH'])
    test_case.base_url = settings['BASE_URL']
    test_case.verificationErrors = []
    test_case.driver.get(test_case.base_url)
    test_case.driver.implicitly_wait(20)
    return test_case