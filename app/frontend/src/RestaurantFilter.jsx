import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import PropTypes from "prop-types";

export default class RestaurantFilter extends Component {

  constructor(props) {
    super(props);
    this.gatherFilters = this.gatherFilters.bind(this);
    this.unapplyFilters = this.unapplyFilters.bind(this);
    this.state = {
      rating: 0,
      zipcode: 0,
      open: false
    };
  }

  gatherFilters() {
    this.props.handler(this.state);
  }

  unapplyFilters() {
    ReactDOM.findDOMNode(this.refs.ratFilter).value = "";
    ReactDOM.findDOMNode(this.refs.zipFilter).value = "";
    ReactDOM.findDOMNode(this.refs.openFilter).checked = false;

    this.setState({
      rating: 0,
      zipcode: 0,
      open: false
    });

    this.props.handler({
      rating: 0,
      zipcode: 0,
      open: false
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

  handleHourChange(e) {
    var isChecked = e.target.checked;
    this.setState({
      open: isChecked
    });
  }

	render() {
		return(
			<Container>
          <Form>
              <Row><legend>Filter by:</legend></Row>
              <Row>

               <FormGroup check inline>
                  <Label for="ratingFilter">Rating of at least:</Label>
                  <Input type="number" min="0" max="5" ref="ratFilter" id="ratingFilter" placeholder="1-5" onChange={e => this.handleRatingChange(e)}/>
                </FormGroup>
              </Row>

              <br />

              <Row>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" ref="openFilter" onChange={e => this.handleHourChange(e)}/>Show what's open right now
                  </Label>
                </FormGroup>
              </Row>

              <br />

              <Row>
                <FormGroup>
                  <Label for="zipcodeFilter">Filter by zipcode</Label>
                  <Input type="number" ref="zipFilter" id="zipcodeFilter" placeholder="Enter a zipcode" onChange={e => this.handleZipChange(e)}/>
                </FormGroup>
              </Row>

              <Row>
                <Button outline color="primary" onClick={this.gatherFilters}>Apply filters</Button>
              </Row>
              <Row>
                <Button outline color="primary" onClick={this.unapplyFilters}>Clear all filters</Button>
              </Row>
          </Form>
        </Container>
		);
	}

}

RestaurantFilter.propTypes = {
    handler: PropTypes.function
  }