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
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

  getPage(pageNum, sortParam, fil, changedFilters) {
    var page_url = api_url + "/restaurants?page=";

    page_url += pageNum;

    // Sorting doesn't require recalculating page numbers
    if(sortParam != null)
    {
      if (sortParam == "name") 
        page_url += "&order_by=name&order=asc";
      else
        page_url += "&order_by=rating&order=desc";
    }

    var count_url = "";

    // Must recalculate page numbers
    if (fil != null) {
      if(fil.rating != 0) {
        if (changedFilters == true) {
          count_url += api_url + "/restaurants?filter_by=rating&rating=" + fil.rating;
          this.request(count_url, this.getCount);
        }
        page_url += "&filter_by=rating&rating=" + fil.rating;
      } 

      else if(fil.zipcode != 0) {

      } 

      else if(fil.open == true) {
        var timeString = this.getDateString();

        if (changedFilters != null) {
          count_url += count_url == "" ? api_url + "/restaurants?filter_by=open_hour&time=" + timeString : "&filter_by=open_hour&time=" + timeString;
          this.request(count_url, this.getCount);
        }
        page_url += "&filter_by=open_hour&time=" + timeString;
      } 

      else if(changedFilters == true) {
          // Unapply all filters
          var count_url = api_url + "/restaurants";
          this.request(count_url, this.getCount);
      }
    }

    this.request(page_url, this.fillInRestaurants);
    this.setState({
      onPage: pageNum,
      sorted: sortParam,
      filters: fil
    });
  }

  filterPage(filters) {
    this.getPage(1, null, filters, true);
  }

  sortPage(category) {
    this.getPage(1, category, this.state.filters, false);
  }

  handlePageClick(pageNum) {
    this.getPage(pageNum, this.state.sorted, this.state.filters, false);
  }

  render() {
    const page_numbers = [];
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
                  <Filter handler={this.filterPage}/>
                  <br />
                  <Sort handler={this.sortPage}/>
                </Col>
                <Col><Container>{cards}</Container></Col>
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