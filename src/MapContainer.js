import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import SideBar from './SideBar';
import { isNullOrUndefined } from 'util';

class MapContainer extends Component {
    state = {
        selectedPlace: {},
        activeMarker: {},
        prevMarker: {},
        showingInfoWindow: true,
        currentLocation: '',
        mapMarkers: [],
        filteredMarkers: []
    };
    componentDidMount() {}

    // Clicking on marker sets props and activates(true) info window for selected shelter
    onMarkerClick = marker =>
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true
        });

    // Clicking out anywhere else on map turns info window off in state and sets clicked marker to null
    onMapClicked = props => {
        if (this.state.showInfoWindow) {
            this.setState({
                showInfoWindow: false,
                clickedMarker: null
            });
        }
    };

    recenter() {
        this.map.panTo(this.props.defaultCenter);
    }

    onListClicked = curMarker => {
        let markerMatches = [...document.querySelectorAll('area[title]')];
        let foundMarker = markerMatches.find(markerMatch => markerMatch.title === curMarker.id);
        console.log(foundMarker);
        if (foundMarker === isNullOrUndefined) {
            console.log('Marker was not found');
        } else {
            console.log('Marker was found');
            foundMarker.click();
        }
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
        const newMapMarkers = [];
        const infowindow = new google.maps.InfoWindow();

        // Loop through destructured array [markerObjects] created from api data
        this.props.markerObjects.forEach(marker => {
            const mapMarker = new google.maps.Marker({
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
            mapMarker.addListener('click', () => {
                infowindow.open(map, mapMarker);
            });

            newMapMarkers.push(mapMarker);
        }, this);

        this.setState({
            mapMarkers: newMapMarkers
        });
        console.log(this.state.mapMarkers);
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
                >
                    {/*this.props.mapMarkers.map(shelterMarker => {
                        return (
                            <Marker
                                onClick={this.onMarkerClick}
                                name={shelterMarker.name}
                                key={shelterMarker.id}
                                title={shelterMarker.id}
                                position={{
                                    lat: parseFloat(shelterMarker.position.lat),
                                    lng: parseFloat(shelterMarker.position.lng)
                                }}
                            />
                        );
                    })*/}
                    <InfoWindow marker={this.state.activeMarker} visible={this.state.showInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyB6aDkp2IyLQVhLJuiOq0lxyrJAaNyhqkA'
})(MapContainer);
