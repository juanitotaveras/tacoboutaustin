#!/usr/bin/env python3

# pylint: disable = bad-whitespace
# pylint: disable = invalid-name
# pylint: disable = missing-docstring

# --------------------------------------
# app/backend/scraper/hotel_scraper.py
# --------------------------------------

from helper_methods import *
from fix_data import fix_all

AUSTIN_HOTEL = "https://api.sygictravelapi.com/1.0/en/places/list?bounds=29.53522956294847,-98.4375,30.751277776257812,-97.03125&categories=sleeping&limit=500"
AUSTIN_EATING = "https://api.sygictravelapi.com/1.0/en/places/list?bounds=29.53522956294847,-98.4375,30.751277776257812,-97.03125&categories=eating&limit=500"
AUSTIN_ATRACTION = "https://api.sygictravelapi.com/1.0/en/places/list?bounds=29.53522956294847,-98.4375,30.751277776257812,-97.03125&categories=going_out|discovering|hiking|playing|sightseeing|doing_sports|relaxing&limit=500"

def scrape_places(URL, type):
    print(URL)
    response = requests.get(URL, headers = sygic_headers)
    places = response.json()['data']['places']
    Model = getModel(type)

    for place in places:
        detail, review = scrap_yelp_data(place['name'], place['location']['lng'], place['location']['lat'])
        address = ['', '']
        
        if not detail is None and (type != "restaurant" or 'hours' in detail) and (type != "hotel" or isHotel(detail['categories'])):
            #pp.pprint(detail)
            rating = detail['rating']
            number = detail['display_phone']
            if len(detail['location']['display_address']) == 3:
                address[0]  =  detail['location']['display_address'][0] + ", " + detail['location']['display_address'][1]
                address[1] = detail['location']['display_address'][2]
            else:
                address[0] = detail['location']['display_address'][0]
                address[1] = detail['location']['display_address'][1]

            new_place = Model(detail['name'], detail['coordinates']['longitude'],detail['coordinates']['latitude'], rating, number)
            for x in range(0, len(detail['photos'])):
                new_place.addImage(detail['photos'][x])
            if len(detail['photos']) > 0:
                new_place.addCover(detail['photos'][0])
            new_place.addAddress(address, int(detail['location']['zip_code']))
            new_place.addCategories(detail['categories'])
            if not review is None:
                for x in range(0, min(3, review['total'])):
                    new_place.addReview(review['reviews'][x]['text'], review['reviews'][x]['url'])

            if type == "restaurant":
                for time in detail['hours'][0]['open']:
                    new_place.addHour(time)

            db.session.add(new_place)
            db.session.commit()
    db.session.commit()

def scrape_restaurants():
    print("Starting scraping restaurants data")
    scrape_places(AUSTIN_EATING, "restaurant")
    print("Done scraping restaurants data")

def scrape_hotels():
    print("Starting scraping hotels data")
    scrape_places(AUSTIN_HOTEL, "hotel")
    print("Done scraping hotels data")

def scrape_attractions():
    print("Starting scraping attractions data")
    scrape_places(AUSTIN_ATRACTION, "attraction")
    print("Done scraping attracions data")

if __name__ == '__main__':
    db.drop_all()
    db.create_all()
    db.session.commit()
    scrape_restaurants()
    scrape_attractions()
    scrape_hotels()
    fix_all()
    print("everything done.")
