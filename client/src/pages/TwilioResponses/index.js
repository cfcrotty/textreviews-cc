import React, { Component } from "react";
import API from "../../utils/API";
import withAuth from '../../components/withAuth';
import Popup from 'reactjs-popup'

import Sidebar from './../../components/Sidebar/Sidebar.jsx';
import dashboardRoutes from "./../../dashboard/routes/dashboard.jsx";
import Header from './../../components/Header/Header.jsx';

class TwilioResponses extends Component {

    state = {
        surResValid: "",
        surResInvalid: "",
        comResValid: "",
        comResInvalid: ""
    }

    componentDidMount() {
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                surResValid: res.data.twilioResponses.surResValid,
                surResInvalid: res.data.twilioResponses.surResInvalid,
                comResValid: res.data.twilioResponses.comResValid,
                comResInvalid: res.data.twilioResponses.comResInvalid
            })
        });

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleTwilioResponsesSubmit = event => {
        event.preventDefault();
        API
            .submitTwilioResponses(this.state.surResValid, this.state.surResInvalid, this.state.comResValid, this.state.comResInvalid)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
        const styles = {
            responseInput: {
                width: "100%",
                marginBottom: "20px"
            }
        }
        return (
            <div className="wrapper">
                <Sidebar {...this.props} routes={dashboardRoutes} />
                <div className="main-panel" ref="mainPanel">
                    <div style={{ marginBottom: "50px" }}><Header dashColor={"black"} {...this.props} /></div>
                    <hr />
                    <div className="container">
                        <h4>Text Responses</h4>
                        <Popup
                            trigger={<label style={styles.responseLabel} htmlFor="surResValid">Valid Survey Response: </label>}
                            position="right top"
                            on="hover">
                            <p>Define the response to send to a customer upon receipt of a valid 1-10 review.</p>
                            <p>Default message: "Thank You for the feedback! If you would like to add additional comments, just respond to this number!"</p>
                        </Popup>
                        <input className="form-control" value={this.state.surResValid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="surResValid"></input>
                        <Popup
                            trigger={<label style={styles.responseLabel} htmlFor="surResInvalid">Invalid Survey Response: </label>}
                            position="right top"
                            on="hover">
                            <p>Define the response to send to a customer upon receipt of a invalid 1-10 review.</p>
                            <p>Default message: "Please respond with a rating of 1-10!"</p>
                        </Popup>
                        <input className="form-control" value={this.state.surResInvalid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="surResInvalid"></input>
                        <Popup
                            trigger={<label style={styles.responseLabel} htmlFor="comResValid">Valid Comment Response: </label>}
                            position="right top"
                            on="hover">
                            <p>Define the response to send to a customer upon receipt of valid additional comments.</p>
                            <p>Default message: "Thank You for the feedback! Your comments are appreciated."</p>
                        </Popup>
                        <input className="form-control" value={this.state.comResValid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="comResValid"></input>
                        <Popup
                            trigger={<label style={styles.responseLabel} htmlFor="comResInvalid">Invalid Comment Response: </label>}
                            position="right top"
                            on="hover">
                            <p>Define the response to send to a customer upon receipt of invalid additional comments.</p>
                            <p>Default message: "Please respond with any additional comments you have. That last message didn't look like a comment..."</p>
                        </Popup>
                        <input className="form-control" value={this.state.comResInvalid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="comResInvalid"></input>
                        <button className="btn btn-primary" style={styles.responseButton} onClick={this.handleTwilioResponsesSubmit}>Submit Responses</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default withAuth(TwilioResponses);
