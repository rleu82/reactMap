import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import SideBar from './SideBar';

class MapContainer extends Component {
    state = {
        showInfoWindow: false,
        clickedMarker: {},
        selectedShelter: {},
        currentLocation: ''
    };
    componentDidMount() {}

    // Clicking on marker sets props and activates(true) info window for selected shelter
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedShelter: props,
            clickedMarker: marker,
            showInfoWindow: true
        });
    onMarkerClickList = (props, marker, e) => {
        this.setState({
            selectedShelter: props,
            clickedMarker: marker,
            showInfoWindow: true
        });
    };
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
        if (document.querySelectorAll('area[title]') !== null) {
            foundMarker.click();
        } else {
            console.log('Marker was not found');
        }
    };

    onMarkerUpdated = markerToUpdate => {
        this.setState({
            clickedMarker: markerToUpdate,
            showInfoWindow: true
        });
    };

    render() {
        return (
            <div className="gMapsContainer" role="application">
                <SideBar
                    shelters={this.props.shelters}
                    updateZip={this.props.updateZip}
                    onListClicked={this.onListClicked}
                    mapMarkers={this.props.mapMarkers}
                />
                <Map
                    onClick={this.onMapClicked}
                    google={window.google}
                    zoom={11}
                    initialCenter={{
                        lat: this.props.defaultCenter.lat,
                        lng: this.props.defaultCenter.lng
                    }}
                >
                    {this.props.mapMarkers.map(shelterMarker => {
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
                    })}
                    <InfoWindow marker={this.state.clickedMarker} visible={this.state.showInfoWindow}>
                        <div>
                            <h1>{this.state.selectedShelter.name}</h1>
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
