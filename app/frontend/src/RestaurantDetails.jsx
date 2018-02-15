import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RestaurantJumbotron from './RestaurantJumbotron'
import PropTypes from 'prop-types';

export default class RestaurantDetails extends Component {
	render()
	{
		return(
			<Container>
				<Row>
					<Col sm="12">
					<h1>Restaurant Details</h1>
					</Col>
					<Col>
                		<RestaurantJumbotron
                		name="Franklin BBQ"
                		foodtype="Barbecue Restauant"
                		image="https://static01.nyt.com/images/2017/03/15/dining/15REST-FRANKLIN-slide-HMM7/15REST-FRANKLIN-slide-HMM7-videoSixteenByNineJumbo1600.jpg"
                		map="http://texspine.com/wp-content/uploads/2012/01/map.jpg"
                		/>
              		</Col>
				</Row>
			</Container>
		);
	}

}