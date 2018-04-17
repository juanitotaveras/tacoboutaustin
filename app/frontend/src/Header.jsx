import React from 'react';
import NavigationBar from './NavigationBar';
import PropTypes from 'prop-types';
import "./IntroStyles.css";

export default class Header extends React.Component {

 
  render(props) { 

    let introBgStyle = {
        background:"linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(" + this.props.image + ")",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
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
  description: PropTypes.string,
  image: PropTypes.string
};



