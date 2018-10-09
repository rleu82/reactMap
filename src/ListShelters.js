import React, { Component } from 'react';

class ListShelters extends Component {
    // When Shelter is selected from SideBar, trigger event to click associated marker to popup infowindow
    clickedShelter = shelterID => {
        const selectedShelter = this.props.mapMarkers.find(mapMarker => mapMarker.marker.id === shelterID);
        window.google.maps.Event.trigger('click', selectedShelter);
        console.log(window.google);
    };
    render() {
        const listStyle = { margin: '10px 0' };
        return (
            <div className="level-left">
                <ul>
                    {this.props.shelters.map(shelter => {
                        return (
                            <li
                                tabIndex="0"
                                onFocus={() => {
                                    this.clickedShelter(shelter.id.$t);
                                }}
                                style={listStyle}
                                key={shelter.id.$t}
                            >
                                <div className="box">
                                    <article className="media">
                                        <div className="media-content">
                                            <div className="content">
                                                <p className="is-size-6">
                                                    <strong>
                                                        {shelter.name.$t ? shelter.name.$t : 'Not Available'}
                                                    </strong>
                                                    <br />
                                                    <small>
                                                        Phone: {shelter.phone.$t ? shelter.phone.$t : 'Not Available'}
                                                    </small>
                                                    <br />
                                                    <small className="is-size-7">
                                                        Email: {/* Check if email is there and length > 1 */}
                                                        {shelter.email.$t && shelter.email.$t.length > 1
                                                            ? shelter.email.$t
                                                            : 'Not Available'}
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
