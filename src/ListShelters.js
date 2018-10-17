import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ListShelters extends Component {
    render() {
        const listStyle = { margin: '20px 0' };
        return (
            <div className="level-left">
                <ul>
                    {this.props.mapMarkers.map(mapMarker => {
                        return (
                            <li
                                tabIndex="0"
                                onKeyPress={() => this.props.onListClicked(mapMarker)}
                                // Use mapMarker.id instead of title to avoid conflicts. Each shelter is assigned unique ID from already.
                                onClick={() => this.props.onListClicked(mapMarker.id)}
                                style={listStyle}
                                key={mapMarker.id}
                            >
                                <div className="box">
                                    <article className="media">
                                        <div className="media-content">
                                            <div className="content">
                                                <p className="is-size-6">
                                                    <FontAwesomeIcon icon="home" />
                                                    <strong> {mapMarker.name}</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListShelters;
