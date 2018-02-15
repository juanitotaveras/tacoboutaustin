import React, { Component } from 'react';
import './App.css';
import Caroline from './assets/about_caroline.JPG';
import An from './assets/about_an.jpg';
import Eduardo from './assets/about_eduardo.jpg';
import James from './assets/about_james.jpeg';
import Juanito from './assets/about_juanito.jpg';
import TeamMember from './TeamMember';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
  NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Jumbotron, Container, Row, Col, Card, CardImg, 
  CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';


var styles = {
	color:'red',
	backgroundColor:'black',
	fontWeight:'bold'
  }; 

const scoreboardStyle = {
    textAlign: 'center'
  };
 
class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalCommits: 7,
      totalIssues: 5,
      totalUnitTests: 0
      //methods
    }
    var members = [
      {
        name: "Eduardo Campos",
        gitLogin: "educampos96",
        imageSrc: Eduardo,
        imageAlt: "About Eduardo",
        bio: "Eduardo is a cool dude",
        responsibilities: "Front end",
        commits: 0,
        issues: 0,
        unitTests: 0
      },
      {
        name: "Juanito Taveras",
        gitLogin: "juanitotaveras",
        imageSrc: Juanito,
        imageAlt: "About Juanito",
        bio: "Juanito is a cool dude",
        responsibilities: "Front end",
        commits: 0,
        issues: 0,
        unitTests: 0
      },
      {
        name: "An Vo",
        gitLogin: "",
        imageSrc: An,
        imageAlt: "About An",
        bio: "An is a cool dude",
        responsibilities: "Front end",
        commits: 0,
        issues: 0,
        unitTests: 0
      },
      {
        name: "Caroline Shi",
        gitLogin: "",
        imageSrc: Caroline,
        imageAlt: "About Caroline",
        bio: "Caroline is a cool dude",
        responsibilities: "Front end",
        commits: 0,
        issues: 0,
        unitTests: 0
      },
      {
        name: "James Crabtree",
        gitLogin: "",
        imageSrc: James,
        imageAlt: "About James",
        bio: "James is a cool dude",
        responsibilities: "Front end",
        commits: 0,
        issues: 0,
        unitTests: 0
      },
    ]

    var urlCommits="https://api.github.com/repos/juanitotaveras/tacoboutaustin/stats/contributors";
    var urlIssues="https://api.github.com/repos/juanitotaveras/tacoboutaustin/issues";

    // let mem = this.members;
    let memCards = this.memberCards;
    // Parse response from GitHub API
    function updateCommits(responseText) {
      var dict = eval(responseText);

      for (var key in dict) {
        let stats = dict[key];
        console.log(stats);
        let author = stats["author"]["login"]

        for (var i = 0; i < members.length; i++) {
          if (members[i]["gitLogin"] == author) {
            members[i]["commits"] = stats["total"];
          }
        }
      }
    }

    function updateIssues(responseText) {
      var dict = eval(responseText);
      console.log(dict);
    }

    function request(url, parseResponse) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          // do something with response text
          parseResponse(xmlHttp.responseText);
        
      }
      xmlHttp.open("GET", url, false) // true for asynchronous
      xmlHttp.send(null);
    }

    request(urlCommits, updateCommits);
    request(urlIssues, updateIssues);
    // this.members = mem;

    // Create a card for each team member
    this.memberCards = [];
    for (var i = 0; i < members.length; i++) {
      // console.log(members[i]["commits"]);
      this.memberCards.push(this.createTeamMember(members[i]));
    }

  }

  createTeamMember(memberDict) {
    return (<TeamMember imageSrc={memberDict["imageSrc"]} imageAlt={memberDict["imageAlt"]}
                    name={memberDict["name"]} responsibilities={memberDict["responsibilities"]}
                  commits={memberDict["commits"]} issues={memberDict["issues"]}
                  unitTests={memberDict["unitTests"]} bio={memberDict["bio"]}/>);
  }

  componentDidMount() {


  }

 render(props) {
    return (
    	<div styles={styles}>
      <Container>
          <Row>
          <Col>
    	<Jumbotron>
    	      <h1 className="display-3">Where am I?</h1>
      <p className="lead">Tacoboutaustin is your one-stop shop to find out 
      where to sleep, where to eat, and what to do in Austin, Texas.</p>
      <p>Kids and adults alike will find this site useful, but keep 
      in mind that for several attractions you must be at 
      least 18 or 21 years of age. </p>
      <p className="my-2">
      We have a large selection of hotels, restaurants, 
      and attractions that are organized by location in our beautiful city.
      </p>
    	</Jumbotron>
          </Col>
        </Row>
       <Row>
	       <h1> About the team </h1>	
       </Row>
       <Row>
         <Col sm="12" >
           <div style={scoreboardStyle}>
           <h1>Scoreboard</h1>
           <h3>Commits: {this.state.totalCommits}</h3>
           <h3>Issues: {this.state.totalIssues}</h3>
           <h3>Unit tests: {this.state.totalUnitTests}</h3>
           </div>
         </Col>
       </Row>
       <Row>
          <Col xs="12" sm="4">{this.memberCards[0]}</Col>
          <Col xs="12" sm="4">{this.memberCards[1]}</Col>
          <Col xs="12" sm="4">{this.memberCards[2]}</Col>
        </Row>
        <Row>
          <Col sm="2"></Col>
          <Col xs="12" sm="4">{this.memberCards[3]}</Col>
          <Col sm="1"></Col>
          <Col xs="12" sm="4">{this.memberCards[4]}</Col>
          <Col sm="1"></Col>
        </Row>
 
      </Container>
      </div>
    );
  }
}

export default About;

