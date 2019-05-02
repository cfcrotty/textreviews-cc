import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './../components/AuthService';
import API from './../utils/API';
import Navbar from './../components/Navbar';

class Signup extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.signUpUser(this.state.username, this.state.email, this.state.password,
      this.state.street, this.state.city, this.state.state, this.state.zip)
      .then(res => {
        // once the user has signed up
        // send them to the login page
        //this.props.history.replace('/login');
        this.Auth.login(this.state.email, this.state.password)
          .then(res => {
            // once user is logged in
            // take them to their profile page
            if (this.Auth.loggedIn()) {
              this.props.history.replace('/dashboard');
            }
          })
          .catch(err => {
            alert(err.response.data.message)
          });
      })
      .catch(err => alert(err));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1>Signup</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input className="form-control"
                placeholder="Username goes here..."
                name="username"
                type="text"
                id="username"
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input className="form-control"
                placeholder="Email goes here..."
                name="email"
                type="email"
                id="email"
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input className="form-control"
                placeholder="Password goes here..."
                name="password"
                type="password"
                id="password"
                onChange={this.handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="street">Street Address:</label>
              <input className="form-control"
                placeholder="Street goes here..."
                name="street"
                type="text"
                id="street"
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input className="form-control"
                placeholder="City goes here..."
                name="city"
                type="text"
                id="city"
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input className="form-control"
                placeholder="State goes here..."
                name="state"
                type="text"
                id="state"
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip Code:</label>
              <input className="form-control"
                placeholder="Zip code goes here..."
                name="zip"
                type="text"
                id="zip"
                onChange={this.handleChange} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <p><Link to="/login">Go to Login</Link></p>
        </div>
      </div>
    );
  }
}

export default Signup;
