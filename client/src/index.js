import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import axios from "axios";

// Our Components
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import AddLocation from './pages/AddLocation';
import EditLocation from './pages/EditLocation';

import { createBrowserHistory } from "history";
import 'bootstrap/dist/css/bootstrap.css';
import "./assets/scss/now-ui-dashboard.css";
import "./assets/css/demo.css";
import indexRoutes from "./dashboard/routes/index.jsx";
import TwilioResponses from './pages/TwilioResponses';
import EditUser from './pages/EditUser';
import Locations from './pages/Locations';

const hist = createBrowserHistory();

// Here is if we have an id_token in localStorage
if (localStorage.getItem("id_token")) {
  // then we will attach it to the headers of each request from react application via axios
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
}

ReactDOM.render(
    <Router>
        <div>
            <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addlocation" component={AddLocation} />      
            <Route exact path="/editlocation" component={EditLocation} />
            <Route exact path="/response" component={TwilioResponses} />
            <Route exact path="/edituser" component={EditUser} />
            <Route exact path="/locationlist" component={Locations} />
            {indexRoutes.map((prop, key) => {
              return <Route path={prop.path} key={key} component={prop.component} />;
            })}
            </Switch>
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
