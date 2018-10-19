import React, { Component } from 'react';

class FindShelters extends Component {
    render() {
        return (
            <div className="control">
                <div className="select">
                    <select onChange={e => this.props.updateZip(e.target.value)}>
                        <option value="default" disabled>
                            Select Area
                        </option>
                        <option value="91740">San Dimas Area</option>
                        <option value="92825">Anaheim Area</option>
                        <option value="92501">Riverside Area</option>
                    </select>
                </div>
                <div className="field">
                    <div className="control">
                        <input
                            className="input is-info"
                            type="text"
                            placeholder="Enter Shelter Name"
                            onChange={e => this.props.filterQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default FindShelters;
