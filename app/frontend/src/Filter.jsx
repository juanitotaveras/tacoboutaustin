import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, Row, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import PropTypes from "prop-types";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { api_url } from './config';


var categories = [];
var zipcodes = [];
export default class Filter extends Component {

  constructor(props) {
    super(props);
    this.gatherFilters = this.gatherFilters.bind(this);
    this.unapplyFilters = this.unapplyFilters.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.state = {
      rating: 0,
      selectedZipcodes: '',
      selectedCategories: ''
    };
  }

  parseCategories(responseText) {
    categories = JSON.parse(responseText)["categories"];
  }

  parseZipcodes(responseText) {
    zipcodes = JSON.parse(responseText)["list"];
  }

  componentWillMount() {
    const categories_url = (this.props.type == "Attraction") ? api_url + "/categories?type=attraction" : api_url + "/categories?type=hotel"
    const zipcodes_url = (this.props.type == "Attraction") ? api_url + "/zipcodes?type=attraction" : api_url + "/zipcodes?type=hotel"
    this.request(categories_url, this.parseCategories);
    this.request(zipcodes_url, this.parseZipcodes);
  }

  gatherFilters() {
    this.props.handler(this.state);
  }

  unapplyFilters() {
    ReactDOM.findDOMNode(this.refs.ratFilter).value = "";

    this.setState({
      rating: 0,
      selectedZipcodes: '',
      selectedCategories: ''
    });

    this.props.handler({
      rating: 0,
      selectedZipcodes: '',
      selectedCategories: ''
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

  handleZipChange(e) {
    var zip = e.target.value;
    if(zip == ""){
      zip = 0;
    }
    this.setState({
      zipcode: zip
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
                <Col xs="12">
                  <legend><span className="cardTitleText">Filter by:</span></legend>
                </Col>
                <Col xs="12">

                  <FormGroup check inline>
                    <Label for="ratingFilter" className="medText">Rating of at least:</Label>
                    <Input type="number" min="0" max="5" ref="ratFilter" id="ratingFilter" placeholder="1-5" onChange={e => this.handleRatingChange(e)}
                      onKeyPress={this.enterPressed.bind(this)}/>
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

Filter.propTypes = {
    handler: PropTypes.function,
    type: PropTypes.string
  }