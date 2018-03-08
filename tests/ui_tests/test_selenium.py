# dependencies required: 
# pip install pyvirtualdisplay selenium  
# apt-get install xvfb xserver-xephyr 
from selenium import webdriver
from pyvirtualdisplay import Display
from unittest import main, TestCase



class UnitTest(TestCase):
	def test1(self):
		display = Display(visible=0, size=(1920, 1080))
		display.start()
		driver = webdriver.Chrome("../chromedriver")
		driver.get('http://localhost:3000')

		# Make sure that browser title is tacoboutaustin
		print (driver.title)

if __name__ == "__main__":
	main()
