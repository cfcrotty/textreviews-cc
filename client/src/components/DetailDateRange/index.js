import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import Popover from 'react-tiny-popover'
const moment = extendMoment(originalMoment);

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    const today = moment();

    this.state = {
      isOpen: false,
      value: moment.range(today.clone().subtract(30, "days"), today.clone()),
      isPopoverOpen: true
    }; 
  }

  updateFilter = this.props.updateFilter.bind(this);

  onSelect = (value, states) => {
    this.setState({ value, states });
    
  };


  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderSelectionValue = () => {
    this.updateFilter(this.state.value.start.format("MM/DD/YY"), this.state.value.end.format("MM/DD/YY"))
    return (
      <div style={{backgroundColor: 'white', height: '27px', paddingTop: '5px', paddingRight: '2px'}}>
        {this.state.value.start.format("MM/DD/YY")}
        {" - "}
        {this.state.value.end.format("MM/DD/YY")}
      </div>
    );
  };

  render() {
    return (
      <div>
        <div onClick={this.onToggle} style={{cursor: 'pointer'}}>{this.renderSelectionValue()}</div>

        {/* <div>
          <input
            type="button"
            value={this.renderSelectionValue()}
            onClick={this.onToggle}
          />
        </div> */}

        {this.state.isOpen && (
            <Popover
            isOpen={this.state.isPopoverOpen}
            position={'top'} // preferred position
            content={(
                <div className="card">
                <DateRangePicker
                value={this.state.value}
                onSelect={this.onSelect}
                singleDateRange={true}
              />
              </div>
            )}
        >
            <div onClick={() => this.setState({ isPopoverOpen: !this.state.isPopoverOpen })}>
                
            </div>
        </Popover>
         
        )}
      </div>
    );
  }
}

export default Example;
