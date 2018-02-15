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
                		activitytype={a.type}
                		image={a.image}
                		map="http://texspine.com/wp-content/uploads/2012/01/map.jpg"
                		/>
              		</Col>
				</Row>
				<Row>
					<h1>Nearby things!</h1>
				</Row>
				<Row>
					<Link to='/hotels'>Hotels!</Link>
				</Row>
				<Row>
					<Link to='/restaurants'>Restaurants!</Link>
				</Row>
			</Container>
		);
	}

}