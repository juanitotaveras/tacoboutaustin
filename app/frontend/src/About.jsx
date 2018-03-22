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


const styles = {
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
      totalCommits: 0,
      totalIssues: 0,
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
        bio: "Juanito graduated with a Radio-Television-Film degree in 2017 and will graduate with a Computer Science degree this May.",
        responsibilities: "Front end",
        commits: 0,
        issues: 0,
        unitTests: 0
      },
      {
        name: "An Vo",
        gitLogin: "tienlatien252",
        imageSrc: An,
        imageAlt: "About An",
        bio: "An studies Computer Science at UT. He hopes that he can graduate in Spring 2019.",
        responsibilities: "Back end, API",
        commits: 0,
        issues: 0,
        unitTests: 15
      },
      {
        name: "Caroline Shi",
        gitLogin: "carorineee",
        imageSrc: Caroline,
        imageAlt: "About Caroline",
        bio: "Caroline is a third year CS major who likes to play music and travel when she has time and is not broke.",
        responsibilities: "Front end",
        commits: 0,
        issues: 0,
        unitTests: 0
      },
      {
        name: "James Crabtree",
        gitLogin: "JamesCrabtree",
        imageSrc: James,
        imageAlt: "About James",
        bio: "James is a junior Computer Science student at The University of Texas at Austin",
        responsibilities: "Backend, Server Admin",
        commits: 0,
        issues: 0,
        unitTests: 12
      },
    ]

    var urlCommits="https://api.github.com/repos/juanitotaveras/tacoboutaustin/stats/contributors";
    var urlIssues="https://api.github.com/repos/juanitotaveras/tacoboutaustin/issues";

    var tempTotalCommits = 0;
    var tempTotalIssues = 0;
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
            tempTotalCommits += members[i]["commits"];
          }
        }
      }
    }

    function updateIssues(responseText) {
      var dict = eval(responseText);
      console.log("ISSUES DICT: ");
      console.log(dict);
      for (var key in dict) {
        let stats = dict[key];
        let author = stats["user"]["login"];
        console.log("AUTHOR: " + author);

        for (var i = 0; i < members.length; i++) {
          if (members[i]["gitLogin"] == author) {
            members[i]["issues"] += 1;
          }
        }
        tempTotalIssues += 1;

      }
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

    // this.setState({
    //   totalCommits: tempTotalCommits
    // });

    this.state.totalCommits = tempTotalCommits;
    this.state.totalIssues = tempTotalIssues;

    console.log("tempTotalCommits: " + tempTotalCommits);

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
      where to stay, where to eat, and what to do in Austin, Texas.</p>
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
         <Col sm="12" >
           <div style={scoreboardStyle}>
           <h1>Meet the team: <b>Keepin' It Weird</b></h1>
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
        <Row>
          <Col sm="12"> 
            <h1> Our data </h1>
            <p>
              <a href="https://developers.google.com/maps/">Google maps</a><br/>
              <a href="http://docs.sygictravelapi.com/1.0/">Sygic Travel</a><br/>
              <a href="https://www.yelp.com/developers/documentation/v3">Yelp</a><br/>
              <a href="https://www.instagram.com/developer/">Instagram API</a><br/>
              (Possibly) <a href="https://www.meetup.com/meetup_api/?_cookie-check=qBSOM6LC84XYUoLi">Meetup.com API</a><br/>
              (Possibly) <a href="https://developers.facebook.com/docs/graph-api">Facebook Graph API</a>
          </p>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="6">
            <h1> Tools </h1>
            <ul>
              <li>
                <a href="">Docker</a> We used Docker to set up an identical environment on every person's computer and on the server, which
                                      made it super easy to handle any dependencies.
              </li>
              <li>
                <a href="">ReactJS</a> ReactJS allowed us to create all our site's components using a minimal amount of JSX,
                                       and made it really easy to create reusable components.

              </li>
              <li>
                <a href="">Bootstrap</a> (and Reactstrap) allowed us to easily establish a common theme across components on the site.
              </li>
              <li>
                <a href="">Flask</a> We used this Python microframework to handle our backend operations and to host our API.
              </li>
            </ul>
          </Col>
          <Col sm="12" md="6" style={scoreboardStyle}>
            <h1> <a href="https://tienlatien252.gitbooks.io/tacoboutaustin/content/">API Documentation</a> </h1>
            <h1> <a href="https://carorineee.gitbooks.io/report-and-critiques/content/">Technical Report</a></h1>
            <h1> <a href="https://github.com/juanitotaveras/tacoboutaustin">Github Repo</a></h1>
          </Col>
        </Row>
 
      </Container>
      </div>
    );
  }
}

export default About;

