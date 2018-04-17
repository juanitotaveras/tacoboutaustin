import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import TacoFull from './assets/taco_full.png';

export default class HotelCard extends Component {
  render() {
    var h = this.props.hotel;

    var taco_rating = [...Array(Math.floor(h.rating))].map(function(review) {
      return <img top width="20em" src={TacoFull}/>
    })

    return (
      <div>
        <Card>
          <Link to={'/hotels/' + h.id}><CardImg top width="100%" height="200em" src={h.image} alt="Card image cap" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText"><div className="wrap">{h.name}</div></CardTitle>
            <CardSubtitle></CardSubtitle>     
            <CardText className="cardSubText"><span>Rating: {taco_rating}</span> <span style={{float: 'right'}}>Zip code: {h.zip_code}</span></CardText>
            <Link to={'/hotels/' + h.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

HotelCard.propTypes = {
    hotel: PropTypes.object
}