import React, { Component } from 'react';
import { Container, Form, Row, Button } from 'reactstrap';
import PropTypes from 'prop-types';


export default class Sort extends Component {

	render() {
		return(
		 <Container>
          <Form>
              <Row><legend>Sort by:</legend></Row>
              <Row><Button outline color="primary">Highest Rating</Button>{' '}</Row>
              <Row><Button outline color="primary"
              onClick = {() => this.props.handler("name")}>Alphabetical</Button>{' '}</Row>
          </Form>
        </Container>
		);
	}

}

Sort.propTypes = {
    handler: PropTypes.object
  }