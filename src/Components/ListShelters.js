import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        const shelterList = {
            height: '60vh',
            width: '350px'
        };
        return (
            <div className="level-left" style={shelterList}>
                <ul style={listStyle} aria-label="List of Shelters">
                    {this.props.filteredMarkers.map(mapMarker => {
                        return (
                            <li
                                tabIndex="0"
                                onKeyPress={() => this.props.onListClicked(mapMarker)}
                                // Use mapMarker.id instead of title to avoid conflicts. Each shelter is assigned unique ID from already.
                                onClick={() => this.props.onListClicked(mapMarker.id)}
                                key={mapMarker.id}
                                role="button"
                                aria-label={mapMarker.name}
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
