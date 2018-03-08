from helper_methods import *

def fix_sixth_street():
    attraction = Attraction.query.filter_by(id='0').first()
    attraction.address1 = "W 6th St"
    attraction.address2 = "Austin, TX 78703"
    db.session.commit()

if __name__ == "__main__":
    fix_sixth_street()