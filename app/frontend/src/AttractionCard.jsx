import React, { Component, Text } from 'react';
import './CardStyles.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import TacoFull from './assets/taco_full.png';


export default class AttractionCard extends Component {
  render(props) {
    var a = this.props.attraction;

    var taco_rating = [...Array(Math.floor(a.rating))].map(function(review) {
      return <img top width="20em" src={TacoFull}/>
    })

    return (
      <div>
        <Card>
          <Link to={'/attractions/' + a.id}><CardImg top width="100%" height="200em" src={a.image} alt="Card image cap" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText"><div className="wrap">{a.name}</div></CardTitle>
            <CardSubtitle>{a.type}</CardSubtitle>
            <CardText className="cardSubText"><span>Rating: {taco_rating}</span> <span style={{float: 'right'}}>Zip code: {a.zip_code}</span></CardText>
            <Link to={'/attractions/' + a.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

AttractionCard.propTypes = {
    attraction: PropTypes.object
}
