import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, Row, Col } from 'reactstrap';

export default class HotelJumbotron extends Component {
  render(props) {
    return (
    <div>
      <Jumbotron>
        <h1 className="display-3">{this.props.name}</h1>
        <p className="lead">{this.props.rating}<br/>
        {this.props.address}</p>
        <img top width="50%" height="300em" src={this.props.image} alt="Card image cap" />
        <img top width="50%" height="300em" src={this.props.map} alt="Card image cap" />
        <p></p>
        <hr className="my-2" />
        <p><b>Amenities</b><br/>
        {this.props.amenities}</p>
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

HotelJumbotron.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  image: PropTypes.string,
  map: PropTypes.string,
  reviews: PropTypes.string,
  amenities: PropTypes.string
};