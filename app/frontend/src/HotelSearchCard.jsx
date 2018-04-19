import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Highlighter from './Highlighter';

export default class HotelCard extends Component {
  render() {
    var h = this.props.hotel;
    let spans = new Highlighter().getHighlightedTerms(h.name, this.props.searchTerms);
    return (
      <div>
        <Card>
          <Link to={'/hotels/' + h.id}><CardImg top width="100%" height="200em" src={h.image} alt="Card image cap" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText">{spans}</CardTitle>
            <CardSubtitle></CardSubtitle>     
            <CardText className="cardSubText"><span>Rating: {h.rating}/5</span> <span style={{float: 'right'}}>Zip code: {h.zip_code}</span></CardText>
            <Link to={'/hotels/' + h.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

HotelCard.propTypes = {
    hotel: PropTypes.object,
    searchTerms: PropTypes.array
}