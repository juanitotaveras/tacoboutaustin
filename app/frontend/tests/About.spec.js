import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { withRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import About from '../src/About';
import TeamMember from '../src/TeamMember'
import { Button, Input, Label, Col } from "reactstrap";

const wrapper = mount(<About />);

describe('About Component', () => {
  it('has a team label', () => {
    expect(wrapper.contains(<h1>Meet the team: <b>Keepin' It Weird</b></h1>)).to.equal(true);
  }),

  it('displays the APIs we used', () => {
    expect(wrapper.contains(<a href="https://developers.google.com/maps/">Google maps</a>)).to.equal(true);
    expect(wrapper.contains(<a href="http://docs.sygictravelapi.com/1.0/">Sygic Travel</a>)).to.equal(true);
    expect(wrapper.contains(<a href="https://www.yelp.com/developers/documentation/v3">Yelp</a>)).to.equal(true);
  })

})

