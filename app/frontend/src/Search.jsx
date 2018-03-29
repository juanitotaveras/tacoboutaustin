import React, { Component } from 'react';
import { Input, InputGroup, Button, Container, Row } from 'reactstrap';

export default class Search extends Component {


	render() {
		return(
			<div>
				<Container>
					<Row>	
						<h1>Search</h1>
					</Row>
					<Row>
						<InputGroup>
			               {/* <i class="fas fa-search" style={styles}></i>*/}
			                <Input placeholder="Search something..." />
			                <Button color="secondary">Search!</Button>
			              </InputGroup>
		            </Row>
	         	</Container>
	        </div>
		);
	}

}