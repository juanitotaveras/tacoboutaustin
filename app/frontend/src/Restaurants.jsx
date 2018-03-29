import React, { Component } from 'react';
import search from './assets/search.png';
import './App.css';
import RestaurantCard from './RestaurantCard';
import { Container, Row, Col, Input, InputGroup, 
  InputGroupAddon, Button, Pagination, PaginationItem, 
  PaginationLink } from 'reactstrap';
import { api_url } from './config';

var restaurants = [];
var restaurants_display = [];
var res_count = 0;
var per_page = 20;

const styles = {
    fontSize: "24px"
  }; 

export class Restaurant {
  constructor(address, id, image, name, rating) {
    this.address = address;
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating = rating;
  }
}

export default class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {onPage: 1};
  }

  getInitialState() {
    return {
      onPage: 1
    }
  }

  componentWillMount() {
    function fillInRestaurants(responseText) {
      console.log(responseText);
      let restaurants_parsed = JSON.parse(responseText)["list"];
      for (let r of restaurants_parsed) {
        restaurants.push(new Restaurant(r["address"], r["id"], r["image"], r["name"], r["rating"]));
      }

      res_count = restaurants_parsed.length;  
    }
    
    const url = api_url + "/restaurants";

    function request(url, parseResponse) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          parseResponse(xmlHttp.responseText);
      }
      xmlHttp.open("GET", url, false) // true for asynchronous
      xmlHttp.send(null);
    }

    request(url, fillInRestaurants);
  }

  componentWillUnmount() {
    restaurants = [];
  }

  handleClick(pageNum) {
    this.setState({
      onPage: pageNum
    });
  }

  render() {
    const page_numbers = [];
    for(var i = 1; i <= (res_count/per_page) + 1; i++)
      page_numbers.push(i);

    var s = this.state.onPage;
    // TODO: request the stuff?

    var cards = restaurants.map(function(restaurant) {
            return <Col xs="12" sm="6" md="6" lg="3"><RestaurantCard restaurant={restaurant} /></Col>;
          })

    var pages = page_numbers.map((pageNum) => {
      return <li onClick={() => this.handleClick(pageNum)}><PaginationItem><PaginationLink>{pageNum}</PaginationLink></PaginationItem></li>;
    })

    return (
    	<div>
    		<Container>
            <Row>
              <Col>
	      			  <h1>Restaurants </h1>
              </Col>
      			</Row>
            <Row>
                {cards}
      			</Row>
            <Row>
              <Col sm="5"></Col>
              <Col>
                <Pagination size="lg">
                  <PaginationItem disabled>
                    <PaginationLink previous href="#" />
                  </PaginationItem>
                    {pages}
                </Pagination>
              </Col>
            </Row>
      		</Container>
      	</div>
    );
  }
}