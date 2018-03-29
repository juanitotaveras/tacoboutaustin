import React, { Component } from 'react';
import { Input, InputGroup, Button, Container, Row, Jumbotron, Col } from 'reactstrap';
import {Restaurant} from './Restaurants';
import Restaurants from './Restaurants';
import RestaurantCard from './RestaurantCard';
import HotelCard from './HotelCard';
import AttractionCard from './AttractionCard';
import './App.css';

// var restaurants = [Restaurant('address', 'id', 'image', 'name', 'rating')];
var restaurants = [];
var hotels = [];
var attractions = [];
export default class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.onChange = this.onChange.bind(this);

	}
	onChange(event) {
		console.log(event.target.value);
		this.setState({value: event.target.value});

		// TODO: CALL API AND GET RESULTS

	}

	componentDidMount() {
		let r = new Restaurants; // Resturant Page
		

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