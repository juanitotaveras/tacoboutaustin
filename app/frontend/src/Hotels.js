import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import HotelCard from './HotelCard';


export default class Hotels extends Component {
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
      					<HotelCard
                id="1"
                name="Omni Austin Hotel Downtown"
                image="https://www.omnihotels.com/-/media/images/hotels/ausctr/pool/ausctr-omni-austin-hotel-downtown-evening-pool.jpg"
                address="700 San Jacinto Blvd, Austin, TX 78701"
                rating="★★★★★"
                />
      				</Col>
      				<Col>
      					<HotelCard
                id="2"
                name="Kimpton Hotel Van Zandt"
                image="http://www.hotelvanzandt.com/images/1700-960/hvz-gr-014-7b48dcc2.jpg"
                address="605 Davis St, Austin, TX 78701"
                rating="★★★★☆"
                />
      				</Col>
      				<Col>
      					<HotelCard
                id="3"
                name="Hilton Austin"
                image="http://www3.hilton.com/resources/media/hi/AUSCVHH/en_US/img/shared/full_page_image_gallery/main/HH_presidentialparlor10_24_1270x560_FitToBoxSmallDimension_Center.jpg"
                address="500 E 4th St, Austin, TX 78701"
                rating="★★★★☆"
                />
      				</Col>
      			</Row>
      		</Container>
      	</div>
    );
  }
}