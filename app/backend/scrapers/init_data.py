from flask_sqlalchemy import SQLAlchemy
import sys, os
FILE_ABSOLUTE_PATH = os.path.abspath(__file__)  # get absolute filepath
CURRENT_DIR = os.path.dirname(FILE_ABSOLUTE_PATH)  # get directory path of file
PARENT_DIR = os.path.dirname(CURRENT_DIR)  # get parent directory path
BASE_DIR = os.path.dirname(PARENT_DIR)  # get grand parent directory path
sys.path.append(BASE_DIR)
from models import *

from hotel_scraper import *
from restaurant_scraper import *
from attraction_scraper import *

def init_db():
    db.drop_all()
    db.create_all()
    scrap_hotels()
    scrap_restaurants()
    scrap_attractions()
    db.session.commit()

if __name__ == '__main__':
    init_db()
