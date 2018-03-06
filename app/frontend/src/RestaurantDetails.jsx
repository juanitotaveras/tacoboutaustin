import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RestaurantJumbotron from './RestaurantJumbotron'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

var r_details = {};

export default class RestaurantDetails extends Component {

	componentWillMount() {
		function parseData(responseText) {
			let restaurant = JSON.parse(responseText)["restaurant"];
	      	let attractions = JSON.parse(responseText)["close_by_attractions"];
	        let hotels = JSON.parse(responseText)["close_by_hotels"];

	        r_details = restaurant;
      	}

        const url = "http://localhost/api/restaurants/" + this.props.match.params.res_id;

    	function request(url, parseResponse) {
      		var xmlHttp = new XMLHttpRequest();
      		xmlHttp.onreadystatechange = function() {
        		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          			parseResponse(xmlHttp.responseText);
      		}
      		xmlHttp.open("GET", url, false) // true for asynchronous
      		xmlHttp.send(null);
    	}

    	request(url, parseData);
	}

	render()
	{
		var id = this.props.match.params.res_id;
		return (
			<Container>
				<Row>
					<Col sm="12">
					<h1>Restaurant Details</h1>
					</Col>
					<Col>
                		<RestaurantJumbotron
                		name={r_details.name}
		        		activitytype="poop activitytype"
		        		image={r_details.images[2]}
		        		map="http://texspine.com/wp-content/uploads/2012/01/map.jpg"
		        		hours="No hours"
		        		rating={r_details.rating}
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
