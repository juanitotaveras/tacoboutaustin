import React, { Component } from 'react';
import search from './assets/search.png';
import './App.css';
import RestaurantCard from './RestaurantCard';
import RestaurantFilter from './RestaurantFilter';
import Sort from './Sort';
import { Container, Row, Col, Button, Pagination, PaginationItem, 
  PaginationLink, Form, FormGroup } from 'reactstrap';
import { api_url } from './config';

var res_count = 0;
const per_page = 12;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export class Restaurant {
  constructor(address, id, image, name, rating, zip_code) {
    this.address = address;
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating = rating;
    this.zip_code = zip_code;
  }
}

export default class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.sortPage = this.sortPage.bind(this)
    this.filterPage = this.filterPage.bind(this)
    this.fillInRestaurants = this.fillInRestaurants.bind(this)
    this.state = {
      onPage: 1,
      restaurants_display: [],
      sorted: null,
      filters: {
        rating: 0,
        zipcode: 0,
        open: false
      }
    };
  }

  componentWillMount() {
    const url = api_url + "/restaurants";
    this.request(url, this.getCount);
    this.getPage(1, null, null, false);
  }

  fillInRestaurants(responseText) {
      var temp_restaurants = [];
      let restaurants_parsed = JSON.parse(responseText)["list"];
      for (let r of restaurants_parsed) {
        temp_restaurants.push(new Restaurant(r["address"], r["id"], r["image"], r["name"], r["rating"], r["zip_code"]));
      }
      this.setState({
        restaurants_display: temp_restaurants
      });
  }

  getCount(responseText) {
      res_count = JSON.parse(responseText)["total"];
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

  getDateString() {
    var d = new Date();
    var hour = d.getHours();
    var day = d.getDay(); 
    var timeString = days[day] + ",";
    if(hour / 12 >= 1) {
      timeString += hour == 12 ? 12 : hour % 12;
      timeString += ":00,PM";
    } else {
      timeString += hour + ":00,AM";
    }

    return timeString;
  }


  getPage(pageNum, sortParam, fils) {
    var apiParams = [];
    var url = api_url + "/restaurants?";

    // Sorting
    if(sortParam != null)
    {
      if (sortParam == "name") {
        apiParams.push("order_by=name");
        apiParams.push("order=asc");
      }
      else {
        apiParams.push("order_by=rating");
        apiParams.push("order=desc");
      }
    }

    // Apply filters
    if(fils != null) {
      if(fils.rating != 0) {
        apiParams.push("rating=" + fils.rating);
      }
      if(fils.zipcode != 0) {
        apiParams.push("zipcode=" + fils.zipcode);
      }
      if(fils.open == true) {
        var timeString = this.getDateString();
        apiParams.push("time=" + timeString);
      }
    }

    const count_url = url + apiParams.join("&");
    const page_url = count_url + "&page=" + pageNum;

    this.request(count_url, this.getCount);
    this.request(page_url, this.fillInRestaurants);
    this.setState({
      onPage: pageNum,
      sorted: sortParam,
      filters: fils
    });
  }


  filterPage(filters) {
    this.getPage(1, this.state.sorted, filters);
  }

  sortPage(category) {
    this.getPage(1, category, this.state.filters);
  }

  handlePageClick(pageNum) {
    this.getPage(pageNum, this.state.sorted, this.state.filters);
  }

  render() {
    var page_numbers = [];
    const pages_count = (res_count%per_page) == 0 ? res_count/per_page : res_count/per_page + 1;
    for(var i = 1; i <= pages_count; i++)
      page_numbers.push(i);

    var cards = this.state.restaurants_display.map(function(restaurant) {
            return <Col xs="6" sm="4"><RestaurantCard restaurant={restaurant} /></Col>;
          })

    var pages = page_numbers.map((pageNum) => {
      return <li onClick={() => this.handlePageClick(pageNum)}><PaginationItem><PaginationLink>{pageNum}</PaginationLink></PaginationItem></li>;
    })

    return (
    	<div>
    		<Container>
            <Row>
                <Col><h1>Restaurants</h1></Col>
      			</Row>
            <Row>
                <Col xs="2">
                  <RestaurantFilter handler={this.filterPage}/>
                  <br />
                  <Sort handler={this.sortPage}/>
                </Col>
                <Col><Container>
                {
                  res_count > 0 &&
                  cards
                }
                {
                  res_count == 0 &&
                  <h1>No results found.</h1>
                }
                </Container></Col>
            </Row>
            <Row>
                <Col sm="5"></Col>
                <Col><Pagination size="lg">{pages}</Pagination></Col>
            </Row>
      	</Container>
      </div>
    );
  }
}