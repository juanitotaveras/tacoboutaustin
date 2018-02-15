import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class AttractionCard extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>{this.props.type}</CardSubtitle>
            <CardText>{this.props.rating}</CardText>
            <Button outline ><Link to={'/attractions/' + this.props.id}>Check it out!</Link></Button>
          </CardBody>
        </Card>
      </div>
  )};
}

AttractionCard.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    rating: PropTypes.string
  }
