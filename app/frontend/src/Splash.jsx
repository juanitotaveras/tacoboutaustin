import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
  Row, 
  Col
} from 'reactstrap';
import austin_skyline from './assets/austin_skyline.jpg';
import austin_taco from './assets/austin_taco.jpg';
import austin_pool from './assets/austin_pool.jpg';
import austin_hotel from './assets/austin_hotel.jpg';
import './splash.css';

const items = [
  {
    src: austin_skyline,
    altText: 'Austin, Texas',
    caption: 'WELCOME TO AUSTIN'
  },
  {
    src: austin_taco,
    altText: 'Where to eat',
    caption: 'EXPLORE FOOD'
  },
  {
    src: austin_pool,
    altText: 'Where to chill',
    caption: 'EXPLORE ATTRACTIONS'
  },
  {
    src: austin_hotel,
    altText: 'Where to stay',
    caption: 'EXPLORE HOTELS'
  },
  
];


export default class Splash extends Component {
	constructor(props) {
	    super(props);
	    this.state = { activeIndex: 0 };
	    this.next = this.next.bind(this);
	    this.previous = this.previous.bind(this);
	    this.goToIndex = this.goToIndex.bind(this);
	    this.onExiting = this.onExiting.bind(this);
	    this.onExited = this.onExited.bind(this);
  	}

	onExiting() {
	    this.animating = true;
	}

	onExited() {
	  	this.animating = false;
	}

	next() {
    	if (this.animating) return;
    	const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    	this.setState({ activeIndex: nextIndex });
  	}

	previous() {
    	if (this.animating) return;
    	const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    	this.setState({ activeIndex: nextIndex });
	}

  	goToIndex(newIndex) {
    	if (this.animating) return;
    	this.setState({ activeIndex: newIndex });
	}

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="nav-carousel-item"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src} 
          >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption className="c-caption" captionText={item.caption} captionHeader={item.altText} />
        </CarouselItem>
      );
    });

    return (
	      <Carousel
	        activeIndex={activeIndex}
	        next={this.next}
	        previous={this.previous}
	      >
	        {slides}
	        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
	        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
	      </Carousel>
  )};
}

