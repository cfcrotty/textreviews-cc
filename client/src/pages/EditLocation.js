
// Each user can have multiple locations they are tracking for text reviews
// This page allows users to add those locations to the system

import React, {Component} from 'react';
import AuthService from '../components/AuthService';
import withAuth from '../components/withAuth';
import API from '../utils/API';
import Location from '../utils/Location';

import Sidebar from './../components/Sidebar/Sidebar.jsx';
import dashboardRoutes from "./../dashboard/routes/dashboard.jsx";
import Header from './../components/Header/Header.jsx';

class EditLocation extends Component {

    state = {
        _id:            "",
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

  componentDidMount () {

  }

  handleFormSubmit = event => {
    event.preventDefault();

     // updateLocation : (locationName, street, city, state, zip, phonenumber, userid) 
     // If the user didn't change a field, it's state will be blank.  In that case, pick up the incoming value
     // from this.props.location.state.row
    var newLocation = new Location({    
                                "locationName"  :       this.state.locationName   || this.props.location.state.row.locationName, 
                                "street"        :       this.state.street         || this.props.location.state.row.street, 
                                "city"          :       this.state.city           || this.props.location.state.row.city, 
                                "state"         :       this.state.state          || this.props.location.state.row.state, 
                                "zip"           :       this.state.zip            || this.props.location.state.row.zip,
                                "phonenumber"   :       this.state.phonenumber    || this.props.location.state.row.phonenumber,
                                "userid"        :       this.props.user.id
                            });

    newLocation._id = this.props.location.state.row._id;
    API.updateLocation(this.props.location.state.row._id, newLocation)
      .then(res => {
        // once the user has updated a location send them to the profile page
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

        <h1>Edit Location</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="locationName">Location Name:</label>
            <input className="form-control"
                   placeholder={this.props.location.state.row.locationName}
                   defaultValue={this.props.location.state.row.locationName}
                   name="locationName"
                   type="text"
                   id="locationName"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">Phone number:</label>
            <input className="form-control"
                   placeholder="Texting phone number of location goes here..."
                   defaultValue={this.props.location.state.row.phonenumber}
                   name="phonenumber"
                   type="text"
                   id="phonenumber"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="street">Street Address:</label>
            <input className="form-control"
                   placeholder="Street goes here..."
                   defaultValue={this.props.location.state.row.street}
                   name="street"
                   type="text"
                   id="street"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input className="form-control"
                   placeholder="City goes here..."
                   defaultValue={this.props.location.state.row.city}
                   name="city"
                   type="text"
                   id="city"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input className="form-control"
                   placeholder="State goes here..."
                   defaultValue={this.props.location.state.row.state}
                   name="state"
                   type="text"
                   id="state"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code:</label>
            <input className="form-control"
                   placeholder="Zip code goes here..."
                   defaultValue={this.props.location.state.row.zip}
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

export default withAuth(EditLocation);