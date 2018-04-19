import React, { Component } from 'react';
import { Container, Form, Row, Button, Col, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


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

export default class Sort extends Component {

  constructor(props) {
    super(props);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      sortType: ''
    };
  }

  handleSortChange = (sortType) => {
    if(sortType != null) {
      this.setState({ sortType: sortType.value });
      this.props.handler(sortType.value);
    } else {
      this.setState({ sortType: '' });
      this.props.handler('');
    }
  }

	render() {
		return(
		 <Container>
          <Form>
              <Row><legend> <span className="cardTitleText">Sort by:</span></legend>
                  <Col>
                  <Select 
                  options={sort_options}
                  value={this.state.sortType}
                  onChange={this.handleSortChange}
                /></Col>
              </Row>
          </Form>
        </Container>
		);
	}

}

Sort.propTypes = {
    handler: PropTypes.function
  }