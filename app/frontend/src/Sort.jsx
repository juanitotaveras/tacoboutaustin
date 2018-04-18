import React, { Component } from 'react';
import { Container, Form, Row, Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


var sort_options = [
{
  label: "Rating (descending)",
  value: 0
},
{
  label: "Rating (ascending)",
  value: 1
},
{
  label: "Alphabetical (ascending)",
  value: 2
},
{
  label: "Alphabetical (descending)",
  value: 3
}
];
export default class Sort extends Component {

	render() {
		return(
		 <Container>
          <Form>
              <Row><legend>Sort by:</legend>
                <Col xs="12">
                  <Select 
                  options={sort_options}

                />
              </Col></Row>
          </Form>
        </Container>
		);
	}

}

Sort.propTypes = {
    handler: PropTypes.function
  }