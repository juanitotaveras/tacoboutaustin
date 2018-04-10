import React, { Component, Text } from 'react';
import './CardStyles.css';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class AttractionCard extends Component {
  render(props) {
    var a = this.props.attraction;
    return (
      <div>
        <Card>
          <Link to={'/attractions/' + a.id}><CardImg top width="100%" height="200em" src={a.image} alt="Card image cap" /></Link>
          <CardBody>
            <CardTitle><div className="wrap">{a.name}</div></CardTitle>
            <CardSubtitle>{a.type}</CardSubtitle>
            <CardText ><span>Rating: {a.rating}/5</span> <span style={{float: 'right'}}>Zip code: {a.zip_code}</span></CardText>
            <Link to={'/attractions/' + a.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

AttractionCard.propTypes = {
    attraction: PropTypes.object
}
