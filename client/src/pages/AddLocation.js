
// Each user can have multiple locations they are tracking for text reviews
// This page allows users to add those locations to the system

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from './../components/AuthService';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import Location from './../utils/Location';

import Sidebar from './../components/Sidebar/Sidebar.jsx';
import dashboardRoutes from "./../dashboard/routes/dashboard.jsx";
import Header from './../components/Header/Header.jsx';

class AddLocation extends Component {

    state = {
        locationName:   "",
        street:         "",
        city:           "",
        state:          "",
        zip:            "",
        phonenumber:    "",
        userid:         ""
      };
    

  constructor() {
    super();
    this.Auth = new AuthService();
  }


  handleFormSubmit = event => {
    event.preventDefault();

     // addLocation : (locationName, street, city, state, zip, phonenumber, userid) 
    var newLocation = new Location({    
                                "locationName"  :       this.state.locationName, 
                                "street"        :       this.state.street, 
                                "city"          :       this.state.city, 
                                "state"         :       this.state.state, 
                                "zip"           :       this.state.zip,
                                "phonenumber"   :       this.state.phonenumber,
                                "userid"        :       this.props.user.id
                            });

    API.addLocation(newLocation)
      .then(res => {
        // once the user has added a location send them to the profile page
        this.props.history.replace('/locationlist');
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
      <div className="wrapper">
      <Sidebar {...this.props} routes={dashboardRoutes} />
      <div className="main-panel" ref="mainPanel">
        <div style={{ marginBottom: "50px" }}><Header dashColor={"black"} {...this.props} /></div>
        <hr />
      <div className="container">

        <h4>Add Location</h4>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="locationName">Location Name:</label>
            <input className="form-control"
                   placeholder="Location name goes here..."
                   name="locationName"
                   type="text"
                   id="locationName"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">Phone number:</label>
            <input className="form-control"
                   placeholder="Texting phone number of location goes here..."
                   name="phonenumber"
                   type="text"
                   id="phonenumber"
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
      </div>
      </div>
      </div>
    );
  }
}

export default withAuth(AddLocation);
