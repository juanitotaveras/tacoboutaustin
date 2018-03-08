from helper_methods import *
from hotel_scraper import *
from restaurant_scraper import *
from attraction_scraper import *
from fix_data import *

def init_db():
    db.drop_all()
    db.create_all()
    scrap_hotels()
    db.session.commit()
    scrap_restaurants()
    fix_sixth_street()
    db.session.commit()
    scrap_attractions()
    db.session.commit()

if __name__ == '__main__':
    init_db()
