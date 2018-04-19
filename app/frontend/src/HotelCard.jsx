import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import TacoRating from './TacoRating';
import NoImageFound from './assets/no_image_placeholder.png';

export default class HotelCard extends Component {
  render() {
    var h = this.props.hotel;

    let image = (h.image == null) ? NoImageFound : h.image;

    return (
      <div className="cardDiv">
        <Card>
          <Link to={'/hotels/' + h.id}><CardImg top width="100%" height="200em" src={image} alt="Card image cap" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText"><div className="wrap">{h.name}</div></CardTitle>
            <CardSubtitle></CardSubtitle>     
            <CardText className="cardSubText"><TacoRating rating={h.rating}/> <span style={{float: 'right'}}>Zip code: {h.zip_code}</span></CardText>
            <Link to={'/hotels/' + h.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

HotelCard.propTypes = {
    hotel: PropTypes.object
}