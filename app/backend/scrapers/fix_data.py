from helper_methods import *

def fix_sixth_street():
    attraction = Attraction.query.filter_by(id='0').first()
    attraction.address1 = "W 6th St"
    attraction.address2 = "Austin, TX 78703"
    attraction.zipcode = 78703
    db.session.commit()

def fix_hotels():
    hotel = Hotel.query.filter_by(name ="Pecan Grove Rv Park").first()
    hotel.images.image1 = "http://www.freedomintow.com/wp-content/uploads/2015/07/PecanGroveEntrance.jpg"
    hotel.cover_image = "http://www.freedomintow.com/wp-content/uploads/2015/07/PecanGroveEntrance.jpg"
    hotel.images.image2 = "http://www.freedomintow.com/wp-content/uploads/2015/07/PecanGroveDrive.jpg"
    
    hotel = Hotel.query.filter_by(address1 = "109 E 7th St").first()
    hotel.name = "Aloft Austin Downtown"
    
    hotel = Hotel.query.filter_by(name = "Mehl's Motel").first()
    hotel.images.image1 = "http://2.bp.blogspot.com/_YUD_TKP5xJk/TE3qHiCAGQI/AAAAAAAAADE/XNsebuQEf_Y/s1600/DSC08018.JPG"
    hotel.cover_image = "http://2.bp.blogspot.com/_YUD_TKP5xJk/TE3qHiCAGQI/AAAAAAAAADE/XNsebuQEf_Y/s1600/DSC08018.JPG"

    hotel = Hotel.query.filter_by(name = "Austin Folk House").first()
    hotel.images.image1 = "https://media.dexknows.com/media/photos/8532/b254/2c5d/a06e/9060/0d94/8eef/c653/image/8532b2542c5da06e90600d948eefc653.jpeg"
    hotel.cover_image = "https://media.dexknows.com/media/photos/8532/b254/2c5d/a06e/9060/0d94/8eef/c653/image/8532b2542c5da06e90600d948eefc653.jpeg"

    hotel = Hotel.query.filter_by(name = "Studio 6 Austin").first()
    if hotel is not None:
        db.session.delete(hotel)

    hotel = Hotel.query.filter_by(name = "Archer Hotel Austin").first()
    if hotel is not None:
        db.session.delete(hotel)

    hotel = Hotel.query.filter_by(name = "Omni Austin Hotel Downtown").first()
    if hotel is not None:
        db.session.delete(hotel)
   
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
    #fix_sixth_street()
    fix_zip_code()
    fix_hotels()
    db.session.commit()
