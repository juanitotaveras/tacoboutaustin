import React, { Component, Text } from 'react';
import './CardStyles.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import NoImageFound from './assets/no_image_placeholder.png';
import TacoRating from './TacoRating';

export default class AttractionCard extends Component {
  render(props) {
    var a = this.props.attraction;

    let image = (a.image == null) ? NoImageFound : a.image;

    return (
      <div className="cardDiv">
        <Card>
          <Link to={'/attractions/' + a.id}><CardImg top width="100%" height="200em" src={image} alt="Card image cap" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText"><div className="wrap">{a.name}</div></CardTitle>
            <CardSubtitle>{a.type}</CardSubtitle>
            <CardText className="cardSubText"><TacoRating rating={a.rating}/><span style={{float: 'right'}}>Zip code: {a.zip_code}</span></CardText>
            <Link to={'/attractions/' + a.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

AttractionCard.propTypes = {
    attraction: PropTypes.object
}
