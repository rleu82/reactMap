import React, { Component } from 'react';
import SideInfo from './SideInfo';

class ListShelters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            city: '',
            phone: '',
            email: ''
        };
    }

    render() {
        const listStyle = {
            width: '100%',
            height: '100%',
            background: 'white'
        };
        const sidePanel = {
            height: '60vh',
            width: '350px',
            overflowY: 'scroll',
            overflowX: 'hidden'
        };
        return (
            <div className="column" style={sidePanel}>
                <ul style={listStyle} aria-label="List of Shelters">
                    {this.props.filteredMarkers.map(mapMarker => {
                        return (
                            <li
                                // Change tabIndex to -1 to remove from tab order if drawer is closed.
                                tabIndex={this.props.drawerOpen ? '0' : '-1'}
                                onKeyPress={() => this.props.onListClicked(mapMarker)}
                                // Use mapMarker.id instead of title to avoid conflicts. Each shelter is assigned unique ID from already.
                                onClick={() => {
                                    this.props.onListClicked(mapMarker.id);
                                    this.setState({
                                        name: mapMarker.name,
                                        city: mapMarker.city,
                                        phone: mapMarker.phone,
                                        email: mapMarker.email
                                    });
                                }}
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

                {this.props.mapError ? (
                    <SideInfo
                        name={this.state.name}
                        city={this.state.city}
                        phone={this.state.phone}
                        email={this.state.email}
                    />
                ) : null}
            </div>
        );
    }
}

export default ListShelters;
