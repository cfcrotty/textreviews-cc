import React,{Component} from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "../../logo-white.svg";

import AuthService from '../AuthService';

var ps;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.Auth = new AuthService();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div className="sidebar" data-color="blue">
        <div className="logo">
          <a
            href="https://www.github.com"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="https://www.github.com"
            className="simple-text logo-normal"
          >
            Dashboard
          </a>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={"now-ui-icons " + prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
            <li
                 
                  key={"logout"}
                >
                  <NavLink
                    onClick={() => this.Auth.logout()}
                    to="/"
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={"now-ui-icons media-1_button-power"} />
                    <p>Logout</p>
                  </NavLink>
                </li>
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
