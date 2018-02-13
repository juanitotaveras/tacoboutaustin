import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Bootstrap, Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar'


class App extends Component {
  render() {
    return (
                    <div>

        <NavigationBar />

      </div>
    );
  }
}

export default App;
