import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import PropTypes from "prop-types";

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

	render() {
		return(
			<Container>
          <Form>
              <Row><legend>Filter by:</legend></Row>
              <Row>

               <FormGroup check inline>
                  <Label for="ratingFilter">Rating of at least:</Label>
                  <Input type="number" min="0" max="5" ref="ratFilter" id="ratingFilter" placeholder="1-5" onChange={e => this.handleRatingChange(e)}
                    onKeyPress={this.enterPressed.bind(this)}/>
                </FormGroup>
              </Row>

              <br />

              <Row>
                <FormGroup>
                  <Label for="zipcodeFilter">Filter by zipcode</Label>
                  <Input type="number" ref="zipFilter" id="zipcodeFilter" placeholder="Enter a zipcode" onChange={e => this.handleZipChange(e)} 
                    onKeyPress={this.enterPressed.bind(this)}/>
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

Filter.propTypes = {
    handler: PropTypes.function
  }