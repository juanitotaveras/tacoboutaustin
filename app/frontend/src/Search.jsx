import React, { Component } from 'react';
import { Input, InputGroup, Button, Container, Row, Jumbotron, Col, 
	Form, FormGroup, Label, Nav, NavItem, NavLink,
	TabPane, Card, CardTitle, CardText, TabContent  } from 'reactstrap';
	import {Restaurant} from './Restaurants';
// import Restaurants from './Restaurants';
import RestaurantSearchCard from './RestaurantSearchCard';
import {Hotel} from './Hotels';
import HotelSearchCard from './HotelSearchCard';
import {Attraction} from './Attractions';
import AttractionSearchCard from './AttractionSearchCard';
import './App.css';
import { api_url } from './config';
import classnames from 'classnames';
import Header from './Header';
import Paginator from './Paginator';
import HeaderBackground from './assets/search_header_background.jpg';

// var restaurants = [Restaurant('address', 'id', 'image', 'name', 'rating')];
var restaurants = [];
var hotels = [];
var attractions = [];
let per_page = 20;
let per_category = per_page/3;

var searchTerms = [];
var matchAllTerms = false;

export default class Search extends Component {


	constructor(props) {
		super(props);
		this.state = {
			value: '', 
			onPage: 1,
			rPage: 1,
			hPage: 1,
			aPage: 1,
			displayedRestaurants: [],
			displayedHotels: [],
			displayedAttractions: [],
			hasSearched: false,
			activeTab: '1'
		};
		this.toggle = this.toggle.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);

	}

		handlePageClick(pageNum) {
			switch (this.state.activeTab) {
				case "restaurantsTab":
					this.setState({
						rPage: pageNum
					});
					break;
				case "attractionsTab":
					this.setState({
						aPage: pageNum
					});
					break;
				case "hotelsTab":
					this.setState({
						hPage: pageNum
					});
					break;
			}
			this.setState({
				done_loading: false
			});

			this.showSearchItems(pageNum);
		}
		fillInRestaurants(responseText) {
		// console.log("RESPONSE: " + responseText);
		let restaurants_parsed = JSON.parse(responseText)["list"];
		for (let r of restaurants_parsed) {
			restaurants.push(new Restaurant(r["address"], r["id"], r["image"], r["name"], r["rating"], r["zip_code"]));
		}
	}

	fillInHotels(responseText) {
		let hotels_parsed = JSON.parse(responseText)["list"];
		for (let h of hotels_parsed) {
			// TODO: Highlight matching search terms
			hotels.push(new Hotel(h["address"], h["id"], h["image"], h["name"], h["rating"], h["zip_code"]));
		}
	}

	fillInAttractions(responseText) {
		let attractions_parsed = JSON.parse(responseText)["list"];
		for (let a of attractions_parsed) 
			attractions.push(new Attraction(a["address"], a["id"], a["image"], a["name"], a["rating"], a["zip_code"]));
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

  onChange(event) {
  	this.setState({value: event.target.value});
  }

  showSearchItems(pageNum) {
  	// TODO: Try to display equal number of results for each
  	// maybe like 7 for each

  	// let idx = (pageNum-1) * per_page;
  	console.log("SIZES OF ARRAYS: res" + restaurants.length + " att: " + attractions.length + " hot: " + hotels.length );
  	let p = pageNum -1;

  	var activeTabName = "";

  	if (!this.state.hasSearched) {
  		if (restaurants.length > 0)
  			this.toggle("restaurantsTab");
  		else if (attractions.length > 0)
  			this.toggle("attractionsTab");
  		else if (hotels.length > 0)
  			this.toggle("hotelsTab");
  	}

  	var rIdx = (this.state.rPage-1) * per_page;
  	var aIdx = (this.state.aPage-1) * per_page;
  	var hIdx = (this.state.hPage-1) * per_page;
  	console.log("IDX ON SHOWSEARCHITEMS:  pageNum: " + pageNum + " rIDX: " + rIdx);

	switch (this.state.activeTab) {
		case "restaurantsTab":
			rIdx = p * per_page;
			break;
		case "attractionsTab":
			aIdx = p * per_page;
			break;
		case "hotelsTab":
			hIdx = p * per_page;
			break;
	}

  	let rArray = restaurants.slice(rIdx, rIdx+per_page);
  	let hArray = hotels.slice(hIdx, hIdx+per_page);
  	let aArray = attractions.slice(aIdx, aIdx+per_page);
  	this.setState({
  		displayedRestaurants: rArray,
  		displayedHotels: hArray,
  		displayedAttractions: aArray,
  		hasSearched: true
  	});
  }

  enterPressed(event) {
  	var code = event.keyCode || event.which;
	    if(code === 13)  //13 is the enter keycode
	        this.onSearch(event);
	}

	createSearchString(searchInput) {
			// add an ' to any terms that end in s
		searchTerms = searchInput.split(" ")

		var searchRequestText = ""
		for (var i = 0; i < searchTerms.length; ++i) {

			if (i+1 == searchTerms.length) {
				searchRequestText += searchTerms[i];
			} else {
				searchRequestText += searchTerms[i] + ',';
			}
		}	
		return searchRequestText;
	}

	onSearch(event) {
		// ?search=TERM1,TERM2,TERM3   TERM4A+TERM4B
		event.preventDefault();

		if (this.state.hasSearched) {
			// clear current results
			restaurants = [];
			hotels = [];
			attractions = [];
		}

		let searchRequestText = this.createSearchString(this.state.value);

		var searchText = "?search=" + searchRequestText;

		if (matchAllTerms) 
			searchText += "&search_type=and"

		const urls = ["/restaurants", "/hotels", "/attractions"].map((elem) => api_url + elem + searchText);
		this.request(urls[0], this.fillInRestaurants);
		this.request(urls[1], this.fillInHotels);
		this.request(urls[2], this.fillInAttractions);

		this.showSearchItems(1);
	}

	handleSeachInclusive() {
		if (!matchAllTerms) matchAllTerms = true;
		else matchAllTerms = false;
	}

	componentDidMount() {

	}

	noResultsFound() {
		return restaurants.length == 0 && hotels.length == 0 && attractions.length == 0;
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
	    	this.setState({
	        	activeTab: tab
	      	});
	    }
	 }


	render() {
		const searchBox = 
			<Row>
			<InputGroup>
			{/* <i class="fas fa-search" style={styles}></i>*/}
			<Input className="biggerText" type="text" onChange={this.onChange} value={this.state.value} onKeyPress={this.enterPressed.bind(this)}
			placeholder="Search something..." />
			<Button color="secondary" style={{fontSize: '1.5em'}}onClick={this.onSearch}>Search!</Button>
			</InputGroup>
			<br/>
			 <Row>
                <FormGroup check inline style={{marginLeft: '20px', marginTop: '10px'}}>
                  <Label check className="mediumText">
                    <Input type="checkbox"  onChange={e => this.handleSeachInclusive()}/>Only show results that match all search terms
                  </Label>
                </FormGroup>
              </Row>
			</Row>;
		const noResultsComponent = 
			<div>
			<br/>
			<Row>
				<h1> No results found. </h1>
			</Row>
			</div>;

	const page_numbers = [];
	var arrayLength = 0;
	var activePage = 0;
	switch (this.state.activeTab) {
		case "restaurantsTab":
			arrayLength = restaurants.length;
			activePage = this.state.rPage;
			break;
		case "attractionsTab":
			arrayLength = attractions.length;
			activePage = this.state.aPage;
			break;
		case "hotelsTab":
			arrayLength = hotels.length;
			activePage = this.state.hPage;
			break;
	}
	let pageCount = Math.ceil(arrayLength/per_page);
	console.log("resturants length: " + restaurants.length);
	console.log("active Tab: " + this.state.activeTab);
	console.log("PAGE COUNT: " + pageCount + " arrayLength: " + arrayLength + " per page: " + per_page + " displayedRestaurants.length " + this.state.displayedRestaurants.length);
	var restaurantCards = this.state.displayedRestaurants.map(function(restaurant) {
		return <Col xs="12" sm="6" md="3"><RestaurantSearchCard restaurant={restaurant} searchTerms={searchTerms}/></Col>;
	});

	const restaurantComponent = 
		<Row>
		<div>
		<br/>
		{restaurantCards}
		</div>
		</Row>;


	const hotelCards = this.state.displayedHotels.map(function(hotel) {
		return <Col xs="12" sm="6" md="3"><HotelSearchCard hotel={hotel} searchTerms={searchTerms}/></Col>;
	});

	const hotelComponent = 
		<div>
		<br/>
		<Row>
		{hotelCards}
		</Row>
		</div>;
	const attractionCards = this.state.displayedAttractions.map(function(attraction) {
		return <Col xs="12" sm="6" md="3"><AttractionSearchCard attraction={attraction} searchTerms={searchTerms}/></Col>;
	});

	const attractionComponent = 
		<div>
		<br />
		<Row>
			{attractionCards}
		</Row>
		</div>;

	const restaurantsNavItem =
		          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'restaurantsTab' })}
              onClick={() => { this.toggle('restaurantsTab'); }}
            >
              Restaurants ({restaurants.length})
            </NavLink>
          </NavItem>;
    const hotelsNavItem =
              <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'attractionsTab' })}
              onClick={() => { this.toggle('attractionsTab'); }}
            >
              Attractions ({attractions.length})
            </NavLink>
          </NavItem>;
    const attractionsNavItem = 
              <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'hotelsTab' })}
              onClick={() => { this.toggle('hotelsTab'); }}
            >
              Hotels ({hotels.length})
            </NavLink>
          </NavItem>;

	const tabContainer = 
	<div>
        <Nav tabs>
        	{
        		restaurants.length > 0 &&
        		restaurantsNavItem
        	}
        	{
        		hotels.length > 0 &&
        		hotelsNavItem
        	}
        	{
        		attractions.length > 0 &&
        		attractionsNavItem
        	}

        </Nav>

        <TabContent activeTab={this.state.activeTab}>

          <TabPane tabId="restaurantsTab">
            {restaurantComponent}
          </TabPane>

          <TabPane tabId="attractionsTab">
            {attractionComponent}
          </TabPane>

          <TabPane tabId="hotelsTab">
          	{hotelComponent}
          </TabPane>
        </TabContent>
      </div>;


	if (this.state.hasSearched) {
		return(
			<div className="background">
        	<Header 
        		title="Search Austin"
        		image={HeaderBackground}
        	/>
        	<br />
			<Container>
				<Row>	
					<Col xs="5"/><Col xs="2"><h1>Search Austin</h1></Col><Col xs="5"/>
				</Row>
			{searchBox}
			{
				this.noResultsFound() ?
				noResultsComponent
				:
				tabContainer
			}
			{
				pageCount > 1 &&
				 <Paginator pageCount={pageCount} activePage={activePage} onPageClicked={this.handlePageClick}/>
			}
			</Container>
			</div>
			);
	} else {
		return(							
			<div className="background">
        	<Header 
        		title="Search Austin"
        		image={HeaderBackground}
        	/>
        	<br />

			<Container>
				<Row>	
					<Col xs="5"/><Col xs="2"><h1>Search Austin</h1></Col><Col xs="5"/>
				</Row>
				{searchBox}
			</Container>
			</div>
			);
	}

	}

}