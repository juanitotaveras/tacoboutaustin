import React, { Component, Text } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Highlighter from './Highlighter';
import NoImageFound from './assets/no_image_placeholder.png';

export default class AttractionCard extends Component {
  render(props) {
    var a = this.props.attraction;
    let spans = new Highlighter().getHighlightedTerms(a.name, this.props.searchTerms);
    let image = (a.image == null) ? NoImageFound : a.image;
    return (
      <div>
        <Card>
          <Link to={'/attractions/' + a.id}><CardImg top width="100%" height="200em" src={image} alt="Card image cap" /></Link>
          <CardBody>
            <CardTitle className="cardTitleText">{spans}</CardTitle>
            <CardSubtitle>{a.type}</CardSubtitle>
            <CardText className="cardSubText"><span>Rating: {a.rating}/5</span> <span style={{float: 'right'}}>Zip code: {a.zip_code}</span></CardText>
            <Link to={'/attractions/' + a.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

AttractionCard.propTypes = {
    attraction: PropTypes.object,
    searchTerms: PropTypes.array
}
