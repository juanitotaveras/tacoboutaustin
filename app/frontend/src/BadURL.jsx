import React, { Component } from 'react';
import { Container } from 'reactstrap';

export default class BadURL extends Component {

	render() {
		return(
			<Container>
				<h1>Oops! You've entered a bad URL.</h1>
			</Container>
			);
	}

}