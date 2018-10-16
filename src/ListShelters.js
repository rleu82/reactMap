import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ListShelters extends Component {
    render() {
        const listStyle = { margin: '20px 0' };
        return (
            <div className="level-left">
                <ul>
                    {this.props.mapMarkers.map(marker => {
                        return (
                            <li
                                tabIndex="0"
                                onKeyPress={() => this.props.onListClicked(marker)}
                                onClick={() => marker.click()}
                                style={listStyle}
                                key={marker.id}
                            >
                                <div className="box">
                                    <article className="media">
                                        <div className="media-content">
                                            <div className="content">
                                                <p className="is-size-6">
                                                    <FontAwesomeIcon icon="home" />
                                                    <strong> {marker.name}</strong>
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
