import React, { Component } from 'react';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

export default class TeamMember extends Component {
	constructor(props) {
		super(props);
	}
	render(props) {
		return (
			<Card className="about-card">
              <CardImg top width="100%" height="100%" className="about-card-img" src={this.props.imageSrc} alt={this.props.imageAlt}/>
              <CardBody>
                <CardTitle className="cardTitleText about-card-name"> {this.props.name}</CardTitle>
                <CardSubtitle className="cardSubText about-card-description"> {this.props.bio}</CardSubtitle>
                <br />
                <CardText> 
                  <span className="medPlusText">Responsibilities: {this.props.responsibilities} <br/></span>
                  <span  className="medText">
                  Commits: {this.props.commits}, Issues: {this.props.issues}, Unit Tests: {this.props.unitTests}
                  </span>
                </CardText>
              </CardBody>
            </Card>);
	}
}