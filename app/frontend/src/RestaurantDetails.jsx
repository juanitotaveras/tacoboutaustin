import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RestaurantJumbotron from './RestaurantJumbotron';
import HotelCard from './HotelCard';
import AttractionCard from './AttractionCard';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { api_url } from "./config";
import Header from './Header';

var r_details = {};
var nearby_hotels = [];
var nearby_attractions = [];
var redirect = false;

export default class RestaurantDetails extends Component {

	componentWillMount() {
		function parseData(responseText) {
			if(JSON.parse(responseText)["status"] === "INVALID_ID") {
				redirect = true;
			}

			else {
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
      	}
        window.scroll(0, 0);

        const url = api_url + "/restaurants/" + this.props.match.params.res_id;

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
	}

	componentWillUnmount() {
		nearby_hotels = [];
		nearby_attractions = [];
	}

	buildMapSrc() {
		if(redirect == false) {
			// var address = r_details["location"]["lat"] + "," + r_details["location"]["long"];
			var address = r_details.address[0] + " " + r_details.address[1];
			var s = "https://www.google.com/maps/embed/v1/place?q=" + encodeURI(address) + "&key=AIzaSyD7QCCYdGEGvI3J74sDAwqJbaWieKC6V2k";
		}
		return s;
	}

	parseCategories() {
		var categories = r_details["categories"];
		var s = "";
		for (var i = 0; i < categories.length; i++) {
			if(i == categories.length-1)
				s += categories[i]["name"];
			else
				s += categories[i]["name"] + ", ";
		}
		return s;
	}

	render()
	{
		var nearby_hotel_cards = nearby_hotels.map(function(hotel){
		            return <Col xs="12" sm="6" md="6" lg="3"><HotelCard hotel={hotel} /></Col>;
		          })
		var nearby_attraction_cards = nearby_attractions.map(function(attraction){
		            return <Col xs="12" sm="6" md="6" lg="3"><AttractionCard attraction={attraction} /></Col>;
		          })

		var map = this.buildMapSrc();
		var categories = this.parseCategories();

		return (
			<div className="background">
        	<Header title={r_details.name} description={"Rating: " + r_details.rating + "/5"}/>
        	<br />
			<Container>
				{
					redirect == true &&
					<Redirect to="/badURL" />
				}
				{
					redirect == false &&
					<div><Row>
						<Col>
	                		<RestaurantJumbotron
	                		name={r_details.name}
			        		images={r_details.images}
			        		map_src={map}
			        		hours={r_details.hours}
			        		rating={r_details.rating}
			        		reviews={r_details.reviews}
			        		phone={r_details.phone}
			        		categories={categories}
	                		/>
	              		</Col>
					</Row>
						<h1>Nearby things</h1>
						<h2> Hotels </h2>
					<Row>
						{nearby_hotel_cards}
					</Row>
						<h2> Attractions </h2>
					<Row>
						{nearby_attraction_cards}
					</Row></div>
				}
				
			</Container>
			</div>
		);
	}

}
