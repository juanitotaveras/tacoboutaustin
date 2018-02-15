import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AttractionJumbotron from './AttractionJumbotron'
import PropTypes from 'prop-types';
import { attractions } from './Attractions'
import { Link } from 'react-router-dom';

export default class AttractionsDetails extends Component {
	render()
	{
		var id = this.props.match.params.att_id;
		var a = attractions[parseInt(id)];
		return (
			<Container>
				<Row>
					<Col sm="12">
					<h1>Attractions Details</h1>
					</Col>
					<Col>
                		<AttractionJumbotron
                		name={a.name}
                		activitytype={a.activitytype}
                		image={a.image}
                		map="http://texspine.com/wp-content/uploads/2012/01/map.jpg"
                		hours={a.hours}
                		rating={a.rating}
                		reviews={a.reviews}
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
					<h2><Link to='/restaurants'>Restaurants!</Link></h2>
				</Row>
			</Container>
		);
	}

}