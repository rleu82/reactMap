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
                                onClick={() => this.props.onListClicked(marker)}
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
                                                    <br />
                                                    <small>Phone: {marker.phone}</small>
                                                    <br />
                                                    <small className="is-size-7">{marker.email}</small>
                                                </p>
                                            </div>
                                            <nav className="level is-mobile">
                                                <div className="level-left">
                                                    <a className="level-item" aria-label="show dogs">
                                                        <FontAwesomeIcon icon="dog" />
                                                    </a>
                                                    <a className="level-item" aria-label="show cats">
                                                        <FontAwesomeIcon icon="cat" />
                                                    </a>
                                                </div>
                                            </nav>
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
