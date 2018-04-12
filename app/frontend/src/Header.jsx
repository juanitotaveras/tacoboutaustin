import React from 'react';
import NavigationBar from './NavigationBar';
import PropTypes from 'prop-types';
import "./IntroStyles.css";

export default class Header extends React.Component {

 
  render(props) { 

     let introBgStyle = {
      background: 'linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(' + 'http://cdn-image.foodandwine.com/sites/default/files/1501607996/opentable-scenic-restaurants-bertrand-at-mister-a-FT-BLOG0818.jpg' + ')',
      backgroundSize: 'cover'
  };

    return (
      <div>
          <div className='intro' style={introBgStyle}>
              <div className="emptySpace">
                  <br/>
              </div>

              <h1>{this.props.title}</h1>
              <p>{this.props.description}</p>

              <div className="emptySpace">
                  <br/>
              </div>
          </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};



