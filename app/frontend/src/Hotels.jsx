import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import HotelCard from './HotelCard';

var hotels = [/*
{
  id: "0",
  name: "Omni Austin Hotel Downtown",
  image: "https://www.omnihotels.com/-/media/images/hotels/ausctr/pool/ausctr-omni-austin-hotel-downtown-evening-pool.jpg",
  address: "700 San Jacinto Blvd, Austin, TX 78701",
  rating: "★★★★★",
  amenities: "Breakfast, pool, room service",
  reviews: "We didn't get to use the rooftop pool, but my Omni status got us free coffee everyday at their little coffee shop."
},

{
  id: "1",
  name: "Kimpton Hotel Van Zandt",
  image: "http://www.hotelvanzandt.com/images/1700-960/hvz-gr-014-7b48dcc2.jpg",
  address: "605 Davis St, Austin, TX 78701",
  rating: "★★★★☆",
  amenities: "Breakfast, room service, yoga mat",
  reviews: "There is a yoga mat in the closet and apparently they will bring up fruit-infused water and other healthy fare if you're into that."
},

{
  id: "2",
  name: "Hilton Austin",
  image: "http://www3.hilton.com/resources/media/hi/AUSCVHH/en_US/img/shared/full_page_image_gallery/main/HH_presidentialparlor10_24_1270x560_FitToBoxSmallDimension_Center.jpg",
  address: "500 E 4th St, Austin, TX 78701",
  rating: "★★★☆☆",
  amenities: "Breakfast, pool, room service",
  reviews: "I was able to eat all my meals here, hang out in the lobby, frequent the coffee shop and I felt secure and protected."
} */];

export {hotels};

class Hotel {
  constructor(address, id, image1, name) {
    this.address = address;
    this.id = id;
    this.image = image1;
    this.name = name;
  }
}

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = hotels;
  }
  componentWillMount() {
    function fillInRestaurants(responseText) {
      // let dict = eval(responseText);
      // console.log(responseText);
      let locations = JSON.parse(responseText)["list"];
      // console.log(list);
      // console.log("test");
      // console.log(locations);
      
      var idx = 0;
      for (let location in locations) {
        // console.log(++idx);
        // console.log(location, locations[location]);
        // array of address, id, image1, name
        let array = locations[location];
        console.log("IMAGE: " + array["image1"]);
        hotels.push(new Hotel(array["address"], array["id"], array["image1"], array["name"]));
      } 
      // for (var key in dict) {
      //   let stats = dict[key];
      //   let author = stats["user"]["login"];
      //   console.log("AUTHOR: " + author);

      //   for (var i = 0; i < members.length; i++) {
      //     if (members[i]["gitLogin"] == author) {
      //       members[i]["issues"] += 1;
      //     }
      //   }
      //   tempTotalIssues += 1;

      // }
    }

    const url = "http://localhost/api/hotels";

    function request(url, parseResponse) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          // do something with response text
          parseResponse(xmlHttp.responseText);
        
      }
      xmlHttp.open("GET", url, false) // true for asynchronous
      xmlHttp.send(null);
    }

    request(url, fillInRestaurants);
  }

  render() {
    var cards = hotels.map(function(hotel){
            return <Col xs="12" sm="6" md="6" lg="3"><HotelCard hotel={hotel} /></Col>;
          })

    return (
      <div>
        <Container>
          <Row>
              <h1>Hotels </h1>
            </Row>
          </Container>
          <Container>
            <Row>
                {cards}
            </Row>
          </Container>
        </div>
    );
  }
}