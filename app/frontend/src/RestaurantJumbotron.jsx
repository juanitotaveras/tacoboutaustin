import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Jumbotron, 
  Button, 
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container } from 'reactstrap';

var parsed_opening_hours;

const styles = {
  color:'red',
  backgroundColor:'black',
  fontWeight:'bold',
  height: '400em'
  };

// temporary: delete
const items = [
  {
    src: 'https://odis.homeaway.com/odis/destination/5f483ac3-763b-4506-9e15-3fff2e1e8291.hw1.jpg',
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

export default class RestaurantJumbotron extends Component {

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

  parseBR() {
    var splitted_array = this.props.hours.split("<br>");
    this.parsed_opening_hours = splitted_array.map(function(hours){
      return <div><p>{hours}</p></div>
    })
  };

  componentWillMount() {
    this.parseBR();
  }

  render(props) {
    const { activeIndex } = this.state;

    const slides = this.props.images.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item}
          >
          <img top width="100%" height="400em" src={item} alt="Card image cap" />
        </CarouselItem>
      );
    });

    var reviews = this.props.reviews.map(function(review){
      return <p>{review.text}<a href={review.link}>read more!</a></p>
    })

    var more_images = this.props.images.map(function(image){
                return <Col><img top width="100%" height="100em" src={image} alt="Card image cap" /></Col>;
              })

    return (
    <div>
      <Jumbotron>
        <h1 className="display-3">{this.props.name}</h1>
        <p className="lead">Rating: {this.props.rating}/5<br/>
        </p>
          <Row>
          <Col xs="6">
          <div styles={styles}>
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              >
              {/*<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />*/}
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
            </div>
            </Col>
          <Col xs="6">
            <iframe top width="100%" height="400em" frameborder="0" src={this.props.map_src} allowfullscreen>
          </iframe>
          </Col>
        </Row>
        <p></p>
        <hr className="my-2" />
        <p><b>Opening hours</b><br/>
        {this.parsed_opening_hours}</p>
        <p><b>Reviews</b><br/>
        <blockquote><q>{reviews}</q></blockquote></p>
        <p><b>More pictures</b></p>
        <Row>
          {more_images}
        </Row>
        <br/>
        {/*<p className="lead">
          <Button color="primary">Learn More</Button>
        </p>*/}
      </Jumbotron>
    </div>
  )};
}

RestaurantJumbotron.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.string,
  images: PropTypes.object,
  map_src: PropTypes.string,
  hours: PropTypes.string,
  reviews: PropTypes.object
};