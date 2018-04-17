import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Button,
  Form, FormGroup } from 'reactstrap';
import HotelCard from './HotelCard';
import Header from './Header';
import { api_url } from './config';
import Sort from './Sort';
import Filter from './Filter';
import Paginator from './Paginator';

var hot_count = 0;
const per_page = 12;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export class Hotel {
  constructor(address, id, image, name, rating, zip_code) {
    this.address = address;
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating = rating;
    this.zip_code = zip_code;
  }
}

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.sortPage = this.sortPage.bind(this)
    this.filterPage = this.filterPage.bind(this)
    this.fillInHotels = this.fillInHotels.bind(this)
    this.state = {
      onPage: 0,
      attractions_display: [],
      sorted: null,
      filters: {
        rating: 0,
        zipcode: 0,
      }
    };
  }

  componentWillMount() {
    const url = api_url + "/hotels";
    this.request(url, this.getCount);
    this.getPage(0, null, null, false);
  }

  fillInHotels(responseText) {
    var temp_hotels = [];
    let hotels_parsed = JSON.parse(responseText)["list"];
    for (let h of hotels_parsed) {
      temp_hotels.push(new Hotel(h["address"], h["id"], h["image"], h["name"], h["rating"], h["zip_code"]));
    } 
    this.setState({
        hotels_display: temp_hotels
      });
  }

  getCount(responseText) {
    hot_count = JSON.parse(responseText)["total"];
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
    var url = api_url + "/hotels?";

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
    }

    const count_url = url + apiParams.join("&");
    const page_url = count_url + "&page=" + pageNum+1;

    this.request(count_url, this.getCount);
    this.request(page_url, this.fillInHotels);
    this.setState({
      onPage: pageNum,
      sorted: sortParam,
      filters: fils
    });
  }

  filterPage(filters) {
    this.getPage(0, this.state.sorted, filters);
  }

  sortPage(category) {
    this.getPage(0, category, this.state.filters);
  }

  handlePageClick(pageNum) {
    this.getPage(pageNum, this.state.sorted, this.state.filters);
  }

  render() {

    const pages_count = (hot_count%per_page) == 0 ? hot_count/per_page : hot_count/per_page + 1;

    var cards = this.state.hotels_display.map(function(hotel){
            return <Col xs="12" md="4"><HotelCard hotel={hotel} /></Col>;
          })


    return (
      <div className="background">
        <Header title="Hotels" description="Hotels description"/>
        <br />

        <Container>
            <Row>
                <Col xs="12" md="2"><h1>Hotels</h1></Col>
                <Col xs="0" md="10"/>
            </Row>
            <Row>
                <Col xs="12" md="2">
                  <Filter handler={this.filterPage}/>
                  <br />
                  <Sort handler={this.sortPage}/>
                </Col>
                <Col xs="12" md="10">
                {
                  hot_count > 0 &&
                  cards
                }
                {
                  hot_count == 0 &&
                  <h1>No results found.</h1>
                }
                </Col>
            </Row>
            <Paginator totalPages={pages_count} activePage={this.state.onPage} onPageClicked={this.handlePageClick}/>
          </Container>
        </div>
    );
  }
}