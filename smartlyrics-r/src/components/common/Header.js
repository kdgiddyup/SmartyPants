import React, { Component } from 'react';
import { BrowserRouter as Link, Route } from 'react-router-dom'
import '../../App.css';

class Header extends Component {

  render(){
    return (
      <div id="header" className="row">
          <div className="col-lg-12">
            <Link exact={true} to={"/"}>
              <h1>SmartLyrics</h1>
            </Link>
            {/*} Greeting comes from props */}
            <p id="userGreeting">{this.props.greeting}</p>
          </div>
      </div>
      );
    }
  }

export default Header;  
