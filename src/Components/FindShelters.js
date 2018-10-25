import React, { Component } from 'react';

class FindShelters extends Component {
    render() {
        return (
            <div className="field">
                <div className="control">
                    <input
                        className="input is-info"
                        type="text"
                        placeholder="Enter Shelter Name"
                        onChange={e => this.props.searchQuery(e.target.value)}
                        role="searchbox"
                        aria-label="Search shelter by name"
                        // Remove tab order when drawer is closed
                        tabIndex={this.props.drawerOpen ? '0' : '-1'}
                    />
                </div>
            </div>
        );
    }
}
export default FindShelters;
