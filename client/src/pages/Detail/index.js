import React, { Component } from "react";
import API from "../../utils/API";
// import "./index.css";
import ReactTable from 'react-table'
import "react-table/react-table.css";
import Moment from 'moment'
import withAuth from '../../components/withAuth';
import DateRangePicker from "./../../components/DetailDateRange";
// import DateRangePicker from "react-daterange-picker";
// import "react-daterange-picker/dist/css/react-calendar.css";
// import { extendMoment } from "moment-range";
// const moment = extendMoment(Moment);
import Header from './../../components/Header/Header.jsx';

class Detail extends Component {

  state = {
    columns: []
    ,
    data: [],
    loadingText: false,
    locations: [],
    selectList: [],
    pageSize: 10,
    startDate: "",
    endDate: "",
    match: true,
    filtered: []
  }



  filterColumn = (columnId, value) => {
    const newfilter = {
      id: columnId,
      value
    };
    const filtersWhithoutNew = this.state.filtered.filter(item => item.id !== columnId);
    this.setState({
      filtered: [...filtersWhithoutNew, newfilter]
    });
  }


  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
  }


  // this.state.startDate.isAfter(row.createdAt)

  updateFilter = (startDate, endDate) => {

    if ((startDate !== this.state.startDate) || (endDate !== this.state.endDate)) {

      this.setState({
        startDate: startDate,
        endDate: endDate
      })

      this.setState({
        filtered: []
      });
      //do filter!
      this.filterColumn('createdAt', startDate)
    }
  }

  generateColumns() {
    this.setState({
      columns: [{
        Header: 'Customer #',
        accessor: 'customerPhonenumber',
        Cell: row => <span>{this.formatPhoneNumber(row.value)}</span>,
        maxWidth: 130,
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' }

      },
      {
        Header: 'Rating',
        accessor: 'rating',
        maxWidth: 60,
        style: { textAlign: 'center' },
        headerStyle: { textAlign: 'center' },
        Cell: row => <span style={{ color: row.value < 5 ? 'red' : row.value > 5 ? 'green' : '' }}>{row.value}</span>
      },
      {
        Header: 'Comment',
        accessor: 'userComment',
        style: { textAlign: 'left' },
        headerStyle: { textAlign: 'left' }
      },
      {
        Header: 'Date/Time',
        accessor: 'createdAt',
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        maxWidth: 145,
        Cell: row => <span>{Moment(row.value).format('M/D/YY h:mma')}</span>,
        Filter: ({ filter, onChange }) =>
          <DateRangePicker updateFilter={this.updateFilter}/>
      },
      {
        Header: 'Location #',
        accessor: 'locationPhonenumber',
        Cell: row => <span>{this.formatPhoneNumber(row.value)}</span>,
        maxWidth: 130,
        style: { textAlign: 'right' },
        headerStyle: { textAlign: 'right' },
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : ""}>
            {this.state.selectList}
          </select>
      },
      {
        Header: "",
        expander: true,
        Cell: () => <strong>+</strong>,
        width: 35,
        Expander: ({ isExpanded, ...rest }) =>
          <div>
            {isExpanded
              ? <span>&#x2299;</span>
              : <span>&#x2295;</span>}
          </div>,
        style: {
          cursor: "pointer",
          fontSize: 25,
          padding: "0",
          textAlign: "center",
          userSelect: "none"
        }
      },
      {
        show: false,
        accessor: 'messages'
      }

      ]
    })
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    API
      .getDetail()
      .then(res => {
        this.setState({
          data: res.data,
          loading: false
        })

        // console.log(res.data)
        if (res.data.length > 0) {
          //get list of location for filter dropdown
          var userid = res.data[0].userid
          API
            .getLocations(userid)
            .then(res => {

              var selectList = []
              selectList.push(<option value="">All Locations</option>)
              for (var x = 0; x < res.data.locations.length; x++) {
                selectList.push(<option value={res.data.locations[x].phonenumber}>{res.data.locations[x].locationName + ': ' + this.formatPhoneNumber(res.data.locations[x].phonenumber)}</option>)
              }

              //get the proper page size based on the window height
              var pageSize = Math.floor(window.innerHeight / 45) - 2

              if (pageSize < 10) {
                pageSize = 10
              }

              this.setState({
                locations: res.data.locations,
                selectList: selectList,
                pageSize: pageSize
              })
            })
        }

      })

  }

  //   componentDidUpdate(prevProps) {


  //   }


  render() {
    if (Object.entries(this.state.columns).length === 0) this.generateColumns();

    return (
      <div>
      <div style={{marginBottom:"50px"}}><Header dashColor={"black"} {...this.props} /></div>
      <ReactTable
        data={this.state.data}
        columns={this.state.columns}
        sortable={true}
        multiSort={true}
        resizable={true}
        filterable={true}
        filtered={this.state.filtered}
        onFilteredChange={filtered => this.setState({ filtered })}
        loading={this.state.loading}
        loadingText={'Loading...'}
        noDataText={'No rows found'}
        defaultFilterMethod={(filter, row) => {
          // console.log(filter.id);
          if ((filter.id === 'customerPhonenumber') || (filter.id === 'userComment')) {
            return String(row[filter.id]).toLowerCase().includes(String(filter.value).toLowerCase())
          } if (filter.id === 'createdAt') {    //figure out date range

            // var dates = filter.value.split(' ')
            // var startDate = ""
            // var endDate = ""
            // dates.forEach(value => {
            //   var dateCheck = Moment(value)
            //   if (dateCheck.isValid()) {
            //     if (startDate === "") {
            //       startDate = dateCheck
            //     } else if (endDate === "") {
            //       endDate = dateCheck
            //     }
            //   }
            // })

            // if ((startDate !== "") && (endDate === "")) {
            //   return startDate.diff(Moment(row.createdAt)) < 0
            // } else if (endDate !== "") {
            //   return startDate.diff(Moment(row.createdAt)) <= 0 && endDate.add(1, 'day').diff(Moment(row.createdAt)) >= 0
            // }

            // console.log(this.state.startDate);
            return Moment(this.state.startDate).diff(Moment(row.createdAt)) <= 0 && Moment(this.state.endDate).add(1, 'day').diff(Moment(row.createdAt)) >= 0
            

            // return true

          } else {
            return String(row[filter.id]) === filter.value
          }
        }
        }
        defaultSorted={
          [
            {
              id: "createdAt",
              desc: true
            }]}
        defaultPageSize={10}
        pageSize={this.state.pageSize}
        onPageSizeChange={(pageSize) => { this.setState({ pageSize }) }}
        className="-striped -highlight"
        SubComponent={row =>
          < div style={{ padding: '10px' }}>
            Comment: <b>{row.row.userComment} </b> <br />
            Comment Time: <b>{Moment(row.row.messages[1].timeStamp).format('M/D/YY h:mma')}</b>

          </div >}
      />
      </div>
    )
  }
}

export default withAuth(Detail);
