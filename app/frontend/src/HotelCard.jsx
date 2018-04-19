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

export default class HotelCard extends Component {
  render() {
    var h = this.props.hotel;

    let full_tacos = Math.floor(h.rating)
    let half_tacos = Math.ceil(h.rating) - full_tacos
    let gray_tacos = 5 - full_tacos - half_tacos

    var full_tacos_rating = [...Array(full_tacos)].map(function(idx) {
      return <img top width="20em" src={TacoFull}/>
    })

    var half_taco_rating = [...Array(half_tacos)].map(function(idx) {
      return <img top width="20em" src={TacoHalf}/>
    })

    var gray_taco_rating = [...Array(gray_tacos)].map(function(idx) {
      return <img top width="20em" src={TacoGray}/>
    })

    let image = (h.image == null) ? NoImageFound : h.image;

    return (
      <div className="cardDiv">
        <Card>
          <Link to={'/hotels/' + h.id}><CardImg top width="100%" height="200em" src={image} alt="Card image cap" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText"><div className="wrap">{h.name}</div></CardTitle>
            <CardSubtitle></CardSubtitle>     
            <CardText className="cardSubText"><span>{full_tacos_rating}{half_taco_rating}{gray_taco_rating}</span> <span style={{float: 'right'}}>Zip code: {h.zip_code}</span></CardText>
            <Link to={'/hotels/' + h.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

HotelCard.propTypes = {
    hotel: PropTypes.object
}