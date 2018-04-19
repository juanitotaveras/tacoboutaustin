import React, { Component } from 'react';
import { Input, InputGroup, Button, Container, Row, Jumbotron, Col, 
	Form, FormGroup, Label, Nav, NavItem, NavLink,
	TabPane, Card, CardTitle, CardText, TabContent  } from 'reactstrap';
	import {Restaurant} from './Restaurants';
import RestaurantSearchCard from './RestaurantSearchCard';
import {Hotel} from './Hotels';
import HotelSearchCard from './HotelSearchCard';
import {Attraction} from './Attractions';
import AttractionSearchCard from './AttractionSearchCard';
import { api_url } from './config';
import classnames from 'classnames';
import Header from './Header';
import Paginator from './Paginator';
import HeaderBackground from './assets/search_header_background.jpg';
import TacoAnimation from './assets/taco_loading.gif';

var restaurants = [];
var hotels = [];
var attractions = [];
let PER_PAGE = 16;
let PER_CATEGORY = PER_PAGE/3;

var searchTerms = [];
var matchAllTerms = false;
const RES_TAB = "restaurantsTab";
const ATT_TAB = "attractionsTab";
const HOT_TAB = "hotelsTab";

export default class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '', 
			resPage: 1,
			hotPage: 1,
			attPage: 1,
			displayedRes: [],
			displayedAtt: [],
			displayedHot: [],
			resLoading: false,
			attLoading: false,
			hotLoading: false,
			hasSearched: false,
			activeTab: RES_TAB,
			loading: true
		};
		this.toggle = this.toggle.bind(this);
		this.onChangeSearchBoxText = this.onChangeSearchBoxText.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.doneLoadingAll = this.doneLoadingAll.bind(this);
		this.doneLoadingRes = this.doneLoadingRes.bind(this);
		this.doneLoadingAtt = this.doneLoadingAtt.bind(this);
		this.doneLoadingHot = this.doneLoadingHot.bind(this);
	}

	handlePageClick(pageNum) {
		switch (this.state.activeTab) {
			case RES_TAB:
				this.setState({
					resPage: pageNum
				});
				break;
			case ATT_TAB:
				this.setState({
					attPage: pageNum
				});
				break;
			case HOT_TAB:
				this.setState({
					hotPage: pageNum
				});
				break;
		}

		this.showSearchItems(pageNum);
	}

	fillInRestaurants(responseText, doneLoading) {
		let restaurants_parsed = JSON.parse(responseText)["list"];
		for (let r of restaurants_parsed) 
			restaurants.push(new Restaurant(r["address"], r["id"], r["image"], r["name"], r["rating"], r["zip_code"]));
		doneLoading();
	}

	fillInHotels(responseText, doneLoading) {
		let hotels_parsed = JSON.parse(responseText)["list"];
		for (let h of hotels_parsed) 
			hotels.push(new Hotel(h["address"], h["id"], h["image"], h["name"], h["rating"], h["zip_code"]));
		doneLoading();
	}

	fillInAttractions(responseText, doneLoading) {
		let attractions_parsed = JSON.parse(responseText)["list"];
		for (let a of attractions_parsed) 
			attractions.push(new Attraction(a["address"], a["id"], a["image"], a["name"], a["rating"], a["zip_code"]));
		doneLoading();
	} 


	request(url, parseResponse, doneLoading) {
		// console.log("URL: " + url);
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
				parseResponse(xmlHttp.responseText, doneLoading);
		}
		xmlHttp.open("GET", url, true) // true for asynchronous
		xmlHttp.send(null);
  	}

	onChangeSearchBoxText(event) {
  		this.setState({value: event.target.value});
  	}

  	// This function is called every time we search and every time the page is changed.
  	// Sets the cards we will display as part of the State
	showSearchItems(pageNum) {

		let startIdx = (pageNum - 1) * PER_PAGE;

		var rStartIdx = (this.state.resPage-1) * PER_PAGE;
		var aStartIdx = (this.state.attPage-1) * PER_PAGE;
		var hStartIdx = (this.state.hotPage-1) * PER_PAGE;

		switch (this.state.activeTab) {
			case RES_TAB:
				rStartIdx = startIdx;
				break;
			case ATT_TAB:
				aStartIdx = startIdx;
				break;
			case HOT_TAB:
				hStartIdx = startIdx;
				break;
		}

		let rArray = restaurants.slice(rStartIdx, rStartIdx + PER_PAGE)
			.map( (restaurant) => {
				return <Col xs="12" sm="6" md="3">
							<RestaurantSearchCard restaurant={restaurant} searchTerms={searchTerms}/>
						</Col>;
			});

		let aArray =  attractions.slice(aStartIdx, aStartIdx + PER_PAGE)
			.map( (attraction) => {
				return <Col xs="12" sm="6" md="3">
							<AttractionSearchCard attraction={attraction} searchTerms={searchTerms}/>
						</Col>;
			});


		let hArray = hotels.slice(hStartIdx, hStartIdx + PER_PAGE)
			.map( (hotel) => {
				return <Col xs="12" sm="6" md="3">
							<HotelSearchCard hotel={hotel} searchTerms={searchTerms}/>
						</Col>;
			});
		
		if (restaurants.length > 0)
			this.toggle(RES_TAB);
		else if (attractions.length > 0)
			this.toggle(ATT_TAB);
		else if (hotels.length > 0)
			this.toggle(HOT_TAB);

		this.setState({
			displayedRes: rArray,
			displayedAtt: aArray,
			displayedHot: hArray,
			hasSearched: true,
			loading: false
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
		event.preventDefault();
		this.setState({
			resLoading: true,
			attLoading: true,
			hotLoading: true,
			loading: true
		});

		if (this.state.hasSearched) {
			// clear current results
			restaurants = [];
			attractions = [];
			hotels = [];
		}

		let searchRequestText = this.createSearchString(this.state.value);

		var searchText = "?search=" + searchRequestText;

		if (matchAllTerms) 
			searchText += "&search_type=and"

		const urls = ["/restaurants", "/hotels", "/attractions"].map((elem) => api_url + elem + searchText);
		this.request(urls[0], this.fillInRestaurants, this.doneLoadingRes);
		this.request(urls[2], this.fillInAttractions, this.doneLoadingAtt);
		this.request(urls[1], this.fillInHotels, this.doneLoadingHot);
	}

	handleSeachInclusive() {
		if (!matchAllTerms) matchAllTerms = true;
		else matchAllTerms = false;
	}

	componentDidMount() {
		this.setState({loading: false});

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

	 doneLoadingRes() {
	 	this.setState({resLoading: false});
	 	this.doneLoadingAll();
	 }
	 doneLoadingAtt() {
	 	this.setState({attLoading: false});
	 	this.doneLoadingAll();
	 }
	 doneLoadingHot() {
	 	this.setState({hotLoading: false});
	 	this.doneLoadingAll();
	 }

	 doneLoadingAll() {
	 	if (!this.state.resLoading && !this.state.hotLoading && !this.state.attLoading) {
	 		// this.setState({loading: false});
			this.showSearchItems(1);
	 	}
	 }

	render() {
		const loadingImage =
			<div className="text-center" height="50%">
				<img src={TacoAnimation} alt="Loading Image" width="30%" height="auto" style={{float: 'center'}}/>
			</div>;
		const searchBox = 
			<Row>
				<br/>
			<InputGroup>
			{/* <i class="fas fa-search" style={styles}></i>*/}
			<Input className="biggerText" type="text" onChange={this.onChangeSearchBoxText} value={this.state.value} onKeyPress={this.enterPressed.bind(this)}
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

		var activeTab = this.state.activeTab;
		const resCount = restaurants.length;
		const attCount = attractions.length;
		const hotCount = hotels.length;

		switch (activeTab) {
			case RES_TAB:
				arrayLength = resCount;
				activePage = this.state.resPage;
				break;
			case ATT_TAB:
				arrayLength = attCount;
				activePage = this.state.attPage;
				break;
			case HOT_TAB:
				arrayLength = hotCount;
				activePage = this.state.hotPage;
				break;
		}
		let pageCount = Math.ceil(arrayLength/PER_PAGE);

		const restaurantTabComponent = 
			<TabPane tabId={RES_TAB}>
				<Row>
					<div>
					<br/>
						{this.state.displayedRes}
					</div>
				</Row>
			</TabPane>;
		const attractionTabComponent = 
			<TabPane tabId={ATT_TAB}>
				<div>
				<br />
				<Row>
					{this.state.displayedAtt}
				</Row>
				</div>
			</TabPane>;

		const hotelTabComponent = 
			<TabPane tabId={HOT_TAB}>
				<div>
				<br/>
				<Row>
					{this.state.displayedHot}
				</Row>
				</div>
			</TabPane>;


		const restaurantsNavItem =
			          <NavItem>
	            <NavLink
	              className={classnames({ active: activeTab === RES_TAB })}
	              onClick={() => { this.toggle(RES_TAB); }}
	            >
	              Restaurants ({resCount})
	            </NavLink>
	          </NavItem>;
	    const attractionsNavItem = 
	              <NavItem>
	            <NavLink
	              className={classnames({ active: activeTab === ATT_TAB })}
	              onClick={() => { this.toggle(ATT_TAB); }}
	            >
	              Attractions ({attCount})
	            </NavLink>
	          </NavItem>;
	    const hotelsNavItem =
	              <NavItem>
	            <NavLink
	              className={classnames({ active: activeTab === HOT_TAB })}
	              onClick={() => { this.toggle(HOT_TAB); }}
	            >
	              Hotels ({hotCount})
	            </NavLink>
	          </NavItem>;

		const tabContainer = 
			<div>
		        <Nav tabs>
		        	{
		        		resCount > 0 &&
		        		restaurantsNavItem
		        	}
		        	{
		        		attCount > 0 &&
		        		attractionsNavItem
		        	}
		        	{
		        		hotCount > 0 &&
		        		hotelsNavItem
		        	}

		        </Nav>

		        <TabContent activeTab={activeTab}>

		          {
		          	resCount > 0 &&
		          	restaurantTabComponent
		          }
		          {
		          	attCount > 0 &&
		          	attractionTabComponent
		          }
		          {
		          	hotCount > 0 &&
		          	hotelTabComponent
		          }

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
				{searchBox}
				{
					this.state.loading ?
					loadingImage :
					(
					this.noResultsFound() ?
					noResultsComponent
					:
					tabContainer
					)
				}
				{
					(pageCount > 1 && !this.state.loading) &&
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
					{searchBox}
					{
					this.state.loading &&
					loadingImage 
					}
				</Container>
				</div>
				);
		}

	}

}