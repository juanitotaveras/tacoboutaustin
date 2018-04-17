import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import TacoFull from './assets/taco_full.png';

export default class RestaurantCard extends Component {
  render(props) {
    var r = this.props.restaurant;

    var taco_rating = [...Array(Math.floor(r.rating))].map(function(review) {
      return <img top width="20em" src={TacoFull}/>
    })
    
    return (
      <div>
        <Card>
          <Link to={'/restaurants/' + r.id}><CardImg top width="100%" height="200em" src={r.image} alt="Le food" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText">{r.name}</CardTitle>
            <CardSubtitle>{r.food}</CardSubtitle>
            <CardText className="cardSubText"><span>Rating: {taco_rating}</span> <span style={{float: 'right'}}>Zip code: {r.zip_code}</span></CardText>
            <Link to={'/restaurants/' + r.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

RestaurantCard.propTypes = {
    restaurant: PropTypes.object
  }
