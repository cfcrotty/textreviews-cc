import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import APIDash from './../../utils/APIDash';
import API from './../../utils/API';

import PanelHeader from './../../components/PanelHeader/PanelHeader.jsx';
import CardCategory from './../../components/CardElements/CardCategory.jsx';

import {
  dashboardPanelChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart
} from "../../dashboard/variables/charts.jsx";
import Header from './../../components/Header/Header.jsx';

import moment from "moment";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      dataArr: [],
      labels: [],
      dataArrMonthly: [],
      labelsMonthly: [],
      dataArrInvalid: [],
      labelsInvalid: [],
      locationPhone: 0,
      locations: [],
      dropDownValue: "All",
      monthlyChart: "No Data",
      invalidChart: "No Data"
    };
  }

  toggle(val) {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  changeValue(value, phone) {
    this.setState({ dropDownValue: value, locationPhone: phone });
    this.getDataCharts(phone);
  }

  componentDidMount() {
    this.getDataCharts(0);
  }

  getDataCharts(phone) {
    APIDash.getUserDashData(this.props.user.id, phone).then(res => {
      let newData = [];
      let newLabel = [];
      res.data.forEach(item => {
        newData.push(item.aveRating);
        newLabel.push(`${item._id.month}-${item._id.day}`);
      });
      this.setState({
        dataArr: newData,
        labels: newLabel
      })
    }).catch(error => {
      console.log(error);
    });

    API.getLocations(this.props.user.id).then(res => {
      this.setState({
        locations: res.data.locations
      })
    }).catch(error => {
      console.log(error);
    });

    APIDash.getUserDashMonthlyData(this.props.user.id, phone).then(res => {
      let newData = [];
      let newLabel = [];
      res.data.forEach(item => {
        newData.push(item.aveRating);
        newLabel.push(moment.monthsShort(item._id.month - 1));
      });
      this.setState({
        dataArrMonthly: newData,
        labelsMonthly: newLabel
      })
      if (this.state.dataArrMonthly.length>0) this.setState({monthlyChart: ""});
    }).catch(error => {
      console.log(error);
    });

    APIDash.getUserDashInvalidData(this.props.user.id, phone).then(res => {
      let newData = [];
      let newLabel = [];
      res.data.forEach(item => {
        newData.push(item.aveRating);
        newLabel.push(`${item._id.month}-${item._id.day}`);
      });
      this.setState({
        dataArrInvalid: newData,
        labelsInvalid: newLabel
      })
      if (this.state.dataArrInvalid.length>0) this.setState({invalidChart: ""});
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Header {...this.props} content={
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {this.state.dropDownValue}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem key={0} onClick={() => this.changeValue("All", 0)}>All</DropdownItem>
              {this.state.locations.map((prop, key) => {
                return <DropdownItem key={key} onClick={() => this.changeValue(prop.locationName, prop.phonenumber)}>{prop.locationName}</DropdownItem>;
              })}
            </DropdownMenu>
          </Dropdown>
        } content1={<div>7 Days Summary</div>}/>
        <PanelHeader
          size="lg"
          content={
            <Line
              data={dashboardPanelChart.data(this.state.labels, this.state.dataArr)}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className="content">
          <Row>
            <Col xs={12} md={8}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Complete and Valid</CardCategory>
                  <CardTitle tag="h4">Monthly Summary</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={dashboardAllProductsChart.data(this.state.labelsMonthly, this.state.dataArrMonthly)}
                      options={dashboardAllProductsChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  {this.state.monthlyChart}
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Incomplete Or Invalid</CardCategory>
                  <CardTitle tag="h4">7 Days Summary</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={dashboard24HoursPerformanceChart.data(this.state.labelsInvalid, this.state.dataArrInvalid)}
                      options={dashboard24HoursPerformanceChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                {this.state.invalidChart}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;
