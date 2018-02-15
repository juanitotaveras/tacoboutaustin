import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import tacoLogo from './assets/taco_logo.png';
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

  const navButtonStyle = {
    textColor: 'white',
    color: 'white'
  };

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

  render(props) { 
    return (
      <div style={navButtonStyle}>
        <Navbar color="dark" light expand="md">
          <NavbarBrand href="/"><img src={tacoLogo} height="60em" width="60em" /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="navbar text-white container-fluid" navbar>
                 <NavItem>
                   <NavLink href="/restaurants"><h3 className="text-white">Restaurants</h3></NavLink>
                 </NavItem>
                 <NavItem>
                   <NavLink href="/attractions"><h3 className="text-white">Attractions</h3></NavLink>
                 </NavItem>
                 <NavItem>
                   <NavLink href="/hotels"><h3 className="text-white">Hotels</h3></NavLink>
                 </NavItem>
                 <NavItem>
                   <NavLink href="/about"><h3 className="text-white">About</h3></NavLink>
                 </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}



