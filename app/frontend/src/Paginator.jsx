import React, { Component } from 'react';
import { Container, Row, Col, Button, Pagination, PaginationItem, 
  PaginationLink, Form, FormGroup, CardColumns } from 'reactstrap';

const NUM_PAGE_ITEMS = 7;

export default class Paginator extends Component {
  constructor(props) {
    super(props);
	let allPageItems = [];
    for (var i = 1; i < this.props.totalPages; ++i) {
    	allPageItems.push(this.makePageItem(i));
    } 

    this.state = {
      allPageItems: allPageItems,
      displayedPageItems: allPageItems
    };
    
  }

  handlePageClick(dest) {
  	this.props.onPageClicked(dest);
  }

  makePageItem(text, dest, highlighted=false) {
  	const link = 
  		<PaginationLink>
  			{text}
  		</PaginationLink>;
  	const item = (highlighted) ?
  		<div>
	  		<PaginationItem active>
	  			{link}
	  		</PaginationItem>
  		</div>
  		:
  		<div>
	  		<PaginationItem>
	  			{link}
	  		</PaginationItem>
  		</div>;

  	return (
  		<li onClick={() => this.handlePageClick(dest)}>
      		{item}
      	</li>
    );
  }

  makeDisplayedPageItems() {
  	let pageCount = this.state.allPageItems.length;
  	let activePage = this.props.activePage;

  	var displayedPageItems = []

  	if (pageCount <= NUM_PAGE_ITEMS) {
  		for (var i = 0; i < NUM_PAGE_ITEMS; ++i)
  			displayedPageItems.push(this.makePageItem(i+1, i, activePage == i));
  	} else {
  		if (activePage > (pageCount - NUM_PAGE_ITEMS)) {
  			displayedPageItems.push(this.makePageItem("First", 0, activePage == 0));
  			for (var i = pageCount-NUM_PAGE_ITEMS; i < pageCount; ++i)
  				displayedPageItems.push(this.makePageItem(i+1, i, activePage == i));
  		} else if (activePage < NUM_PAGE_ITEMS/2) {
  			for (var i = 0; i < NUM_PAGE_ITEMS; i++)
  				displayedPageItems.push(this.makePageItem(i+1, i, activePage == i));
  			displayedPageItems.push(this.makePageItem("Last", pageCount-1, activePage == pageCount-1));
  		} else {
  			displayedPageItems.push(this.makePageItem("First", 0, activePage == 0));
  			for (var i = activePage - Math.floor(NUM_PAGE_ITEMS/2); i < activePage + (NUM_PAGE_ITEMS/2); ++i)
  				displayedPageItems.push(this.makePageItem(i+1, i, activePage == i));
  			displayedPageItems.push(this.makePageItem("Last", pageCount-1, activePage == pageCount-1));

  		}
  	}
  	return displayedPageItems
  }

  render() {
  	return (
  		<Row>
  			<Col xs="0" sm="2" md="4"/>
  				<Col xs="12" sm="8" md="4">
			  		<Pagination size="lg" style={{float: "none", margin: "0 auto"}}>
			  			{this.makeDisplayedPageItems()}
			  		</Pagination>
		  		</Col>
	  		<Col xs="0" sm="2" md="4"/>
  		</Row>);
  }

}