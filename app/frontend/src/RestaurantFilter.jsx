import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, Row, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import PropTypes from "prop-types";

export default class RestaurantFilter extends Component {

  constructor(props) {
    super(props);
    this.gatherFilters = this.gatherFilters.bind(this);
    this.unapplyFilters = this.unapplyFilters.bind(this);
    this.state = {
      rating: 0,
      zipcode: 0,
      open: false,
      selectedOption: '',
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

  enterPressed(event) {
    var code = event.keyCode || event.which;
      if(code === 13) { //13 is the enter keycode
          this.gatherFilters();
      } 
  }

   handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // console.log(`Selected: ${selectedOption.label}`);
  }

  render() {
     const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return(
      <Row>
          <Form>
              <Col xs="12"><legend>Filter by:</legend></Col>
              <Col xs="12">

               <FormGroup check inline>
                  <Label for="ratingFilter">Rating of at least:</Label>
                  <Input type="number" min="0" max="5" ref="ratFilter" id="ratingFilter" placeholder="1-5" onChange={e => this.handleRatingChange(e)}
                  onKeyPress={this.enterPressed.bind(this)}/>
                </FormGroup>
              </Col>

              <br />

              <Col xs="12">
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" ref="openFilter" onChange={e => this.handleHourChange(e)} onKeyPress={this.enterPressed.bind(this)}/>Show what's open right now
                  </Label>
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

              <Row>
               <Select
                  name="form-field-name"
                  value={value}
                  onChange={this.handleChange}
                  options={[
                    { value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' },
                  ]}
                />
              </Row>

              <br />

             <Col xs="12">

                <Button outline color="primary" onClick={this.gatherFilters}>Apply filters</Button>
              </Col>
              <Col xs="12">
                <Button outline color="primary" onClick={this.unapplyFilters}>Clear all filters</Button>
              </Col>
          </Form>
        </Row>
    );
  }

}

RestaurantFilter.propTypes = {
    handler: PropTypes.function
  }