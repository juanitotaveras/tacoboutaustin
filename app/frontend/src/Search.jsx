import React, { Component } from 'react';
import { Input, InputGroup, Button, Container, Row, Jumbotron, Col, Pagination, PaginationItem, 
	PaginationLink  } from 'reactstrap';
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
let per_page = 21;
let per_category = 7;


export default class Search extends Component {


	constructor(props) {
		super(props);
		this.state = {
			value: '', 
			onPage: 0,
			displayedRestaurants: [],
			displayedHotels: [],
			displayedAttractions: [],
			hasSearched: false};

			this.onChange = this.onChange.bind(this);
			this.onSearch = this.onSearch.bind(this);

		}

		handlePageClick(pageNum) {
			this.setState({
				onPage: pageNum,
				done_loading: false
			});

			this.showSearchItems(pageNum);
		}
		fillInRestaurants(responseText) {
		// console.log("RESPONSE: " + responseText);
		let restaurants_parsed = JSON.parse(responseText)["list"];
		for (let r of restaurants_parsed) {
			restaurants.push(new Restaurant(r["address"], r["id"], r["image"], r["name"], r["rating"]));
		}
	}

	fillInHotels(responseText) {
		let hotels_parsed = JSON.parse(responseText)["list"];
		for (let h of hotels_parsed) 
			hotels.push(new Hotel(h["address"], h["id"], h["image"], h["name"], h["rating"]));
	}

	fillInAttractions(responseText) {
		let attractions_parsed = JSON.parse(responseText)["list"];
		for (let a of attractions_parsed) 
			attractions.push(new Attraction(a["address"], a["id"], a["image"], a["name"], a["rating"]));
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
  	this.setState({value: event.target.value});
  }

  showSearchItems(pageNum) {
  	// TODO: Try to display equal number of results for each
  	// maybe like 7 for each

  	let idx = pageNum * per_category;
  	this.setState({
  		displayedRestaurants: restaurants.slice(idx, idx+per_category),
  		displayedHotels: hotels.slice(idx, idx+per_category),
  		displayedAttractions: attractions.slice(idx, idx+per_category),
  		hasSearched: true
  	});
  }

  enterPressed(event) {
  	var code = event.keyCode || event.which;
	    if(code === 13) { //13 is the enter keycode
	        //Do stuff in here
	        this.onSearch(event);
	    } 
	}

	onSearch(event) {
		// ?search=TERM1,TERM2,TERM3   TERM4A+TERM4B
		event.preventDefault();

		if (this.state.hasSearched) {
			// clear current results
			restaurants = [];
			hotels = [];
			attractions = [];
		}

		let searchText = "?search=" + this.state.value.replace(" ", ",");

		const urls = ["/restaurants", "/hotels", "/attractions"].map((elem) => api_url + elem + searchText);
		this.request(urls[0], this.fillInRestaurants);
		this.request(urls[1], this.fillInHotels);
		this.request(urls[2], this.fillInAttractions);

		this.showSearchItems(0);
	}

	componentDidMount() {

		

	}


	render() {
		const searchBox = 
			<Row>
			<InputGroup>
			{/* <i class="fas fa-search" style={styles}></i>*/}
			<Input type="text" onChange={this.onChange} value={this.state.value} onKeyPress={this.enterPressed.bind(this)}
			placeholder="Search something..." />
			<Button color="secondary" onClick={this.onSearch}>Search!</Button>
			</InputGroup>
			</Row>;

	const page_numbers = [];
	let largestArrayLength = Math.max(restaurants.length, attractions.length, hotels.length);
	for(var i = 0; i <= (largestArrayLength/per_page) ; i++)
		page_numbers.push(i);

	console.log("PAGE COUNT: " + page_numbers.length + " RESPONSES: " + largestArrayLength);
	var restaurantCards = this.state.displayedRestaurants.map(function(restaurant) {
		return <Col xs="12" sm="6" md="6" lg="3"><RestaurantCard restaurant={restaurant} /></Col>;
	});

	const restaurantComponent = 
		<div><br/><Row>
		<div className="searchDiv">
		<h1> Restaurants</h1>
		<Row>
		{restaurantCards}
		</Row>
		</div>
		</Row>
		</div>;
	const hotelCards = this.state.displayedHotels.map(function(hotel) {
		return <Col xs="12" sm="6" md="6" lg="3"><HotelCard hotel={hotel} /></Col>;
	});

	const hotelComponent = 
		<div><br/><Row>
		<div className="searchDiv">
		<h1> Hotels</h1>
		<Row>
		{hotelCards}
		</Row>
		</div>
		</Row>
		</div>;
	const attractionCards = this.state.displayedAttractions.map(function(attraction) {
		return <Col xs="12" sm="6" md="6" lg="3"><AttractionCard attraction={attraction} /></Col>;
	});

	const attractionComponent = 
		<div><br/><Row>
		<div className="searchDiv">
		<h1> Attractions</h1>
		<Row>
		{attractionCards}
		</Row>
		</div>
		</Row></div>;
	var pages = page_numbers.map((pageNum) => {
		return <li onClick={() => this.handlePageClick(pageNum)}><PaginationItem><PaginationLink>{pageNum+1}</PaginationLink></PaginationItem></li>;
	});

	const paginationComponent = 
		<Row>
		<Col sm="5"></Col>
		<Col>
		<Pagination size="lg">
		<PaginationItem disabled>
		{/*<PaginationLink previous href="#" />*/}
		</PaginationItem>
		{pages}
		</Pagination>
		</Col>
		</Row>;

	if (this.state.hasSearched) {
		return(
			<div>
			<Container>
			<Row>	
			<h1>Search</h1>
			</Row>
			{searchBox}
			{restaurants.length > 0 &&
				restaurantComponent
			}
			{
				hotels.length > 0 &&
				hotelComponent
			}
			{
				attractions.length > 0 &&
				attractionComponent
			}
			{
				page_numbers.length > 1 &&
				paginationComponent
			}
			</Container>
			</div>
			);
	} else {
		return(							<div>
			<Container>
			<Row>	
			<h1>Search</h1>
			</Row>
			{searchBox}
			</Container>
			</div>
			);
	}

	}

}