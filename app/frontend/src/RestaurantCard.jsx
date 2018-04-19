import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import TacoFull from './assets/taco_full.png';
import TacoHalf from './assets/taco_half.png';
import TacoGray from './assets/taco_gray.png';
import NoImageFound from './assets/no_image_placeholder.png';

export default class RestaurantCard extends Component {
  render(props) {
    var r = this.props.restaurant;

    let full_tacos = Math.floor(r.rating)
    let half_tacos = Math.ceil(r.rating) - full_tacos
    let gray_tacos = 5 - full_tacos - half_tacos

    var full_tacos_rating = [...Array(full_tacos)].map(function(idx) {
      return <img top width="20em" src={TacoFull}/>
    });

    var half_taco_rating = [...Array(half_tacos)].map(function(idx) {
      return <img top width="20em" src={TacoHalf}/>
    });

    var gray_taco_rating = [...Array(gray_tacos)].map(function(idx) {
      return <img top width="20em" src={TacoGray}/>
    });

    let image = (r.image == null) ? NoImageFound : r.image;

    return (
      <div>
        <Card>
          <Link to={'/restaurants/' + r.id}><CardImg top width="100%" height="200em" src={image} alt="Le food" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText"><div className="wrap">{r.name}</div></CardTitle>
            <CardSubtitle>{r.food}</CardSubtitle>
            <CardText className="cardSubText">
              <span>{full_tacos_rating}{half_taco_rating}{gray_taco_rating}</span> <span style={{float: 'right'}}>Zip code: {r.zip_code}</span>
            </CardText>
            <Link to={'/restaurants/' + r.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

RestaurantCard.propTypes = {
    restaurant: PropTypes.object
  }
