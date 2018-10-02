import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class Container extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14}>
                <Marker onClick={this.onMarkerClick} name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div />
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB6aDkp2IyLQVhLJuiOq0lxyrJAaNyhqkA'
})(Container);
