import React, { Component } from 'react';
import '../../App.css';

class Header extends Component {

  render(){
    return (
      <div id="header" className="row">
          <div className="col-lg-12">
            <h1><a href="/">SmartLyrics</a></h1>
            
            {/*} Greeting comes from props */}
            <p id="userGreeting">{this.props.greeting}</p>
          </div>
      </div>
      );
    }
  }

export default Header;  
