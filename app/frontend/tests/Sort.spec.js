import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { withRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import Sort from '../src/Sort';
import { Button } from "reactstrap";

const wrapper = mount(<Sort />);

describe('Sort Component', () => {
  it('has a sort by rating button', () => {
    expect(wrapper.find(Button).first().text()).to.equal("Highest Rating");
  }),

  it('has a sort alphabetically ascending button', () => {
    expect(wrapper.find(Button).at(1).text()).to.equal("Alphabetical (ascending)");
  }),

  it('has an clear sort button', () => {
    expect(wrapper.find(Button).at(2).text()).to.equal("Clear sort");
  })

})

