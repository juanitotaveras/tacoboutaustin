from helper_methods import *

def fix_sixth_street():
    attraction = Attraction.query.filter_by(id='0').first()
    attraction.address1 = "W 6th St"
    attraction.address2 = "Austin, TX 78703"
    attraction.zipcode = 78703
    db.session.commit()

def fix_zip_code():
    restaurants = Restaurant.query.all()
    hotels = Hotel.query.all()
    attractions = Attraction.query.all()

    for restaurant in restaurants:
        zipcode = restaurant.zipcode
        
        same_zipcode_hotels = Hotel.query.filter_by(zipcode=zipcode).all()
        same_zipcode_attractions = Attraction.query.filter_by(zipcode=zipcode).all()
        if len(same_zipcode_hotels) < 2 or len(same_zipcode_attractions) < 2:
            same_zipcode_restaurants = Restaurant.query.filter_by(zipcode=zipcode).all()
            for res in same_zipcode_restaurants:
                db.session.delete(res)
            for hot in same_zipcode_hotels:
                db.session.delete(hot)
            for att in same_zipcode_attractions:
                db.session.delete(att)
            db.session.commit()
    
    for attraction in attractions:
        zipcode = attraction.zipcode   
        same_zipcode_restaurants = Restaurant.query.filter_by(zipcode=zipcode).all()
        same_zipcode_hotels = Hotel.query.filter_by(zipcode=zipcode).all()
        
        if len(same_zipcode_restaurants) < 2 or len(same_zipcode_hotels) < 2:
            same_zipcode_attractions = Attraction.query.filter_by(zipcode=zipcode).all()
            for res in same_zipcode_restaurants:
                db.session.delete(res)
            for hot in same_zipcode_hotels:
                db.session.delete(hot)
            for att in same_zipcode_attractions:
                db.session.delete(att)
            db.session.commit()
            
    for hotel in hotels:
        zipcode = hotel.zipcode
        same_zipcode_restaurants = Restaurant.query.filter_by(zipcode=zipcode).all()
        same_zipcode_attractions = Attraction.query.filter_by(zipcode=zipcode).all()
        
        if len(same_zipcode_restaurants) < 2 or len(same_zipcode_attractions) < 2:
            same_zipcode_hotels = Hotel.query.filter_by(zipcode=zipcode).all()
            for res in same_zipcode_restaurants:
                db.session.delete(res)
            for hot in same_zipcode_hotels:
                db.session.delete(hot)
            for att in same_zipcode_attractions:
                db.session.delete(att)
            db.session.commit()

if __name__ == "__main__":
    fix_sixth_street()
    fix_zip_code()
    db.session.commit()
