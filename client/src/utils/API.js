import axios from 'axios';
import AddLocation from '../pages/AddLocation';


export default {
  // Gets a single user by id
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },
  // sign up a user to our service
  signUpUser: (username, email, password, street, city, state, zip) => {
    return axios.post('api/signup', {username: username, email: email, password: password, street: street,
    city: city, state:state, zip:zip } );
  },

  
  // get all locations
  getAllLocations: (username ) => {
    return axios.post(`api/getlocations/${username}`);
  },

  // add a loction
  AddLocation : (user, location) => {
    return axios.post('api/signup', { username : this.state.username,  location: location } );
  }

};
