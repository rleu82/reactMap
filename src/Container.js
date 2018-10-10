import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import SideBar from './SideBar';
class Container extends Component {
    state = {
        mapMarkers: [],
        showInfoWindow: false,
        clickedMarker: {},
        selectedShelter: {},
        currentLocation: ''
    };
    // Clicking on marker sets props and activates(true) info window for selected shelter
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedShelter: props,
            clickedMarker: marker,
            showInfoWindow: true
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

    onListClicked = shelter => {
        const selShelter = this.state.mapMarkers.find(mapMarker => mapMarker.props.id === shelter.id.$t);
        console.log(selShelter);
    };

    onMarkerUpdated = markerToUpdate => {
        this.setState({
            clickedMarker: markerToUpdate,
            showInfoWindow: true
        });
    };

    onMarkerMounted = marker => {
        this.setState(prevState => ({
            mapMarkers: [...prevState.mapMarkers, marker]
        }));
        console.log(this.state.mapMarkers);
    };
    // Clear mapMarkers array and updates zipcode and find shelters of new zip which triggers a repopulate of mapMarkers array

    render() {
        return (
            <div>
                <Map
                    onClick={this.onMapClicked}
                    google={this.props.google}
                    zoom={11}
                    initialCenter={{
                        lat: this.props.defaultCenter.lat,
                        lng: this.props.defaultCenter.lng
                    }}
                >
                    {this.props.shelters.map(shelter => {
                        return (
                            <Marker
                                onClick={this.onMarkerClick}
                                id={shelter.id.$t}
                                name={shelter.name.$t}
                                key={shelter.id.$t}
                                title={shelter.name.$t}
                                position={{ lat: shelter.latitude.$t, lng: shelter.longitude.$t }}
                            />
                        );
                    })}

                    <InfoWindow marker={this.state.clickedMarker} visible={this.state.showInfoWindow}>
                        <div>
                            <h1>{this.state.selectedShelter.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
                <SideBar
                    shelters={this.props.shelters}
                    updateZip={this.props.updateZip}
                    onListClicked={this.onListClicked}
                    mapMarkers={this.state.mapMarkers}
                />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB6aDkp2IyLQVhLJuiOq0lxyrJAaNyhqkA'
})(Container);
