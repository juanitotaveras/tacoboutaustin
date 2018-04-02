import React, { Component } from 'react';
import { Input, InputGroup, Button, Container, Row, Jumbotron, Col } from 'reactstrap';
import {Restaurant} from './Restaurants';
// import Restaurants from './Restaurants';
import RestaurantCard from './RestaurantCard';
import {Hotel} from './Hotels';
import HotelCard from './HotelCard';
import {Attraction} from './Attractions';
import AttractionCard from './AttractionCard';
import './App.css';
import { api_url } from './config';

// var restaurants = [Restaurant('address', 'id', 'image', 'name', 'rating')];
var restaurants = [];
var hotels = [];
var attractions = [];
var res_count = 0;
export default class Search extends Component {


	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.onChange = this.onChange.bind(this);

	}
	fillInRestaurants(responseText) {
      let restaurants_parsed = JSON.parse(responseText)["list"];
      let i = 0;
      for (let r of restaurants_parsed) {
      	if (i < 4)
        	restaurants.push(new Restaurant(r["address"], r["id"], r["image"], r["name"], r["rating"]));
        ++i;
      }
      res_count += restaurants_parsed.length;  
    }

    fillInHotels(responseText) {
      let hotels_parsed = JSON.parse(responseText)["list"];
      let i = 0;
      for (let h of hotels_parsed) {
      	if (i < 4)
        	hotels.push(new Hotel(h["address"], h["id"], h["image"], h["name"], h["rating"]));
        ++i;
      } 
    }

    fillInAttractions(responseText) {
      let attractions_parsed = JSON.parse(responseText)["list"];
      let i = 0;
      for (let a of attractions_parsed) {
      	if (i < 4)
       		attractions.push(new Attraction(a["address"], a["id"], a["image"], a["name"], a["rating"]));
       	++i;
      }
    } 
    

    request(url, parseResponse) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          parseResponse(xmlHttp.responseText);
      }
      xmlHttp.open("GET", url, false) // true for asynchronous
      xmlHttp.send(null);
    }

	onChange(event) {
		console.log(event.target.value);
		this.setState({value: event.target.value});

		// TODO: CALL API AND GET RESULTS
		const urls = ["/restaurants", "/hotels", "/attractions"].map((elem) => api_url + elem);

    	this.request(urls[0], this.fillInRestaurants);
    	// this.request(urls[1], this.fillInHotels);
    	// this.request(urls[2], this.fillInAttractions);




	}

	componentDidMount() {

		

	}

	render() {
		  var restaurantCards = restaurants.map(function(restaurant) {
            return <Col xs="12" sm="6" md="6" lg="3"><RestaurantCard restaurant={restaurant} /></Col>;
          });
          var hotelCards = hotels.map(function(hotel) {
            return <Col xs="12" sm="6" md="6" lg="3"><HotelCard restaurant={hotel} /></Col>;
          });
          var attractionCards = attractions.map(function(attraction) {
            return <Col xs="12" sm="6" md="6" lg="3"><HotelCard restaurant={attraction} /></Col>;
          });
		return(
			<div>
				<Container>
					<Row>	
						<h1>Search</h1>
					</Row>
					<Row>
						<InputGroup>
			               {/* <i class="fas fa-search" style={styles}></i>*/}
			                <Input type="text" onChange={this.onChange} value={this.state.value} placeholder="Search something..." />
			                <Button color="secondary">Search!</Button>
			              </InputGroup>
		            </Row>
		            <br/>
		            <Row>
			            <div className="searchDiv">
			            	<h1> Restaurants</h1>
							        <Row>
							        	{restaurantCards}
							        </Row>
			            </div>

		            </Row>
		            <br/>
		            <Row>
			            <div className="searchDiv">
			            	<h1> Hotels</h1>
							        <Row>
							        	{hotelCards}
							        </Row>
			            </div>

		            </Row>
		            <br/>
		           	<Row>
			            <div className="searchDiv">
			            	<h1> Attractions</h1>
							        <Row>
							        	{attractionCards}
							        </Row>
			            </div>

		            </Row>
	         	</Container>
	        </div>
		);
	}

}