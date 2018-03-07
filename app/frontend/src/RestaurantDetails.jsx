import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RestaurantJumbotron from './RestaurantJumbotron';
import HotelCard from './HotelCard';
import AttractionCard from './AttractionCard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

var r_details = {};
var nearby_hotels = [];
var nearby_attractions = [];

export default class RestaurantDetails extends Component {

	componentWillMount() {
		function parseData(responseText) {
			let restaurant = JSON.parse(responseText)["restaurant"];
	      	let attractions = JSON.parse(responseText)["close_by_attractions"];
	        let hotels = JSON.parse(responseText)["close_by_hotels"];

	        for (let attraction of attractions) {
	        	nearby_attractions.push(attraction);
	        }

	        for(let hotel of hotels) {
	        	nearby_hotels.push(hotel);
	        }

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

	componentWillUnmount() {
		nearby_hotels = [];
		nearby_attractions = [];
	}

	render()
	{
		var nearby_hotel_cards = nearby_hotels.map(function(hotel){
		            return <Col xs="12" sm="6" md="6" lg="3"><HotelCard hotel={hotel} /></Col>;
		          })
		var nearby_attraction_cards = nearby_attractions.map(function(attraction){
		            return <Col xs="12" sm="6" md="6" lg="3"><AttractionCard attraction={attraction} /></Col>;
		          })

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
				<h1>Nearby things!</h1>
				<h2> Hotels </h2>
				<Row>
					{nearby_hotel_cards}
				</Row>
				<h2> Attractions </h2>
				<Row>
					{nearby_attraction_cards}
				</Row>
			</Container>
		);
	}

}
