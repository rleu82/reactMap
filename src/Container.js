import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class Container extends Component {
    state = {
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

    render() {
        return (
            <Map
                onClick={this.onMapClicked}
                google={this.props.google}
                zoom={11}
                center={{
                    lat: this.props.defaultCenter.lat,
                    lng: this.props.defaultCenter.lng
                }}
                initialCenter={{
                    lat: this.props.defaultCenter.lat,
                    lng: this.props.defaultCenter.lng
                }}
            >
                {this.props.shelters.map(shelter => {
                    return (
                        <Marker
                            onClick={this.onMarkerClick}
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
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB6aDkp2IyLQVhLJuiOq0lxyrJAaNyhqkA'
})(Container);
