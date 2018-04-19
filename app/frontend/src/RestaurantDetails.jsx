import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RestaurantJumbotron from './RestaurantJumbotron';
import HotelCard from './HotelCard';
import AttractionCard from './AttractionCard';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { api_url } from "./config";
import Header from './Header';

var rDetails = {};
var nearbyHotels = [];
var nearbyAttractions = [];
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
		        	nearbyAttractions.push(attraction);
		        }

		        for(let hotel of hotels) {
		        	nearbyHotels.push(hotel);
		        }

		        rDetails = restaurant;
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
		nearbyHotels = [];
		nearbyAttractions = [];
	}

	buildMapSrc() {
		if(redirect == false) {
			var address = rDetails.address[0] + " " + rDetails.address[1];
			var s = "https://www.google.com/maps/embed/v1/place?q=" + encodeURI(address) + "&key=AIzaSyD7QCCYdGEGvI3J74sDAwqJbaWieKC6V2k";
		}
		return s;
	}

	parseCategories() {
		var categories = rDetails["categories"];
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
		var nearbyHotelCards = nearbyHotels.map(function(hotel){
		            return <Col xs="12" sm="6" md="6" lg="3"><HotelCard hotel={hotel} /></Col>;
		          })
		var nearbyAttractionCards = nearbyAttractions.map(function(attraction){
		            return <Col xs="12" sm="6" md="6" lg="3"><AttractionCard attraction={attraction} /></Col>;
		          })

		var map = this.buildMapSrc();
		var categories = this.parseCategories();

		return (
			<div className="background">
        	<Header image={rDetails.images[0]}/>
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
	                		name={rDetails.name}
			        		images={rDetails.images}
			        		map_src={map}
			        		hours={rDetails.hours}
			        		rating={rDetails.rating}
			        		reviews={rDetails.reviews}
			        		phone={rDetails.phone}
			        		categories={categories}
	                		/>
	              		</Col>
					</Row>
						<h1>Nearby things</h1>
						<h2> Hotels </h2>
					<Row>
						{nearbyHotelCards}
					</Row>
						<h2> Attractions </h2>
					<Row>
						{nearbyAttractionCards}
					</Row></div>
				}
				
			</Container>
			</div>
		);
	}

}
