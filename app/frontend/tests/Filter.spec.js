import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { withRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import Filter from '../src/Filter';
import { Button, Input, Label } from "reactstrap";

const wrapper = mount(<Filter />);

describe('Filter Component', () => {
  it('has a filter by rating label', () => {
    expect(wrapper.contains(<Label for="ratingFilter">Rating of at least:</Label>)).to.equal(true);
  }),

  it('has a filter by zipcode label', () => {
    expect(wrapper.contains(<Label for="zipcodeFilter">Filter by zipcode</Label>)).to.equal(true);
  }),

  it('has an apply filters button', () => {
    expect(wrapper.find(Button).first().text()).to.equal("Apply filters");
  }),

  it('has a clear all filters button', () => {
    expect(wrapper.find(Button).at(1).text()).to.equal("Clear all filters");
  })

})

