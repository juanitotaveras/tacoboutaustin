import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, Row, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import PropTypes from "prop-types";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var categories = [];
export default class Filter extends Component {

  constructor(props) {
    super(props);
    this.gatherFilters = this.gatherFilters.bind(this);
    this.unapplyFilters = this.unapplyFilters.bind(this);
    this.state = {
      rating: 0,
      zipcode: 0,
    };
  }

  gatherFilters() {
    this.props.handler(this.state);
  }

  unapplyFilters() {
    ReactDOM.findDOMNode(this.refs.ratFilter).value = "";
    ReactDOM.findDOMNode(this.refs.zipFilter).value = "";

    this.setState({
      rating: 0,
      zipcode: 0,
    });

    this.props.handler({
      rating: 0,
      zipcode: 0,
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
        // console.log("REPONSE " + xmlHttp.responseText);
      }
      xmlHttp.open("GET", url, false) // true for asynchronous
      xmlHttp.send(null);
  }

	render() {
		return(
			<Container>
          <Form>
              <Row>
                <Col xs="12" md="4">
                  <legend>Filter by:</legend>
                </Col>
                <Col xs="12">

                  <FormGroup check inline>
                    <Label for="ratingFilter">Rating of at least:</Label>
                    <Input type="number" min="0" max="5" ref="ratFilter" id="ratingFilter" placeholder="1-5" onChange={e => this.handleRatingChange(e)}
                      onKeyPress={this.enterPressed.bind(this)}/>
                  </FormGroup>
                </Col>

                <br />

                <Col xs="12">
                  <FormGroup>
                    <Label for="zipcodeFilter">Filter by zipcode</Label>
                    <Input type="number" ref="zipFilter" id="zipcodeFilter" placeholder="Enter a zipcode" onChange={e => this.handleZipChange(e)} 
                      onKeyPress={this.enterPressed.bind(this)}/>
                  </FormGroup>
                </Col>

                <Col xs="12">
                    <Label for="categoryFilter">Filter by category</Label>
                    <Select 
                      options={categories}
                      value="HELLO"
                    />
                </Col>

                <Col xs="12">
                  <Button outline color="primary" onClick={this.gatherFilters}>Apply filters</Button>
                </Col>
                <Col xs="12">
                  <Button outline color="primary" onClick={this.unapplyFilters}>Clear all filters</Button>
                </Col>
              </Row>
          </Form>
        </Container>
		);
	}

}

Filter.propTypes = {
    handler: PropTypes.function,
    categories: PropTypes.array
  }