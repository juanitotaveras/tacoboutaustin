import React from 'react';
import expect from 'expect';
import Enzyme from 'enzyme';
import { render, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import Attractions from '../src/Attractions';

const wrapper = render(<Attractions />);

describe('Attractions Component', () => {
  it('renders h3', () => {
    expect(wrapper.find('h1').text()).toEqual('Attractions')
  })
})