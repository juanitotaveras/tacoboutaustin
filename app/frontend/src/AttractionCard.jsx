import React, { Component, Text } from 'react';
import './CardStyles.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import TacoFull from './assets/taco_full.png';
import TacoHalf from './assets/taco_half.png';
import TacoGray from './assets/taco_gray.png';
import NoImageFound from './assets/no_image_placeholder.png';

export default class AttractionCard extends Component {
  render(props) {
    var a = this.props.attraction;

    let full_tacos = Math.floor(a.rating)
    let half_tacos = Math.ceil(a.rating) - full_tacos
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

    let image = (a.image == null) ? NoImageFound : a.image;

    return (
      <div className="cardDiv">
        <Card>
          <Link to={'/attractions/' + a.id}><CardImg top width="100%" height="200em" src={image} alt="Card image cap" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText"><div className="wrap">{a.name}</div></CardTitle>
            <CardSubtitle>{a.type}</CardSubtitle>
            <CardText className="cardSubText"><span>{full_tacos_rating}{half_taco_rating}{gray_taco_rating}</span> <span style={{float: 'right'}}>Zip code: {a.zip_code}</span></CardText>
            <Link to={'/attractions/' + a.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

AttractionCard.propTypes = {
    attraction: PropTypes.object
}
