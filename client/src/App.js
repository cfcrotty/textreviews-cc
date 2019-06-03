import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/css/style1.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import { Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import logo1 from "./assets/img/TXTreviews_logo.png";
import dashboard from "./assets/img/dashboard.png";
import detail from "./assets/img/detail.png";
import location from "./assets/img/location.png";
import response from "./assets/img/response.png";
import mongodb from "./assets/img/mongodb.png";
import expressjs from "./assets/img/expressjs.png";
import reactjs from "./assets/img/reactjs.png";
import nodejs from "./assets/img/nodejs.png";

const Auth = new AuthService();

class App extends Component {


  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/');
  };

  goToEditProfile = () => {
    this.props.history.replace('/profile');
  };

  // render() {
  //   //console.log(process.env.REACT_APP_SECRET_CODE);
  //   return (
  //     <div className="App">
  //       <div className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h2>Welcome {this.props.user.email}</h2>
  //       </div>
  //       <p className="App-intro">
  //         <button type="button" className="btn btn-primary" onClick={this.goToEditProfile}>Go to Profile</button>
  //         <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
  //       </p>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="homepage">
        <div id="wrap">
          {/* <div className="navbar-wrapper">
            <nav className="navbar navbar-default navbar-static-top">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/">
                    <img src={logo1} width="90" height="55" alt="Logo" />
                  </a>
                </div>

                <div className="navbar-collapse collapse" id="navbar">

                  <ul className="nav navbar-nav navbar-right">

                    <li className="login">
                      <a href="/Account/Authenticate">Sign up</a>
                    </li>

                    <li className="cart"><a href="/Home/ReviewCart">Log in</a></li>
                  </ul>
                </div>

              </div>
            </nav>
          </div> */}

          <Navbar />

          <div id="copy" className="">

            <div id="myCarousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner" role="listbox">

                <div className="item active">
                  <div className="slide bg">
                  </div>
                  <div className="container">
                    <div className="carousel-caption carousel-center">
                      <h1>TXT Reviews</h1>
                      <p><Link className="btn btn-large btn-dark" to="/signup" role="button">Signup Now</Link></p>
                    </div>
                  </div>
                </div>


              </div>

            </div>

            <div className="container">
              <div className="row home-prods">
                <div className="col-8 offset-2">

                  <div className="row">
                    <div className="col-md-12 col-xs-12"><h2>About The Product</h2></div>

                    <div className="prod col-md-12 col-xs-12 ">
                      <p>TXT Reviews is a customer feedback tool for any business that has regular
                          customer
                          interactions. It is perfect for restaraunts, retail, and other service
                          industries.
                          Reviews and feedback are solicited via text messages sent to a location specific
                          phone number. The goal is to provide a minimally frictional way for the customer
                          to
                                        give realtime feedback to the business.</p>

                      <p>Clients can review the feedback they have received through our web portal. We
                          include a summary page with weekly and monthly analytics. There is also a
                          detailed
                                        review page where individual reviews can be seen.</p>

                      <p>Custom responses are setup on the website as well. The client provides a message
                          to
                          be sent back to the customer on successful and unsuccessful messages from the
                                        customer.</p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                  <div className="col-md-12 col-xs-12"><h2>About Us</h2></div>
                    <div className="prod col-md-12 col-xs-12 ">
                      Our mission is to organize and analyze your customer's reviews/feedbacks. We created
                      this application as a final project for our boot camp and is made with MERN -- MongoDB, Express.js, React and Node.js. Our group is MRCB(Matthew Elliot, Richard Moore, Cara Crotty and Brian Turk).
                                </div>
                  </div>
                  <hr />
                </div>
              </div>

              <div className="row bottom-quad">
                <div className="col-md-12">
                  <div className="row">

                    <div className="col-md-3 col-sm-6">
                      <img src={dashboard} alt="Dashboard Page"/>
                      <span className="quad-title">Dashboard Page</span>
                      <span className="quad-content">Displays charts from customer reviews</span>
                    </div>

                    <div className="col-md-3 col-sm-6">
                      <img src={detail} alt="Detail Page" />
                      <span className="quad-title">Detail Page</span>
                      <span className="quad-content">Displays and filters each feedbacks from customers</span>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <img src={location} alt="Loaction Setup" />
                      <span className="quad-title">Locations Page</span>
                      <span className="quad-content">Location setup</span>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <img src={response} alt="Response Setup" />
                      <span className="quad-title">Response Page</span>
                      <span className="quad-content">Response setup</span>

                    </div>

                  </div>
                  <hr />
                </div>
              </div>
              <div className="row press-logos">
              <div className="col-md-12 col-xs-12"><h2>Technologies</h2></div>
                <div className="row">
                  <a href="https://www.mongodb.com/"><img src={mongodb} alt="Mongo DB" style={{height: "75px", width: "150px"}} /></a>
                  <a href="https://expressjs.com/"><img src={expressjs} alt="Express" /></a>
                  <a href="https://reactjs.org/"><img src={reactjs} alt="React" /></a>
                  <a href="https://nodejs.org/en/"><img src={nodejs} alt="Node JS" /></a>
                </div>
              </div>
            </div>
          </div>
          <footer style={{

              font: "13px 'FuturaPTBook-Reg', Arial, sans-serif",
              backgroundColor: "#000",
              color: "#fff"
          }}>
            <div className="copyright">
              <p>© 2019 </p>
              <p><a href="https://www.freepik.com/free-photos-vectors/business">Business photo created by freepik - www.freepik.com</a></p>
            </div>
          </footer>
        </div>
      </div>
    );
  }


}

export default (App);
