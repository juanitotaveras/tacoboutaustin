import React, { Component } from 'react';
import search from './assets/search.png';
import './App.css';
import RestaurantCard from './RestaurantCard';
import RestaurantFilter from './RestaurantFilter';
import Header from './Header';
import Sort from './Sort';
import { Container, Row, Col, Button,
  Form, FormGroup, CardColumns } from 'reactstrap';
import { api_url } from './config';
import Paginator from './Paginator';
import HeaderBackground from './assets/restaurants_header_background.jpg';

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
    this.handlePageClick = this.handlePageClick.bind(this);
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
        // console.log("REPONSE " + xmlHttp.responseText);
      }
      xmlHttp.open("GET", url, false) // true for asynchronous
      xmlHttp.send(null);
  }

  getDateString() {
    var d = new Date();
    var hour = d.getHours();
    var day = d.getDay(); 
    var timeString = days[day] + ",";
    timeString += hour + ":00"
    return timeString;
  }


  getPage(pageNum, sortParam, fils) {
    var apiParams = [];
    var url = api_url + "/restaurants?";

    // Sorting
    if(sortParam != '')
    {
      if (sortParam == "name_asc") {
        apiParams.push("order_by=name");
        apiParams.push("order=asc");
      }
      else if(sortParam == "name_desc") {
        apiParams.push("order_by=name");
        apiParams.push("order=desc");
      } 
      else if(sortParam == "rating_desc") {
        apiParams.push("order_by=rating");
        apiParams.push("order=desc");
      }
      else if(sortParam == "rating_asc") {
        apiParams.push("order_by=rating");
        apiParams.push("order=asc");
      }
    }

    // Apply filters
    if(fils != null) {
      if(fils.rating != 0) {
        apiParams.push("rating=" + fils.rating);
      }
      if(fils.selectedZipcodes != '') {
        apiParams.push("zipcode=" + fils.selectedZipcodes);
      }
      if(fils.open == true) {
        var timeString = this.getDateString();
        apiParams.push("time=" + timeString);
      }
      if(fils.selectedCategories != '') {
        apiParams.push("categories=" + fils.selectedCategories);
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
    document.getElementById('jump').scrollIntoView();
    this.getPage(pageNum, this.state.sorted, this.state.filters);
  }

  render() {
    var pages_count = Math.floor(res_count/per_page);
    if (!((res_count%per_page) == 0))
      pages_count++;

    var cards = this.state.restaurants_display.map(function(restaurant) {
            return <RestaurantCard restaurant={restaurant} />;
          })

    return (
    	<div className="background">
        <Header
          title="Restaurants"
          description="Restaurants description"
          image={HeaderBackground}
        />
        <br />
    		<Container id="jump">
            <Col xs="12" md="2">
              <RestaurantFilter handler={this.filterPage}/>
              <br />
              <Sort handler={this.sortPage}/>
            </Col>
            <Row>
            <CardColumns>
            {
              res_count > 0 &&
              cards
            }
            {
              res_count == 0 &&
              <h1>No results found.</h1>
            }
            </CardColumns>
            </Row>

            <Paginator pageCount={pages_count} activePage={this.state.onPage} onPageClicked={this.handlePageClick} />
      	</Container>
      </div>
    );
  }
}