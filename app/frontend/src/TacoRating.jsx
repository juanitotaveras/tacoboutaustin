import React, { Component } from 'react';
import TacoFull from './assets/taco_full.png';
import TacoHalf from './assets/taco_half.png';
import TacoGray from './assets/taco_gray.png';

export default class TacoRating extends Component {
	render(props) {
		const rating = this.props.rating;
		let fullTacos = Math.floor(rating);
		let halfTacos = Math.ceil(rating) - fullTacos;
		let grayTacos = 5 - fullTacos - halfTacos;
		const fullTacosRating = [...Array(fullTacos)].map(function(idx) {
      		return <img top width="20em" src={TacoFull}/>
    	});

    	const halfTacoRating = [...Array(halfTacos)].map(function(idx) {
      		return <img top width="20em" src={TacoHalf}/>
    	});

    	const grayTacoRating = [...Array(grayTacos)].map(function(idx) {
      		return <img top width="20em" src={TacoGray}/>
    	});
    	return <span>{fullTacosRating}{halfTacoRating}{grayTacoRating}</span>;
	}
}