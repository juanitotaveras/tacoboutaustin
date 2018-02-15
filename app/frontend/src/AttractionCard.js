import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class AttractionCard extends Component {
  render() {
    var a = this.props.attraction;
    return (
      <div>
        <Card>
          <CardImg top width="100%" height="200em" src={a.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{a.name}</CardTitle>
            <CardSubtitle>{a.type}</CardSubtitle>
            <CardText>{a.rating}</CardText>
            <Button outline ><Link to={'/attractions/' + a.id}>Check it out!</Link></Button>
          </CardBody>
        </Card>
      </div>
  )};
}

AttractionCard.propTypes = {
    attraction: PropTypes.object
}
