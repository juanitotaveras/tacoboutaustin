import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, Row, Col } from 'reactstrap';

export default class RestaurantJumbotron extends Component {
  render(props) {
    return (
    <div>
      <Jumbotron>
        <h1 className="display-3">{this.props.name}</h1>
        <p className="lead">{this.props.rating}<br/>
        {this.props.foodtype}</p>
        <img top width="50%" height="300em" src={this.props.image} alt="Card image cap" />
        <img top width="50%" height="300em" src={this.props.map} alt="Card image cap" />
        <p></p>
        <hr className="my-2" />
        <p><b>Opening hours</b><br/>
        {this.props.hours}</p>
        <p><b>Reviews</b><br/>
        <blockquote><q>{this.props.reviews}</q></blockquote></p>
        <p><b>More pictures</b></p>
        <Row>
          <Col>
            <img top width="100%" height="100em" src={this.props.image} alt="Card image cap" />
          </Col>
          <Col>
            <img top width="100%" height="100em" src={this.props.image} alt="Card image cap" />
          </Col>
          <Col>
            <img top width="100%" height="100em" src={this.props.image} alt="Card image cap" />
          </Col>
          <Col>
            <img top width="100%" height="100em" src={this.props.image} alt="Card image cap" />
          </Col>
          <Col>
            <img top width="100%" height="100em" src={this.props.image} alt="Card image cap" />
          </Col>
          <Col>
            <img top width="100%" height="100em" src={this.props.image} alt="Card image cap" />
          </Col>
        </Row>
        <br/>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
    </div>
  )};
}

RestaurantJumbotron.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.string,
  foodtype: PropTypes.string,
  image: PropTypes.string,
  map: PropTypes.string,
  hours: PropTypes.string,
  reviews: PropTypes.string
};