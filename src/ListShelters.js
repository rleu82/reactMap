import React, { Component } from 'react';

class ListShelters extends Component {
    render() {
        const listStyle = { margin: '10px 0' };
        return (
            <div className="level-left">
                <ul>
                    {this.props.mapMarkers.map(marker => {
                        return (
                            <li
                                tabIndex="0"
                                onFocus={() => {
                                    this.props.onListClicked(marker);
                                }}
                                onClick={() => {
                                    this.props.onListClicked(marker);
                                }}
                                style={listStyle}
                                key={marker.name}
                            >
                                <div className="box">
                                    <article className="media">
                                        <div className="media-content">
                                            <div className="content">
                                                <p className="is-size-6">
                                                    <strong>{marker.name}</strong>
                                                    <br />
                                                    <small>Phone: {marker.phone}</small>
                                                    <br />
                                                    <small className="is-size-7">
                                                        Email: {/* Check if email is there and length > 1 */}
                                                        {marker.email}
                                                    </small>
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
