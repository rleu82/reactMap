import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import SideBar from './SideBar';
import { isNullOrUndefined } from 'util';

class MapContainer extends Component {
    state = {
        currentLocation: '',
        filteredMarkers: [],
        mapMarkers: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };
    componentDidMount() {}

    recenter() {
        this.map.panTo(this.props.defaultCenter);
    }

    // Filter through array of markers to find mapMarkerId match
    onListClicked = clickedMarker => {
        console.log(clickedMarker);
        const matchedMarker = this.state.mapMarkers.find(mapMarker => mapMarker.id == clickedMarker);
        window.google.maps.event.trigger(matchedMarker, 'click');
    };

    /* google-maps-react display markers by adding them using components. I could not figure out a way to store
    // them to work with side bar list. Originally used the object array to create a component for each marker and
    // displayed them on side bar, but they weren't able to link. I had to use querySelector to find <area> tag and 
    // attached a .click() to trigger the click. 
    //
    // Thanks to 'tidyline' for the work around. Create the markers without using <Marker/> component by using the onReady
    // attribute of google-maps-react.
    // https://github.com/fullstackreact/google-maps-react/issues/198#issuecomment-419119690
    */
    createMarkers(mapProps, map) {
        const { google } = mapProps;
        const newMapMarkersArray = [];
        const infowindow = new google.maps.InfoWindow();

        // Loop through destructured array [markerObjects] created from api data
        this.props.markerObjects.forEach(marker => {
            const newMapMarker = new google.maps.Marker({
                map: map,
                position: marker.position,
                name: marker.name,
                title: marker.title,
                id: marker.id,
                wOpen: false,
                key: marker.id,
                city: marker.city,
                phone: marker.phone,
                email: marker.email
            });

            // Add event listener to mapMarker
            newMapMarker.addListener('click', () => {
                infowindow.open(map, newMapMarker);
            });

            newMapMarkersArray.push(newMapMarker);
        }, this);
        console.log(newMapMarkersArray);
        this.setState({ mapMarkers: newMapMarkersArray });
    }

    render() {
        // Calculate bound points
        let points = this.props.shelters.map(mapMarker => {
            return {
                lat: parseFloat(mapMarker.latitude.$t),
                lng: parseFloat(mapMarker.longitude.$t)
            };
        });

        // Set the bounds
        let bounds = new this.props.google.maps.LatLngBounds();
        for (var i = 0; i < points.length; i++) {
            bounds.extend(points[i]);
        }

        return (
            <div className="gMapsContainer" role="application">
                <SideBar
                    shelters={this.props.shelters}
                    updateZip={this.props.updateZip}
                    onListClicked={this.onListClicked}
                    mapMarkers={this.state.mapMarkers}
                />
                <Map
                    onReady={this.createMarkers.bind(this)}
                    onClick={this.onMapClicked}
                    google={window.google}
                    zoom={10}
                    initialCenter={{
                        lat: this.props.defaultCenter.lat,
                        lng: this.props.defaultCenter.lng
                    }}
                    bounds={bounds}
                />
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyB6aDkp2IyLQVhLJuiOq0lxyrJAaNyhqkA'
})(MapContainer);
