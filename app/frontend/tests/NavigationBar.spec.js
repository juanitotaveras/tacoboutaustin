import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { withRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import NavigationBar from '../src/NavigationBar';
import { NavItem, NavLink } from 'reactstrap';

const wrapper = mount(<NavigationBar />);

describe('NavigationBar Component', () => {
  it('renders 5 NavItems', () => {
    expect(wrapper.find(NavItem)).to.have.length(5);
  }),

  it('has 5 NavLinks, one for each NavItem', () => {
    expect(wrapper.find(NavLink)).to.have.length(5);
  }),

  it('has the correct label for the first NavItem', () => {
    expect(wrapper.find(NavItem).first().text()).to.equal('Restaurants');
  }),

  it('has the correct label for the second NavItem', () => {
    expect(wrapper.find(NavItem).at(1).text()).to.equal('Attractions');
  }),

  it('has the correct label for the third NavItem', () => {
    expect(wrapper.find(NavItem).at(2).text()).to.equal('Hotels');
  }),

  it('has the correct label for the fourth NavItem', () => {
    expect(wrapper.find(NavItem).at(3).text()).to.equal('About');
  }),

  it('has the correct label for the last NavItem', () => {
    expect(wrapper.find(NavItem).at(4).text()).to.equal('Search');
  })
})

