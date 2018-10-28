import React, { Component } from 'react';

class ListShelters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItemColor: 'white',
            listTextColor: 'darkgrey'
        };
    }

    render() {
        const listStyle = {
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            background: 'white'
        };
        const sidePanel = {
            height: '70vh',
            width: '350px'
        };
        return (
            <div className="level-left" style={sidePanel}>
                <ul style={listStyle} role="listbox" aria-label="List of Shelters">
                    {this.props.filteredMarkers.map(mapMarker => {
                        return (
                            <li
                                // Change tabIndex to -1 to remove from tab order if drawer is closed.
                                tabIndex={this.props.drawerOpen ? '0' : '-1'}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        this.props.onListClicked(mapMarker);
                                    }
                                }}
                                // Use mapMarker.id instead of title to avoid conflicts. Each shelter is assigned unique ID from already.
                                onClick={() => this.props.onListClicked(mapMarker)}
                                key={mapMarker.id}
                                role="button"
                                aria-label="Shelter Name"
                            >
                                <p className="card-header-title is-size-6-desktop is-size-6-tablet is-size-7-mobile">
                                    {mapMarker.name}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListShelters;
