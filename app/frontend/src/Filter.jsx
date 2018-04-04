import React, { Component } from 'react';
import {Container, Form, Row, FormGroup, Label, Input, Button} from 'reactstrap';
import PropTypes from "prop-types";

export default class Filter extends Component {

  constructor(props) {
    super(props);
    this.gatherFilters = this.gatherFilters.bind(this);
    this.state = {
      rating: 0,
      zipcode: 0,
      open: false
    };
  }

  gatherFilters() {
    this.props.handler(this.state);
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
                  <Input type="number" id="ratingFilter" placeholder="Scale of 1-5" onChange={e => this.handleRatingChange(e)}/>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" onChange={e => this.handleHourChange(e)}/>Open now!
                  </Label>
                </FormGroup>
              </Row>

              <br />

              <Row>
                <FormGroup>
                  <Label for="zipcodeFilter">Filter by zipcode!</Label>
                  <Input type="number" id="zipcodeFilter" placeholder="Enter a zipcode" onChange={e => this.handleZipChange(e)}/>
                </FormGroup>
              </Row>

              <Row>
                <Button outline color="primary" onClick={this.gatherFilters}>Apply/Unapply filters</Button>
              </Row>
          </Form>
        </Container>
		);
	}

}

Filter.propTypes = {
    handler: PropTypes.function
  }