import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import { render, shallow, mount } from 'enzyme';
import { withRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import Attractions from '../src/Attractions';

const wrapper = render(withRouter(<Attractions />));

describe('Attractions Component', () => {
  it('renders h1', () => {
    expect(wrapper.find('h1').text()).to.equal('Attractions')
  })
})