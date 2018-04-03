import React, { Component } from 'react';
import search from './assets/search.png';
import './App.css';
import RestaurantCard from './RestaurantCard';
import Filter from './Filter';
import Sort from './Sort';
import { Container, Row, Col, Button, Pagination, PaginationItem, 
  PaginationLink, Form, FormGroup } from 'reactstrap';
import { api_url } from './config';

var res_count = 0;
var per_page = 12;

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
    this.sortPage = this.sortPage.bind(this)
    this.fillInRestaurants = this.fillInRestaurants.bind(this)
    this.state = {
      onPage: 1,
      restaurants_display: [],
      sorted: null
    };
  }

  componentWillMount() {
    function getCount(responseText) {
      res_count = JSON.parse(responseText)["total"];
    }
    
    const url = api_url + "/restaurants";
    this.request(url, getCount);
    this.getPage(1);
  }

  fillInRestaurants(responseText) {
      var temp_restaurants = [];
      let restaurants_parsed = JSON.parse(responseText)["list"];
      for (let r of restaurants_parsed) {
        temp_restaurants.push(new Restaurant(r["address"], r["id"], r["image"], r["name"], r["rating"]));
      }
      this.setState({
        restaurants_display: temp_restaurants
      });
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

  getPage(pageNum, sortParam, changedCategory) {
    var page_url = api_url + "/restaurants?page=";

    if(changedCategory)
      page_url += 1;
    else 
      page_url += pageNum;

    if(sortParam != null)
    {
      if (sortParam == "name") 
        page_url += "&order_by=name&order=asc";
      else
        page_url += "&order_by=rating&order=desc";
    }

    this.request(page_url, this.fillInRestaurants);
    this.setState({
      onPage: pageNum,
      sorted: sortParam
    });
  }

  sortPage(category) {
    this.getPage(this.state.pageNum, category, true)
  }

  handleClick(pageNum) {
    this.getPage(pageNum, this.state.sorted, false);
  }

  render() {
    const page_numbers = [];
    for(var i = 1; i <= (res_count/per_page) + 1; i++)
      page_numbers.push(i);

    var cards = this.state.restaurants_display.map(function(restaurant) {
            return <Col xs="6" sm="4"><RestaurantCard restaurant={restaurant} /></Col>;
          })

    var pages = page_numbers.map((pageNum) => {
      return <li onClick={() => this.handleClick(pageNum)}><PaginationItem><PaginationLink>{pageNum}</PaginationLink></PaginationItem></li>;
    })

    return (
    	<div>
    		<Container>
            <Row>
                <Col>
  	      			  <h1>Restaurants</h1>
                </Col>
      			</Row>
            <Row>
                <Col xs="2">
                  <Filter />
                  <Sort handler={this.sortPage}/>
                </Col>
                <Col>
                  <Container>
                      {cards}
            			</Container>
                </Col>
            </Row>
            <Row>
                <Col sm="5"></Col>
                <Col>
                  <Pagination size="lg">
                      {pages}
                  </Pagination>
                </Col>
            </Row>
      		</Container>
      	</div>
    );
  }
}