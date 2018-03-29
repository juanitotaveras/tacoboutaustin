import React, { Component } from 'react';
import { Container, Form, Row, Button } from 'reactstrap';

export default class Sort extends Component {


	render() {
		return(
		 <Container>
              <Form>
                  <Row><legend>Sort by:</legend></Row>
                  <Row><Button outline color="primary">Highest Rating</Button>{' '}</Row>
                  <Row><Button outline color="primary">Alphabetical</Button>{' '}</Row>
              </Form>
            </Container>
		);
	}

}