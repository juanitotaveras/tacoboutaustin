import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RestaurantJumbotron from './RestaurantJumbotron'
import PropTypes from 'prop-types';
import { restaurants } from './Restaurants'
import { Link } from 'react-router-dom';

export default class RestaurantDetails extends Component {
	render()
	{
		var id = this.props.match.params.res_id;
		var r = restaurants[parseInt(id)];
		return (
			<Container>
				<Row>
					<Col sm="12">
					<h1>Restaurant Details</h1>
					</Col>
					<Col>
                		<RestaurantJumbotron
                		name={r.name}
                		rating={r.rating}
                		foodtype={r.food}
                		image={r.image}
                		map="http://texspine.com/wp-content/uploads/2012/01/map.jpg"
                		hours={r.hours}
                		reviews={r.reviews}
                		/>
              		</Col>
				</Row>
				<Row>
					<h1>Nearby things!</h1>
				</Row>
				<Row>
					<h2><Link to='/hotels'>Hotels!</Link></h2>
				</Row>
				<Row>
					<h2><Link to='/attractions'>Attractions!</Link></h2>
				</Row>
			</Container>
		);
	}

}
