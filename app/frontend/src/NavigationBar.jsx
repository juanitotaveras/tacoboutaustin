import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
  Container,
  Row,
  Col } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() { 
    return (
      <div>
        <Container>
          <Row>
            <Navbar color="faded" light expand="md">
              <NavbarBrand href="/"><img src="https://www.tacobueno.com/assets/food/tacos/Taco_BFT_Beef_990x725.jpg" 
              height="30" width="30" /></NavbarBrand>
              <Nav pills>
                <NavItem>
                  <NavLink href="/restaurants">Restaurants</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/attractions">Attractions</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/hotels">Hotels</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about">About</NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </Row>
        </Container>
      </div>
    );
  }
}



