import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { withRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import Sort from '../src/Sort';
import { Button } from "reactstrap";
import Select from 'react-select';

var sort_options = [
{
  label: "Rating (descending)",
  value: "rating_desc"
},
{
  label: "Rating (ascending)",
  value: "rating_asc"
},
{
  label: "Alphabetical (ascending)",
  value: "name_asc"
},
{
  label: "Alphabetical (descending)",
  value: "name_desc"
}, 
{
  label: "No Sorting",
  value: ''
}
];

function handleSortChange() {
	return null;
}

const wrapper = mount(<Sort handler={handleSortChange}/>);

describe('Sort Component', () => {
  it('has a sort label', () => {
    expect(wrapper.contains(<span className="cardTitleText">Sort by:</span>)).to.equal(true);
  }),

  it('has a sort select component', () => {
  	expect(wrapper.contains(
  			<Select 
              options={sort_options}
              value=''
              onChange={handleSortChange}
            />
  		))
  })
})

