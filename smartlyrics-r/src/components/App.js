import React, { Component } from 'react';
import '../App.css';
import Header from "./common/Header";
import MenuBtns from "./common/MenuBtns";
import AuthModal from "./common/modal/AuthModal";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: false,
      greeting: "Welcome! Log in or create account to get started."
      };
  // bind update greeting and user methods since we'll use it deeper in the tree
  this.updateGreeting = this.updateGreeting.bind(this);  
  this.updateUser = this.updateUser.bind(this);
}  

  componentDidMount(){
    // return currentUser in local storage, or false: 
    // first, does the browser support local storage?
    if (typeof(Storage) !== "undefined") {
        // try to retrieve any current user stored from previous log-in        
        if (localStorage.getItem("sl_user")) {
            var user = localStorage.getItem("sl_user");
            this.setState({ 
              user: user,
              greeting: `Welcome, ${user}!` 
            },()=>{
              console.log("User set to:",this.state.user)
            })
        }
    }
      else {
          console.log("No local storage supported");
          this.setState({ user: false });
    }
  }

  updateUser = (user) => {
    this.setState({
      user: user
    })
  }

  updateGreeting = (greeting) => {
    this.setState(
      {
        greeting:greeting
      }
    )
  }

  render() {
    return (
      <div className="appWrapper">
        <div className="container">

          {/* render header and send the modal render method as a property */}
          <Header user={this.state.user} updateUser={this.updateUser} greeting={this.state.greeting} />
          
          {/* Modal will render but not be visible until triggered programmatically; we send as props our user, if any, and a method for updating user's name */}
          <AuthModal user={this.state.user} updateUser={this.updateUser} updateGreeting={this.updateGreeting}/>   
          
          {/* these are our main search/home/favorite actions */}
          <MenuBtns />      
        </div>

      </div>
    );
  }
}

export default App;
