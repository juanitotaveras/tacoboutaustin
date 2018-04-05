import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import HotelJumbotron from './HotelJumbotron';
import RestaurantCard from './RestaurantCard';
import AttractionCard from './AttractionCard';
import { Link, Redirect } from 'react-router-dom';
import { api_url } from './config'; 


var h_details = {};
var nearby_restaurants = [];
var nearby_attractions = [];
var redirect = false;

export default class HotelDetails extends Component {

	componentWillMount() {
		function parseData(responseText) {
			if(JSON.parse(responseText)["status"] === "INVALID_ID") {
          		redirect = true;
        	} 
        	else {
        		let hotel = JSON.parse(responseText)["hotel"];
		      	let attractions = JSON.parse(responseText)["close_by_attractions"];
		        let restaurants = JSON.parse(responseText)["close_by_restaurants"];

		        for (let a of attractions) {
		        	nearby_attractions.push(a);
		        }

		        for(let r of restaurants) {
		        	nearby_restaurants.push(r);
		        }

		        h_details = hotel;
        	}	
      	}

        const url = api_url + "/hotels/" + this.props.match.params.hot_id;

    	function request(url, parseResponse) {
      		var xmlHttp = new XMLHttpRequest();
      		xmlHttp.onreadystatechange = function() {
        		if (xmlHttp.readyState == 4) 
          			parseResponse(xmlHttp.responseText);
      		}
      		xmlHttp.open("GET", url, false) // true for asynchronous
      		xmlHttp.send(null);
    	}

    	request(url, parseData);
    	 window.scroll(0, 0);
	}

	componentWillUnmount() {
		nearby_restaurants = [];
		nearby_attractions = [];
	}

	buildMapSrc() {
		if(redirect == false) {
			var address = h_details.address[0]; // + " " + h_details.address[1];
			var s = "https://www.google.com/maps/embed/v1/place?q=" + encodeURI(address) + "&key=AIzaSyD7QCCYdGEGvI3J74sDAwqJbaWieKC6V2k";
		}
		return s;
	}

	render(props)
	{
		var nearby_restaurant_cards = nearby_restaurants.map(function(restaurant){
		            return <Col xs="12" sm="6" md="6" lg="3"><RestaurantCard restaurant={restaurant} /></Col>;
		          })
		var nearby_attraction_cards = nearby_attractions.map(function(attraction){
		            return <Col xs="12" sm="6" md="6" lg="3"><AttractionCard attraction={attraction} /></Col>;
		          })

		var map = this.buildMapSrc();

		return (
			<Container>
				{
          			redirect == true &&
          			<Redirect to="/badURL" />
        		}
        		{
        			redirect == false &&
        			<div><Row>
						<Col>
	                		<HotelJumbotron
	                		name={h_details.name}
			        		images={h_details.images}
			        		map_src={map}
			        		rating={h_details.rating}
			        		reviews={h_details.reviews}
	                		/>
	              		</Col>
					</Row>
						<h1>Nearby things</h1>
						<h2> Restaurants </h2>
					<Row>
						{nearby_restaurant_cards}
					</Row>
						<h2> Attractions </h2>
					<Row>
						{nearby_attraction_cards}
					</Row></div>
        		}
				
			</Container>
		);
	}

}