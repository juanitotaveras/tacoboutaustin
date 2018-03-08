import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Button, Row, Col } from 'reactstrap';

export default class HotelJumbotron extends Component {
  render(props) {
    var all_reviews = this.props.reviews.map(function(review){
      return <p>{review.text}<a href={review.link}>read more!</a></p>
    })

    return (
    <div>
      <Jumbotron>
        <h1 className="display-3">{this.props.name}</h1>
        <p className="lead">{this.props.rating}/5<br/>
        {this.props.address}</p>
        <Row>
          <img top width="50%" height="400em" src={this.props.images[0]} alt="Card image cap" />
          <iframe top width="50%" height="400em" frameborder="0" src={this.props.map_src} allowfullscreen>
          </iframe>
        </Row>
        <p></p>
        <hr className="my-2" />
        <p><b>Reviews</b><br/>
        <blockquote><q>{all_reviews}</q></blockquote></p>
        <p><b>More pictures</b></p>
        <Row>
          <Col>
            <img top width="100%" height="100em" src={this.props.images[1]} alt="Card image cap" />
          </Col>
          <Col>
            <img top width="100%" height="100em" src={this.props.images[2]} alt="Card image cap" />
          </Col>
          <Col>
            <img top width="100%" height="100em" src={this.props.images[0]} alt="Card image cap" />
          </Col>
          <Col>
            <img top width="100%" height="100em" src={this.props.images[0]} alt="Card image cap" />
          </Col>
          <Col>
            <img top width="100%" height="100em" src={this.props.images[0]} alt="Card image cap" />
          </Col>
          <Col>
            <img top width="100%" height="100em" src={this.props.images[0]} alt="Card image cap" />
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
  images: PropTypes.object,
  map_src: PropTypes.string,
  reviews: PropTypes.object,
  amenities: PropTypes.string
};