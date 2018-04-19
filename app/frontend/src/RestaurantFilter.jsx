import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, Row, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import PropTypes from "prop-types";
import { api_url } from './config.js';
import "./filter.css";

var categories = [];
var zipcodes = [];
export default class RestaurantFilter extends Component {

  constructor(props) {
    super(props);
    this.gatherFilters = this.gatherFilters.bind(this);
    this.unapplyFilters = this.unapplyFilters.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.state = {
      rating: 0,
      open: false,
      selectedCategories: '',
      selectedZipcodes: ''
    };
  }

  parseCategories(responseText) {
    categories = JSON.parse(responseText)["categories"];
  }

  parseZipcodes(responseText) {
    zipcodes = JSON.parse(responseText)["list"];
  }

  componentWillMount() {
    const categories_url = api_url + "/categories?type=restaurant"
    const zipcodes_url = api_url + "/zipcodes?type=restaurant"
    this.request(categories_url, this.parseCategories);
    this.request(zipcodes_url, this.parseZipcodes);
  }

  gatherFilters() {
    this.props.handler(this.state);
  }

  unapplyFilters() {
    ReactDOM.findDOMNode(this.refs.ratFilter).value = "";
    ReactDOM.findDOMNode(this.refs.openFilter).checked = false;

    this.setState({
      rating: 0,
      open: false,
      selectedCategories: '',
      selectedZipcodes: ''
    });

    this.props.handler({
      rating: 0,
      open: false,
      selectedCategories: '',
      selectedZipcodes: ''
    });
  }

  handleRatingChange(e) {
    var rat = e.target.value;
    if(rat == ""){
      rat = 0;
    }
    this.setState({
      rating: rat
    });
  }


  handleHourChange(e) {
    var isChecked = e.target.checked;
    this.setState({
      open: isChecked
    });
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
      if(code === 13) { //13 is the enter keycode
          this.gatherFilters();
      } 
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

  handleZipCodeChange = (selectedZipcodes) => {
    this.setState({ selectedZipcodes });
  }

  handleCategoryChange = (selectedCategories) => {
    this.setState({ selectedCategories });
  }

  render() {
    return(
      <Row>
          <Form>
              <Col xs="12"><legend><span className="cardTitleText">Filter by:</span></legend></Col>
              <Col xs="12">

               <FormGroup check inline>
                  <Label for="ratingFilter" className="medText">Rating of at least:</Label>
                  <Input type="number" min="0" max="5" ref="ratFilter" id="ratingFilter" placeholder="1-5" onChange={e => this.handleRatingChange(e)}
                  onKeyPress={this.enterPressed.bind(this)}/>
                </FormGroup>
              </Col>

              <br />

              <Col xs="12">
                <FormGroup check inline>
                  <Label check className="cardSmallText">
                    <Input type="checkbox" ref="openFilter" onChange={e => this.handleHourChange(e)} onKeyPress={this.enterPressed.bind(this)} />
                    Show what's open right now
                  </Label>
                </FormGroup>
              </Col>

              <br />

              <Col xs="12">
                <FormGroup>
                  <Label for="zipcodeFilter" className="cardSubText">Filter by zipcode</Label>
                  <Select 
                    name="zipcodeFilter"
                    options={zipcodes}
                    multi={true}
                    simpleValue={true}
                    value={this.state.selectedZipcodes}
                    onChange={this.handleZipCodeChange}
                  />
                </FormGroup>
              </Col>

              <Col xs="12">
                  <Label for="categoryFilter" className="cardSubText">Filter by category</Label>
                  <Select 
                    name="categoryFilter"
                    options={categories}
                    multi={true}
                    simpleValue={true}
                    value={this.state.selectedCategories}
                    onChange={this.handleCategoryChange}
                  />
              </Col>

              <br />

             <Col xs="12">
                <Button outline color="info" className="button-margin" onClick={this.gatherFilters}>Apply filters</Button>
              </Col>
              <Col xs="12">
                <Button outline color="info" onClick={this.unapplyFilters}>Clear all filters</Button>
              </Col>
          </Form>
        </Row>
    );
  }

}

RestaurantFilter.propTypes = {
    handler: PropTypes.function
  }