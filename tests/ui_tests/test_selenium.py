# dependencies required: 
# pip install pyvirtualdisplay selenium  
# apt-get install xvfb xserver-xephyr 
from selenium import webdriver
from pyvirtualdisplay import Display

display = Display(visible=0, size=(1920, 1080))
display.start()
driver = webdriver.Chrome("../chromedriver")
driver.get('http://localhost:3000')
print driver.title
