import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class Container extends Component {
    state = {
        showInfoWindow: false,
        clickedMarker: {},
        selectedShelter: {}
    };
    componentDidUpdate() {
        this.moveCenter;
    }
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

    moveCenter() {
        const map = this.map;
        const curr = this.props.defaultCenter;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center);
        }
    }

    render() {
        return (
            <Map
                onClick={this.onMapClicked}
                google={this.props.google}
                zoom={12}
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
