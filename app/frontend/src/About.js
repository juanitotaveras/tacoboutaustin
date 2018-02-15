import React, { Component } from 'react';
import './App.css';
import Caroline from './assets/about_caroline.JPG'
import An from './assets/about_an.jpg'
import Eduardo from './assets/about_eduardo.jpg'
import James from './assets/about_james.jpeg'
import Juanito from './assets/about_juanito.jpg'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Jumbotron,
  Container,
  Row,
  Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
  var styles = {
	color:'red',
	backgroundColor:'black',
	fontWeight:'bold'
  }; 
 
class About extends Component {
 render() {
    return (
    	<div styles={styles}>
      <Container>
          <Row>
          <Col>
    	<Jumbotron>
    	      <h1 className="display-3">Where am I?</h1>
      <p className="lead">Tacoboutaustin is your one-stop shop to find out 
      where to sleep, where to eat, and what to do in Austin, Texas.</p>
      <p>Kids and adults alike will find this site useful, but keep 
      in mind that for several attractions you must be at 
      least 18 or 21 years of age. </p>
      <p className="my-2">
      We have a large selection of hotels, restaurants, 
      and attractions that are organized by location in our beautiful city.
      </p>
    	</Jumbotron>
          </Col>
        </Row>
        <Row>
	<h1> About the team </h1>	
          </Row>
       <Row>
          <Col xs="12" sm="4">
            <Card>
              <CardImg top width="50%" src={Eduardo} alt="About An"/>
              <CardBody>
                <CardTitle> Card title</CardTitle>
                <CardSubtitle> Card subtitle</CardSubtitle>
                <CardText> Some filler text</CardText>
              </CardBody>
            </Card>
 
          </Col>
          <Col cs="12" sm="4">
            <Card>
              <CardImg top width="50%" src={Caroline} alt="About An"/>
              <CardBody>
                <CardTitle> Card title</CardTitle>
                <CardSubtitle> Card subtitle</CardSubtitle>
                <CardText> Some filler text</CardText>
              </CardBody>
            </Card>
 
          </Col>
          <Col xs="12" sm="4">
            <Card>
              <CardImg top width="50%" src={An} alt="About An"/>
              <CardBody>
                <CardTitle> Card title</CardTitle>
                <CardSubtitle> Card subtitle</CardSubtitle>
                <CardText> Some filler text</CardText>
              </CardBody>
            </Card>
 
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardImg top width="50%" src={Juanito} alt="About An"/>
              <CardBody>
                <CardTitle> Card title</CardTitle>
                <CardSubtitle> Card subtitle</CardSubtitle>
                <CardText> Some filler text</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col cs="12" sm="6">
            <Card>
              <CardImg top width="50%" src={James}/>
            </Card>
          </Col>
        </Row>
 
      </Container>
      </div>
    );
  }
}

export default About;
