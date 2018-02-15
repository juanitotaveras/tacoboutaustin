import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import HotelCard from './HotelCard';

var hotels = [
{
  id: "0",
  name: "Omni Austin Hotel Downtown",
  image: "https://www.omnihotels.com/-/media/images/hotels/ausctr/pool/ausctr-omni-austin-hotel-downtown-evening-pool.jpg",
  address: "700 San Jacinto Blvd, Austin, TX 78701",
  rating: "★★★★★"
},
{
  id: "1",
  name: "Kimpton Hotel Van Zandt",
  image: "http://www.hotelvanzandt.com/images/1700-960/hvz-gr-014-7b48dcc2.jpg",
  address: "605 Davis St, Austin, TX 78701",
  rating: "★★★★☆"
},
{
  id: "2",
  name: "Hilton Austin",
  image: "http://www3.hilton.com/resources/media/hi/AUSCVHH/en_US/img/shared/full_page_image_gallery/main/HH_presidentialparlor10_24_1270x560_FitToBoxSmallDimension_Center.jpg",
  address: "500 E 4th St, Austin, TX 78701",
  rating: "★★★★☆"
}];

export {hotels};

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = hotels;
  }

  render() {
    return (
    	<div>
    		<Container>
	    		<Row>
	      			<h1>Hotels </h1>
	      		</Row>
      		</Container>
      		<Container>
      			<Row>
      				<Col>
      					<HotelCard hotel={this.state[0]}/>
      				</Col>
      				<Col>
      					<HotelCard hotel={this.state[1]}/>
      				</Col>
      				<Col>
      					<HotelCard hotel={this.state[2]}/>
      				</Col>
      			</Row>
      		</Container>
      	</div>
    );
  }
}