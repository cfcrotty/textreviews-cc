import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
const Auth = new AuthService();

class App extends Component {


  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };

  goToEditProfile = () => {
    this.props.history.replace('/user-page');
  };

  render() {
    console.log(process.env.REACT_APP_SECRET_CODE);
    return (
      <div>
      <Navbar />
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome {this.props.user.email}</h2>
        </div>
        <p className="App-intro">
          <button type="button" className="btn btn-primary" onClick={this.goToEditProfile}>Go to Profile</button>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </p>
      </div>
      </div>
    );
  }
}

export default withAuth(App);
