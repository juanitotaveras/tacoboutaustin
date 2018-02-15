import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, Row, Col } from 'reactstrap';

export default class RestaurantJumbotron extends Component {
  render(props) {
    return (
    <div>
      <Jumbotron>
        <h1 className="display-3">{this.props.name}</h1>
        <p className="lead">{this.props.foodtype}</p>
        <img top width="50%" height="300em" src={this.props.image} alt="Card image cap" />
        <img top width="50%" height="300em" src={this.props.map} alt="Card image cap" />
        <hr className="my-2" />
        <p>More info.</p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
    </div>
  )};
}

RestaurantJumbotron.propTypes = {
  name: PropTypes.string,
  foodtype: PropTypes.string,
  image: PropTypes.string,
  map: PropTypes.map
};