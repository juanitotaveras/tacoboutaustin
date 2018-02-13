import React from 'react';
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
  DropdownItem } from 'reactstrap';

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
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/"><img src="https://www.tacobueno.com/assets/food/tacos/Taco_BFT_Beef_990x725.jpg" 
          height="30" width="30" /></NavbarBrand>
          <Nav pills>
            <NavItem>
              <NavLink href="#" active>Restaurants</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Attractions</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Hotels</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}



