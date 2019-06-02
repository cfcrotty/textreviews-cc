import React, {Component} from 'react';
import AuthService from './../components/AuthService';
import API from './../utils/API';

import Sidebar from './../components/Sidebar/Sidebar.jsx';
import dashboardRoutes from "./../dashboard/routes/dashboard.jsx";
import Header from './../components/Header/Header.jsx';

class EditUser extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  state = {
    username:       "",
    email:          "",
    street:         "",
    city:           "",
    state:          "",
    zip:            ""
  };



  componentDidMount() {
    
    this.setState({
        username:   this.props.location.state.username,
        email:      this.props.location.state.email,
        street:     this.props.location.state.street,
        city:       this.props.location.state.city,
        state:      this.props.location.state.state,
        zip:        this.props.location.state.zip
      })
  };


  handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(this.props.location.state.userid, this.state.username, this.state.email, 
                  this.state.street, this.state.city, this.state.state, this.state.zip)
      .then(res => {
        // once the user has signed up
        // send them to the login page
        this.props.history.replace('/profile');
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

        <h4>Edit User</h4>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input className="form-control"
                   placeholder="Username goes here..."
                   defaultValue={this.state.username}
                   name="username"
                   type="text"
                   id="username"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input className="form-control"
                   placeholder="Email goes here..."
                   defaultValue={this.state.email}
                   name="email"
                   type="email"
                   id="email"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="street">Street Address:</label>
            <input className="form-control"
                   placeholder="Street goes here..."
                   defaultValue={this.state.street}
                   name="street"
                   type="text"
                   id="street"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input className="form-control"
                   placeholder="City goes here..."
                   defaultValue={this.state.city}
                   name="city"
                   type="text"
                   id="city"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input className="form-control"
                   placeholder="State goes here..."
                   defaultValue={this.state.state}
                   name="state"
                   type="text"
                   id="state"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code:</label>
            <input className="form-control"
                   placeholder="Zip code goes here..."
                   defaultValue={this.state.zip}
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

export default EditUser;
