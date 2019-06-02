import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import API from './../utils/API';

import Sidebar from './../components/Sidebar/Sidebar.jsx';
import dashboardRoutes from "./../dashboard/routes/dashboard.jsx";
import Header from './../components/Header/Header.jsx';

class Profile extends Component {

  state = {
    username: "",
    email: "",
    street:"",
    city:"",
    state:"",
    zip:""
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        street: res.data.street,
        city: res.data.city,
        state: res.data.state,
        zip: res.data.zip
      })
    });

  }



  render() {

    return (

      <div className="wrapper">
      <Sidebar {...this.props} routes={dashboardRoutes} />
      <div className="main-panel" ref="mainPanel">
        <div style={{ marginBottom: "50px" }}><Header dashColor={"black"} {...this.props} /></div>
        <hr />

      <div className="container Profile">
        <h4>Profile Info</h4>
          <div className = "container">  
            <div className = "row">
                <p>Username: {this.state.username} </p>
            </div>
            <div className = "row">
                <p>Email address: {this.state.email} </p>
            </div>
            <div className = "row">
                <p>Street: {this.state.street} </p>
            </div>
            <div className = "row">
                <p>City: {this.state.city} </p>
            </div>
            <div className = "row">
                <p>State: {this.state.state} </p>
            </div>
            <div className = "row">
                <p>Zip: {this.state.zip} </p>
            </div>
          </div>
          <Link className="btn btn-primary"
            to={{
              pathname: "/edituser",
              state : {
                userid:   this.props.user.id,
                username: this.state.username,
                email:    this.state.email,
                street:   this.state.street,
                city:     this.state.city,
                state:    this.state.state,
                zip:      this.state.zip
              }

            }}
          > Edit User 
          </Link>


        </div>
      </div>
    </div>
    )
  }
}

export default withAuth(Profile);

