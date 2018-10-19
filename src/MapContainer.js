import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import SideBar from './SideBar';
import escapeRegExp from 'escape-string-regexp';

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: '',
            filteredMarkers: [],
            mapMarkers: []
        };
        // This binding is necessary to make `this` work in the callback
        this.filterQuery = this.filterQuery.bind(this);
    }

    // Filter the results
    filterQuery(queryInputValue) {
        // Check if the user entered a value
        if (queryInputValue.length > 0) {
            // Use Regular expression to do a search of marker names and output matched markers. 'i' = case insensitive
            const regStringToEscape = escapeRegExp(queryInputValue);
            const stringToTest = new RegExp(regStringToEscape, 'i');
            // Set filteredMarkers array to equal results of filter. This triggers rerendering of list of shelters.
            const queryMarkers = this.state.mapMarkers.filter(marker => stringToTest.test(marker.title));
            this.setState({ filteredMarkers: queryMarkers });
            console.log(this.state.filteredMarkers);
        } else {
            this.setState({ filteredMarkers: this.state.mapMarkers });
        }
    }

    // Find Marker that matches the list item and trigger a click
    onListClicked = clickedMarker => {
        console.log(clickedMarker);
        const matchedMarker = this.state.mapMarkers.find(mapMarker => mapMarker.id === clickedMarker);
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
                key: marker.id,
                city: marker.city,
                phone: marker.phone,
                email: marker.email
            });

            // Add event listener to mapMarker
            newMapMarker.addListener('click', () => {
                infowindow.open(map, newMapMarker);
            });
            // Add marker array
            newMapMarkersArray.push(newMapMarker);
        }, this);
        // Update state to the array that was generated in forEach loop
        this.setState({ mapMarkers: newMapMarkersArray });
        this.setState({ filteredMarkers: newMapMarkersArray });
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
        points.forEach(point => {
            bounds.extend(point);
        });

        return (
            <div className="gMapsContainer" role="application">
                <SideBar
                    updateZip={this.props.updateZip}
                    onListClicked={this.onListClicked}
                    filteredMarkers={this.state.filteredMarkers}
                    filterQuery={this.filterQuery}
                />
                <Map
                    onReady={this.createMarkers.bind(this)}
                    onClick={this.onMapClicked}
                    google={window.google}
                    zoom={15}
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
