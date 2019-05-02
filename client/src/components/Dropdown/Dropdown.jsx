import React, { Component } from "react";
//import { FormGroup, Label, Input } from "reactstrap";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledButtonDropdown
} from 'reactstrap';
// used for making the prop types of this component
//import PropTypes from "prop-types";

class Dropdown extends Component {
    render() {
        return (
            <UncontrolledDropdown group>
                <DropdownToggle caret>Dropdown</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}

// Dropdown.propTypes = {
//   label: PropTypes.node
// };

export default Dropdown;
