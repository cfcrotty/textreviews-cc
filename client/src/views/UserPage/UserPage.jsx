import React,{Component} from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

//import { PanelHeader, FormInputs, CardAuthor, CardSocials } from "react";
import PanelHeader from './../../components/PanelHeader/PanelHeader.jsx';
import FormInputs from './../../components/FormInputs/FormInputs.jsx';
import CardAuthor from './../../components/CardElements/CardAuthor.jsx';
import CardSocials from './../../components/CardElements/CardSocials.jsx';

import userBackground from "../../assets/img/bg5.jpg";
import userAvatar from "../../assets/img/mike.jpg";

import API from '../../utils/API';

class User extends Component {
  state = {
    username: "",
    email: ""
  };

  componentDidMount() {
    // API.getUser(this.props.user.id).then(res => {
    //   this.setState({
    //     username: res.data.username,
    //     email: res.data.email
    //   })
    // });
  }

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={8} xs={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <form>
                    <FormInputs
                      ncols={[
                        "col-md-5 pr-1",
                        "col-md-3 px-1",
                        "col-md-4 pl-1"
                      ]}
                      proprieties={[
                        {
                          label: "Company (disabled)",
                          inputProps: {
                            type: "text",
                            disabled: true,
                            defaultValue: "Company"
                          }
                        },
                        {
                          label: "Username",
                          inputProps: {
                            type: "text",
                            defaultValue: "Username"
                          }
                        },
                        {
                          label: "Email address",
                          inputProps: {
                            type: "email",
                            placeholder: "Email",
                            defaultValue: this.props.user.email
                          }
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6 pr-1", "col-md-6 pl-1"]}
                      proprieties={[
                        {
                          label: "First Name",
                          inputProps: {
                            type: "text",
                            placeholder: "First Name",
                            defaultValue: "First Name"
                          }
                        },
                        {
                          label: "Last Name",
                          inputProps: {
                            type: "text",
                            placeholder: "Last Name",
                            defaultValue: "Last Name"
                          }
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Address",
                          inputProps: {
                            type: "text",
                            placeholder: "Home Address",
                            defaultValue:
                              "Address"
                          }
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={[
                        "col-md-4 pr-1",
                        "col-md-4 px-1",
                        "col-md-4 pl-1"
                      ]}
                      proprieties={[
                        {
                          label: "City",
                          inputProps: {
                            type: "text",
                            defaultValue: "San Diego",
                            placeholder: "City"
                          }
                        },
                        {
                          label: "Country",
                          inputProps: {
                            type: "text",
                            defaultValue: "USA",
                            placeholder: "Country"
                          }
                        },
                        {
                          label: "Postal Code",
                          inputProps: {
                            type: "number",
                            placeholder: "ZIP Code"
                          }
                        }
                      ]}
                    />
                    
                  </form>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} xs={12}>
              <Card className="card-user">
                <div className="image">
                  <img src={userBackground} alt="..." />
                </div>
                <CardBody>
                  <CardAuthor
                    avatar={userAvatar}
                    avatarAlt="..."
                    title="Full Name"
                    description="description"
                  />
                  <p className="description text-center">
                    "Lamborghini Mercy <br />
                    Your chick she so thirsty <br />
                    I'm in that two seat Lambo"
                  </p>
                </CardBody>
                <hr />
                <CardSocials
                  size="lg"
                  socials={[
                    {
                      icon: "fab fa-facebook-f",
                      href: "https://www.facebook.com/"
                    },
                    {
                      icon: "fab fa-twitter",
                      href: "https://www.facebook.com/"
                    },
                    {
                      icon: "fab fa-google-plus-g",
                      href: "https://plus.google.com/discover"
                    }
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default User;
