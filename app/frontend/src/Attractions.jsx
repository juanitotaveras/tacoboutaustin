import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Button, Pagination, PaginationItem, 
  PaginationLink, Form, FormGroup } from 'reactstrap';
import AttractionCard from './AttractionCard';
import Header from './Header';
import { api_url } from './config';
import Sort from './Sort';
import Filter from './Filter';


var att_count = 0;
const per_page = 12;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export class Attraction {
  constructor(address, id, image, name, rating, zip_code) {
    this.address = address;
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating = rating;
    this.zip_code = zip_code;
  }
}

export default class Attractions extends Component {
  constructor(props) {
    super(props);
    this.sortPage = this.sortPage.bind(this)
    this.filterPage = this.filterPage.bind(this)
    this.fillInAttractions = this.fillInAttractions.bind(this)
    this.state = {
      onPage: 1,
      attractions_display: [],
      sorted: null,
      filters: {
        rating: 0,
        zipcode: 0,
      }
    };
  }

  componentWillMount() {
    const url = api_url + "/attractions";
    this.request(url, this.getCount);
    this.getPage(1, null, null, false);
  }

  fillInAttractions(responseText) {
    var temp_attractions = [];
    let attractions_parsed = JSON.parse(responseText)["list"];
    for (let a of attractions_parsed) {
      temp_attractions.push(new Attraction(a["address"], a["id"], a["image"], a["name"], a["rating"], a["zip_code"]));
    }
    this.setState({
        attractions_display: temp_attractions
      });
  } 

  getCount(responseText) {
    att_count = JSON.parse(responseText)["total"];
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
    var url = api_url + "/attractions?";

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
    const page_url = count_url + "&page=" + pageNum;

    this.request(count_url, this.getCount);
    this.request(page_url, this.fillInAttractions);
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
    const pages_count = (att_count%per_page) == 0 ? att_count/per_page : att_count/per_page + 1;
    for(var i = 1; i <= pages_count; i++)
      page_numbers.push(i);

    var cards = this.state.attractions_display.map(function(attraction){
            return <Col xs="12" md="4"><AttractionCard attraction={attraction} /></Col>;
          })

    var pages = page_numbers.map((pageNum) => {
      return <li onClick={() => this.handlePageClick(pageNum)}><PaginationItem><PaginationLink>{pageNum}</PaginationLink></PaginationItem></li>;
    })

    return (
      <div classname="background">
        <Header title="Attractions" description="Attractions description"/>
        <br />
        <Container>
            <Row>
                <Col xs="12" md="2"><h1>Attractions</h1></Col>
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
                  att_count > 0 &&
                  cards
                }
                {
                  att_count == 0 &&
                  <h1>No results found.</h1>
                }
                </Col>
            </Row>
            <Row>
              <Col md="4"/>
              <Col xs="12" md="4">
                <Pagination size="lg">{pages}</Pagination>
                </Col>
              <Col md="4"/>
            </Row>
          </Container>
        </div>
    );
  }
}