import React, { Component } from 'react';
import './App.css';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

export default class TeamMember extends Component {
	constructor(props) {
		super(props);
	}
	render(props) {
		return (
			<Card>
              <CardImg top width="50%" height="200em" src={this.props.imageSrc} alt={this.props.imageAlt}/>
              <CardBody>
                <CardTitle> {this.props.name}</CardTitle>
                <CardSubtitle> {this.props.bio}</CardSubtitle>
                <CardText> 
                  {this.props.responsibilities} <br/>
                  Commits: {this.props.commits} <br/>
                  Issues: {this.props.issues} <br/>
                  Unit Tests: {this.props.unitTests}

                </CardText>
              </CardBody>
            </Card>);
	}
}