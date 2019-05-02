import axios from 'axios';
// import Location from './../utils/Location';

export default {

  // ROUTE FOR GETTING USER
  // TODO MODIFY ROUTE AND SERVER SIDE TO GET WITHOUT POPULATING LOCATIONS
  // -----------------------------------------------------------------------------------------
  // app.get("/api/user/:id", function(req, res) {
  getUser: (id) => {
    return axios.get(`/api/user/${id}`);
  },


  // SIGNUP ROUTE
  // -----------------------------------------------------------------------------------------
  // app.post('/api/signup', (req, res) => {
  signUpUser: (username, email, password, street, city, state, zip) => {
    return axios.post('api/signup', {
      username: username,
      email: email,
      password: password,
      street: street,
      city: city,
      state: state,
      zip: zip,
      twilioResponses: {
        surResValid: "",
        surResInvalid: "",
        comResValid: "",
        comResInvalid: ""
      }
    });
  },


  // EDIT USER (BASED ON SIGNUP PAGE)
  // -----------------------------------------------------------------------------------------
  // app.post('/api/updateuser', (req, res) => {
  updateUser : (id, username, email, password,street, city, state, zip) => {
    return axios.post(`api/updateuser/${id}`, {
      username: username,
      email: email,
      password: password,
      street: street,
      city: city,
      state: state,
      zip: zip
    })
  },


  // ROUTE FOR GETTING A USER AND ALL ITS LOCATIONS
  // -----------------------------------------------------------------------------------------
  // app.get("/api/user/:id", function(req, res) {
  getLocations: (id) => {
    return axios.get(`api/user/${id}`);
  },


  // ROUTE FOR ADDING A LOCATION TO LOCATION COLLECTION AND ADDING ITS LINK TO USER
  // -----------------------------------------------------------------------------------------
  // app.post("/api/addlocation", function(req, res) {     
  addLocation: (newLocation) => {
    return axios.post(`api/addlocation`, newLocation)
  },


  // ROUTE FOR DELETING A LOCATION
  // -----------------------------------------------------------------------------------------
  // app.post("/api/deletelocation/:id/:userid", function(req, res) {     
    deleteLocation: (id, userid) => {
      return axios.delete(`api/deletelocation/${id}/${userid}`);
    },
  

  // ROUTE FOR UPDATING A LOCATION
  // -----------------------------------------------------------------------------------------
  // app.post("/api/updatelocation", function(req, res) {     
   updateLocation: (id, updatedLocation) => {
    console.log(`updatedLocation`);
    console.log(updatedLocation);
    return axios.post(`api/updatelocation/${id}`, updatedLocation);
    },
    


  //Get the texts for the detail page
  getDetail: () => {
    return axios.get('api/textDetail')
  },

  submitTwilioResponses: (surResValid, surResInvalid, comResValid, comResInvalid) => {
    return axios.post("api/twilio/updateResponses", {
      surResValid: surResValid,
      surResInvalid: surResInvalid,
      comResValid: comResValid,
      comResInvalid: comResInvalid
    }).then(response => {
      axios.get("/api/twilio/updateCustomerResponses")
    })
  }
}

