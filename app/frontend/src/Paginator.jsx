import React, { Component } from 'react';
import { Container, Row, Col, Button, Pagination, PaginationItem, 
  PaginationLink, Form, FormGroup, CardColumns } from 'reactstrap';

const NUM_PAGE_ITEMS = 7;

export default class Paginator extends Component {
  constructor(props) {
    super(props);     
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

  handlePageClick(dest) {
    this.props.onPageClicked(dest);
  }

   makePageItem(text, dest, highlighted=false) {
    const link = 
      <PaginationLink onClick={() => this.handlePageClick(dest)}>
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
      item
    );
  }

  makeDisplayedPageItems() {
      let pageCount = this.props.pageCount;

      // One indexed
      let activePage = this.props.activePage;
      var temp = []

      if (pageCount <= NUM_PAGE_ITEMS) {
        for (var i = 1; i <= pageCount; ++i)
          temp.push(this.makePageItem(i, i, activePage == i));
      } 

      // More pages than can display
      else {
        
        // On page 1-4
        if(activePage <= Math.ceil(NUM_PAGE_ITEMS/2)) {
            for (var i = 1; i < NUM_PAGE_ITEMS; i++) {
              temp.push(this.makePageItem(i, i, activePage == i));
            }
            temp.push(this.makePageItem("Last", pageCount, activePage == pageCount));
        }

        // On one of the last pages
        else if(activePage >= pageCount - Math.floor(NUM_PAGE_ITEMS/2)) {
          temp.push(this.makePageItem("First", 1, activePage == 1));
          for (var i = pageCount - NUM_PAGE_ITEMS + 1; i <= pageCount; i++) {
            temp.push(this.makePageItem(i, i, activePage == i));
          }
        }

        // In the middle
        else {
            temp.push(this.makePageItem("First", 1, false));
            for (var i = activePage - Math.floor(NUM_PAGE_ITEMS/2)+1; i < activePage + Math.floor(NUM_PAGE_ITEMS/2); ++i) {
              temp.push(this.makePageItem(i, i, activePage == i));
            }
            temp.push(this.makePageItem("Last", pageCount, false));
          }
        }        

      return temp;
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