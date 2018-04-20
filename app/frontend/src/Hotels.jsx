import React, { Component } from 'react';
import { Container, Row, Col, Button,
  Form, FormGroup } from 'reactstrap';
import HotelCard from './HotelCard';
import Header from './Header';
import { api_url } from './config';
import Sort from './Sort';
import Filter from './Filter';
import Paginator from './Paginator';
import TacoAnimation from './assets/taco_loading.gif';
import HeaderBackground from './assets/hotels_header_background.jpg';

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
    this.sortPage = this.sortPage.bind(this);
    this.filterPage = this.filterPage.bind(this);
    this.fillInHotels = this.fillInHotels.bind(this);

    this.doneLoading = this.doneLoading.bind(this);
    this.requestCount = this.requestCount.bind(this);
    this.requestPages = this.requestPages.bind(this);
    this.getCount = this.getCount.bind(this);
    this.state = {
      onPage: 1,
      hotels_display: [],
      sorted: null,
      filters: {
        rating: 0,
        zipcode: 0,
      },
      loading: false
    };
  }

  componentWillMount() {
    const url = api_url + "/hotels";
    this.getPage(1, null, null, false);
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
    this.doneLoading();
  }

  getCount(responseText, page_url) {
    hot_count = JSON.parse(responseText)["total"];
    this.requestPages(page_url, this.fillInHotels);
  }

  requestCount(count_url, page_url, getCount) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          getCount(xmlHttp.responseText, page_url);
      }
      xmlHttp.open("GET", count_url, true) // true for asynchronous
      xmlHttp.send(null);
  }

  requestPages(page_url, fillInHotels) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          fillInHotels(xmlHttp.responseText);
      }
      xmlHttp.open("GET", page_url, true) // true for asynchronous
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
    this.setState({
      loading: true,
    });
    var apiParams = [];
    var url = api_url + "/hotels?";

    // Sorting
    if(sortParam != null)
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

    this.requestCount(count_url, page_url, this.getCount);
    this.setState({
      onPage: pageNum,
      sorted: sortParam,
      filters: fils
    });
  }

  doneLoading() {
    this.setState({loading: false});
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
    const loadingImage =
      <div className="text-center">
        <img src={TacoAnimation} alt="Loading Image" width="10%" height="auto" style={{float: 'center'}}/>
      </div>;
    var pages_count = Math.floor(hot_count/per_page);
    if (!((hot_count%per_page) == 0))
      pages_count++;

    var cards = this.state.hotels_display.map(function(hotel){
            return <Col xs="12" md="4"><HotelCard hotel={hotel} /></Col>;
          })

    const container = 
            <Container>
            <Row>
                <Col xs="12" md="2">
                  <Filter type="Hotels" handler={this.filterPage}/>
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
            <Paginator pageCount={pages_count} activePage={this.state.onPage} onPageClicked={this.handlePageClick}/>
          </Container>;

    return (
      <div className="background">
        <Header 
          title="Places to Stay"
          description="Choose from a variety of places to rest after an adventure-filled day, from inexpensive motels to luxurious suites."
          image={HeaderBackground}
        />
        <br />
          {
            this.state.loading ?
            loadingImage
            :
            container
          }


        </div>
    );
  }
}