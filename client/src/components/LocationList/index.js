// Location List component shows all location for a given user
// in a list and shows edit and delete buttons for each one

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../AuthService';
import API from '../../utils/API';


// function LList(props) {

//   return(
//     <div className="jumbotron">
//       <h1>List of locations  </h1>   
//     </div>   
//   )
// }))

// export default LList

class LocationList extends Component {


  state = {
    locationList: [{ locationName : "Store #1",
                     street : "University Ave.",
                     city   : " San Diego"},
                  {  locationName : "Store #2",
                     street : "Lombard St.",
                     city   : " San Francisco"},
                  {  locationName : "Store #3",
                     street : "Denny Way",
                     city   : " Seattle"} 
                ]};
                  

  // componentDidMount() {
  //   API
  //       .getAllLocations()
  //       .then(response => this.setState({ locationList: response.data }))
  //       .catch(err => console.log(err));
  //   }


    render() {
        return (

          <div className="jumbotron">

             <table className="table">
                    <thead>
                        <tr>
                            <th>Location name</th>
                            <th>Street</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.locationList.map(loc => (
                            <tr key={loc.name}>
                                <td>{loc.locationName}</td>
                                <td>{loc.street}</td>
                                <td>{loc.city}</td>
                            </tr>
                        ))}
                    </tbody>
              </table>

          </div>
        );
      }
}

export default LocationList;
