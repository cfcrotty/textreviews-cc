
// Each user can have multiple locations they are tracking for text reviews
// This page allows users to add those locations to the system

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from './../components/AuthService';
import API from './../utils/API';

class AddLocation extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

//   componentWillMount() {
//     if (this.Auth.loggedIn()) {
//       this.props.history.replace('/');
//     }
//   }

  handleFormSubmit = event => {
    event.preventDefault();
    API.addLocation(this.state.username, 
                    this.address, 
                    this.city, 
                    this.state, 
                    this.zip)
      .then(res => {
        // once the user has added a location
        // send them to the home page
        this.props.history.replace('/');
      })
      .catch(err => alert(err));
  };

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container">

        <h1>Add Location</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="locationname">Location Name:</label>
            <input className="form-control"
                   placeholder="Location name goes here..."
                   name="locationname"
                   type="text"
                   id="locationname"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="street">Street Address:</label>
            <input className="form-control"
                   placeholder="Street goes here..."
                   name="street"
                   type="text"
                   id="street"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input className="form-control"
                   placeholder="City goes here..."
                   name="city"
                   type="text"
                   id="city"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input className="form-control"
                   placeholder="State goes here..."
                   name="state"
                   type="text"
                   id="state"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code:</label>
            <input className="form-control"
                   placeholder="Zip code goes here..."
                   name="zip"
                   type="text"
                   id="zip"
                   onChange={this.handleChange}/>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <p><Link to="/home">Go to Home</Link></p>
      </div>
    );
  }
}

export default AddLocation;