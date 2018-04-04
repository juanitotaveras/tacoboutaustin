import React, { Component } from 'react';
import { Container, Form, Row, Button } from 'reactstrap';
import PropTypes from 'prop-types';


export default class Sort extends Component {

	render() {
		return(
		 <Container>
          <Form>
              <Row><legend>Sort by:</legend></Row>
              <Row><Button outline color="primary"
              onClick= {() => this.props.handler("rating")}>Highest Rating</Button>{' '}</Row>
              <Row><Button outline color="primary"
              onClick = {() => this.props.handler("name")}>Alphabetical (ascending)</Button>{' '}</Row>
              <Row><Button outline color="primary"
              onClick = {() => this.props.handler(null)}>Clear sort</Button>{' '}</Row>
          </Form>
        </Container>
		);
	}

}

Sort.propTypes = {
    handler: PropTypes.function
  }