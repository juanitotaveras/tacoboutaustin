import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class HotelDetails extends Component {
	render(props)
	{
		return(
			<Container>
				<Row>
				  <Col sm="12">
					<h1>Hotel Details {this.props.id}</h1>
				  </Col>
				</Row>
				<Row>
                  <Col sm="5">
                    <img src="http://texashillcountry.com/wp-content/uploads/2014/02/Four-Season-Hotel-Austin-640x321.jpg" alt="Card image cap" />
                  </Col>
                  <Col sm="2">
                  </Col>
                  <Col sm="5">
                    <img src="https://snazzy-maps-cdn.azureedge.net/assets/1243-xxxxxxxxxxx.png?v=20170626083204" alt="Map"/>
                  </Col>
				</Row>

				<Row>
				  <Col sm="5">
				  

				  </Col>
				  <Col sm="2">

				  </Col>
				  <Col sm="5">

				  </Col>


				</Row>
			</Container>
		);
	}

}