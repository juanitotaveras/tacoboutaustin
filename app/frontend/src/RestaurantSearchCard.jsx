import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Highlighter from './Highlighter';
import NoImageFound from './assets/no_image_placeholder.png';
import './App.css';

export default class RestaurantCard extends Component {

  render(props) {
    var r = this.props.restaurant;
    let spans = new Highlighter().getHighlightedTerms(r.name, this.props.searchTerms);
    let image = (r.image == null) ? NoImageFound : r.image;
    return (
      <div>
        <Card className="cardDiv">
          <Link to={'/restaurants/' + r.id}><CardImg top width="100%" height="200em" src={image} alt="Le food" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText">{spans}</CardTitle>
            <CardSubtitle>{r.food}</CardSubtitle>
            <CardText className="cardSubText"><span>Rating: {r.rating}/5</span> <span style={{float: 'right'}}>Zip code: {r.zip_code}</span></CardText>
            <Link to={'/restaurants/' + r.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

RestaurantCard.propTypes = {
    restaurant: PropTypes.object,
    searchTerms: PropTypes.array
  }
