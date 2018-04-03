import React, { Component } from 'react';
import {Container, Form, Row, FormGroup, Label, Input} from 'reactstrap';

export default class Filter extends Component {

	render() {
		return(
			<Container>
          <Form>
              <Row><legend>Select by:</legend></Row>
              <Row>
               <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" />High rating!
                  </Label>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" />Open now!
                  </Label>
                </FormGroup>
              </Row>

              <br />

              <Row>
                <FormGroup>
                  <Label for="searchZipcode">Search by zipcode!</Label>
                  <Input type="number" id="searchZipcode" placeholder="Enter a zipcode..."/>
                </FormGroup>
              </Row>
          </Form>
        </Container>
		);
	}

}