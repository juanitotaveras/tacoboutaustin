import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import { render, shallow, mount } from 'enzyme';
import { withRouter } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import AttractionJumbotron from '../src/AttractionJumbotron';

var images = [
      "https://s3-media1.fl.yelpcdn.com/bphoto/-pQmbcVnXmGJKB20UtdBwQ/o.jpg", 
      "https://s3-media2.fl.yelpcdn.com/bphoto/mrcQ1qYRnCaXREWUTn35SA/o.jpg", 
      "https://s3-media1.fl.yelpcdn.com/bphoto/JArNFTJHqTJFXW-Avy4xcg/o.jpg"
    ];

var reviews = [
      {
        "link": "https://www.yelp.com/biz/torchys-tacos-austin-3?hrid=sMJhyyWuCHdwhND4Gnvk9g&adjust_creative=Jtja0CIqIXhii0Q3eyypNQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=Jtja0CIqIXhii0Q3eyypNQ", 
        "text": "It's a Texas chain.  This is the flagship brick and mortar.  The owner quit his corporate job.  Started a food truck business with his signature green chile..."
      }, 
      {
        "link": "https://www.yelp.com/biz/torchys-tacos-austin-3?hrid=sR-Nd1drE6bO5Hk7Ml1__A&adjust_creative=Jtja0CIqIXhii0Q3eyypNQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=Jtja0CIqIXhii0Q3eyypNQ", 
        "text": "Torchy's was on my top things to eat during my visit to Austin, TX. It did not disappoint\u200b! It was so good that I stopped in twice during my 3-day\u200by visit...."
      }, 
      {
        "link": "https://www.yelp.com/biz/torchys-tacos-austin-3?hrid=1aBU2_729SzkzE7VUkUneg&adjust_creative=Jtja0CIqIXhii0Q3eyypNQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=Jtja0CIqIXhii0Q3eyypNQ", 
        "text": "The husband and I went to Torchy's because everyone said it was a must have. Nobody said it was amazing, and now I know why. The place itself is super cool..."
      }
    ];

const wrapper = shallow(<AttractionJumbotron 
	name={"Attraction Name"} 
	rating={4}
	images= {images}
	reviews={reviews}
  categories="Landmarks & Historical Buildings" />);

describe('AttractionJumbotron Component', () => {
  it('renders the name', () => {
    expect(wrapper.find('h1').text()).to.equal('Attraction Name')
  }),

  it('renders the categories', () => {
    expect(wrapper.contains(<h2>Categories: Landmarks & Historical Buildings</h2>)).to.equal(true)
  }),

  it('renders the reviews', () => {
    expect(wrapper.contains(<p>{reviews[0]["text"]}<a href={reviews[0]["link"]}>read more!</a></p>))
    	.to.equal(true)
    expect(wrapper.contains(<p>{reviews[1]["text"]}<a href={reviews[1]["link"]}>read more!</a></p>))
    	.to.equal(true)
    expect(wrapper.contains(<p>{reviews[2]["text"]}<a href={reviews[2]["link"]}>read more!</a></p>))
    	.to.equal(true)
  })

})


