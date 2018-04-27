import React, { Component } from 'react';
import { Container, Row, Col, Button, Pagination, PaginationItem, 
  PaginationLink, Form, FormGroup } from 'reactstrap';
import AttractionCard from './AttractionCard';
import Header from './Header';
import { api_url } from './config';
import Sort from './Sort';
import Filter from './Filter';
import Paginator from './Paginator';
import HeaderBackground from './assets/attractions_header_background.jpg';
import TacoAnimation from './assets/taco_loading.gif';

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
    this.handlePageClick = this.handlePageClick.bind(this);
    this.sortPage = this.sortPage.bind(this)
    this.filterPage = this.filterPage.bind(this)
    this.fillInAttractions = this.fillInAttractions.bind(this)
    this.doneLoading = this.doneLoading.bind(this);
    this.requestCount = this.requestCount.bind(this);
    this.requestPages = this.requestPages.bind(this);
    this.getCount = this.getCount.bind(this);
    this.state = {
      onPage: 1,
      attractions_display: [],
      sorted: null,
      filters: {
        rating: 0,
        zipcode: 0,
      },
      loading: false
    };
  }

  componentWillMount() {
    const url = api_url + "/attractions";
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
    this.doneLoading();
  } 

  getCount(responseText, page_url) {
      att_count = JSON.parse(responseText)["total"];
      this.requestPages(page_url, this.fillInAttractions);
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

  requestPages(page_url, fillInAttractions) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          fillInAttractions(xmlHttp.responseText);
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
    var apiParams = [];
    var url = api_url + "/attractions?";
    this.setState({
      loading: true,
    })
    // Sorting
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
    document.getElementById('jump').scrollIntoView();
    this.getPage(pageNum, this.state.sorted, this.state.filters);
  }


  render() {
    const loadingImage =
      <div className="text-center">
        <img src={TacoAnimation} alt="Loading Image" width="65%" height="auto" style={{marginLeft: '60%'}}/>
      </div>;

    var pages_count = Math.floor(att_count/per_page);
    if (!((att_count%per_page) == 0))
      pages_count++;

    var cards = this.state.attractions_display.map(function(attraction){
            return <Col xs="12" md="4"><AttractionCard attraction={attraction} /></Col>;
          })

    const container = 
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

    return (
      <div classname="background">
        <Header 
          title="A Cornucopia of Attractions" 
          description={"Whether you want to relax with some Blues on the Green, "+
          "splash around at Barton Springs, or rock out at Austin City Limits, "+
          "you'll always find something to do in Austin."}
          image={HeaderBackground}
          />
        <br />

        <Container id="jump">
          <Row>
              <Col xs="12" md="2">
                <Filter type="Attractions" handler={this.filterPage}/>
                <br />
                <Sort handler={this.sortPage}/>
              </Col>
          
          {
            this.state.loading ?
            loadingImage
            :
            container
          }

        </Row>
            {
              !this.state.loading &&
              <Paginator pageCount={pages_count} activePage={this.state.onPage} onPageClicked={this.handlePageClick} />
            }
        </Container>;
      </div>
    );
  }
}