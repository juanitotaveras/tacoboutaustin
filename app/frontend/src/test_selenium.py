from selenium import webdriver
from pyvirtualdisplay import Display

display = Display(visible=1, size=(1920, 1080))
display.start()
driver = webdriver.Chrome("/media/sf_git/tacoboutaustin/tests/chromedriver")
driver.get('http://localhost:3000')
print driver.title
