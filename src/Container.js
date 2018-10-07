import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class Container extends Component {
    state = {
        showInfoWindow: false,
        clickedMarker: {},
        selectedShelter: {}
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedShelter: props,
            clickedMarker: marker,
            showInfoWindow: true
        });

    onMapClicked = props => {
        if (this.state.showInfoWindow) {
            this.setState({
                showInfoWindow: false,
                clickedMarker: null
            });
        }
    };

    render() {
        return (
            <Map
                onClick={this.onMapClicked}
                google={this.props.google}
                zoom={11}
                initialCenter={{
                    lat: 34.106676,
                    lng: -117.806726
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
