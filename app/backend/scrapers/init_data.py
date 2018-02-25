from helper_methods import *
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
