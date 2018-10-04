import React, { Component } from 'react';

class FindDog extends Component {
    render() {
        return (
            <div className="control">
                <div className="select">
                    <select>
                        <option value="default" disabled>
                            Select Area
                        </option>
                        <option value="91740">San Dimas Area</option>
                        <option value="92825">Anaheim Area</option>
                        <option value="92501">Riverside Area</option>
                    </select>
                </div>
            </div>
        );
    }
}
export default FindDog;
