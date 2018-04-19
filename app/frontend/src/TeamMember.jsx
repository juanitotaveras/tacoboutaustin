import React, { Component } from 'react';
import './App.css';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

export default class TeamMember extends Component {
	constructor(props) {
		super(props);
	}
	render(props) {
		return (
			<Card className="about-card">
              <CardImg top width="300em" height="300em" className="about-card-img" src={this.props.imageSrc} alt={this.props.imageAlt}/>
              <CardBody>
                <CardTitle className="cardTitleText about-card-name"> {this.props.name}</CardTitle>
                <CardSubtitle className="cardSubText about-card-description"> {this.props.bio}</CardSubtitle>
                <br />
                <CardText className="cardSmallText"> 
                  Responsibilities: {this.props.responsibilities} <br/>
                  Commits: {this.props.commits}, Issues: {this.props.issues}, Unit Tests: {this.props.unitTests}
                </CardText>
              </CardBody>
            </Card>);
	}
}