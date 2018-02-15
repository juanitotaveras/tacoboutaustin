import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import HotelJumbotron from './HotelJumbotron';
import { hotels } from './Hotels';
import { Link } from 'react-router-dom';

export default class HotelDetails extends Component {
	render(props)
	{
		var id = this.props.match.params.hot_id;
		var h = hotels[parseInt(id)];
		return (
			<Container>
				<Row>
					<Col sm="12">
					<h1>Hotel Details</h1>
					</Col>
					<Col>
                		<HotelJumbotron
                		name={h.name}
                		address={h.address}
                		image={h.image}
                		map="http://texspine.com/wp-content/uploads/2012/01/map.jpg"
                		amenities={h.amenities}
                		rating={h.rating}
                		reviews={h.reviews}
                		/>
              		</Col>
				</Row>
				<Row>
					<h1>Nearby things!</h1>
				</Row>
				<Row>
					<h2><Link to='/restaurants'>Restaurants!</Link></h2>
				</Row>
				<Row>
					<h2><Link to='/attractions'>Attractions!</Link></h2>
				</Row>
			</Container>
		);
	}

}