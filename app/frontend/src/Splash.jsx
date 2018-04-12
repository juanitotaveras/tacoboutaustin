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

const items = [
  {
    src: austin_skyline,
    altText: 'Austin, Texas',
    caption: 'Explore Austin!'
  },
  {
    src: 'https://2u0yuyu2fs02fa819ut739hy-wpengine.netdna-ssl.com/wp-content/uploads/2017/05/crescent39.jpg',
    altText: 'Postcard',
    caption: 'Every tourist ever'
  },
  {
    src: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/54444777/austin_taco_project_tacos.0.0.jpg',
    altText: 'TACOZ',
    caption: 'Our bread and butter'
  }
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
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src} 
          >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
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

