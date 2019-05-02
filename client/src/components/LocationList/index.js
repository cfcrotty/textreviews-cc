// Location List component shows all location for a given user
// in a list and shows edit and delete buttons for each one


// Load React and ReactTable
import React, { Component } from "react";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
// import { checkPropTypes } from 'prop-types';

import API from './../../utils/API';

// Load the cut symbol from react-icons
import { MdClear, MdCreate } from 'react-icons/md';

// import { set } from "mongoose";


    
  // SELF-CONTAINED COMPONENT FOR MANAGING LOCATION 
  // ------------------------------------------------------------------------------------
class LocationList extends Component {
    
    // When the component mounts, load all books and save them to this.state.books
    componentDidMount() {
      this.loadLocations();
    }

    // LOAD LOCATIONS FROM ROUTE IN API 
    // ------------------------------------------------------------------------------------
    loadLocations = () => {
        API.getLocations(this.props.userid)
          .then(res => this.setState({ locations:  res.data.locations  }) )
          .catch(err => console.log(err))
      };

    // SET STATE 
    // ------------------------------------------------------------------------------------
    state = {
        columns: [{
          Header: 'Location Name',
          accessor: 'locationName',
          maxWidth: 250,
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
          // Cell: this.renderEditable
    
        },
        {
          Header: 'Phone Number',
          accessor: 'phonenumber',
          Cell: row => <span>{this.formatPhoneNumber(row.value)}</span>,
          maxWidth: 120,
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' }
    
        },
        {
          Header: 'Street',
          accessor: 'street',
          maxWidth: 360,
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
        },
        {
          Header: 'City',
          accessor: 'city',
          maxWidth: 300,
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' }
        },
        {
          Header: 'State',
          accessor: 'state',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
          maxWidth: 60,
        },
        {
          Header: 'Zip',
          accessor: 'zip',
          style: { textAlign: 'left' },
          headerStyle: { textAlign: 'left' },
          maxWidth: 120,
        },
        {
          Header: '',
          maxWidth: 60,
          Cell: row => (
              <div>
                 <Link to={{
                              pathname: '/editlocation',
                              state: {
                                row: row.original,
                                id: row._id
                              }
                            }}><MdCreate /></Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                 <span onClick={() => this.handleDelete(row.original)}><MdClear /></span>            
              </div>
          )
       }
    
        ]
        ,
        data: [],
        loadingText: false
      }
    
      
          
      // DELETE A LOCATION 
      // ------------------------------------------------------------------------------------
      handleDelete = (row) => {
        API.deleteLocation(row._id, row.userid)
        .then(res => this.loadLocations())   // once the user has deleted a location reload the state
        .catch(err => alert(err));
      }

    
      // FORMAT PHONE NUMBER 
      // ------------------------------------------------------------------------------------
     formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          var intlCode = (match[1] ? '+1 ' : '')
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
      }
    
    
      // RENDER 
      // ------------------------------------------------------------------------------------      
      render() {
        return (
          <ReactTable
            data={this.state.locations}
            columns={this.state.columns}
            sortable={true}
            multiSort={true}
            resizable={true}

            loading={this.state.loading}
            loadingText={'Loading...'}
            noDataText={'No rows found'}
            defaultSorted={[
              {
                id: "locationName",
                desc: true
              }]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        )
      }
    }
    
    export default LocationList;
    