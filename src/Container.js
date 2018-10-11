import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import SideBar from './SideBar';

class Container extends Component {
    state = {
        showInfoWindow: false,
        clickedMarker: {},
        selectedShelter: {},
        currentLocation: '',
        markersToDisplay: ''
    };
    componentDidMount() {}

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

    onListClicked = marker => {
        const selShelter = Marker.find(mapMarker => mapMarker.id === marker.id);
        console.log(selShelter);
        /*window.google.maps.event.trigger(marker, 'click', {
            latLng: new google.maps.LatLng(selShelter.position.lat, selShelter.position.lng)
        });*/
        console.log(selShelter.id);
    };

    onMarkerUpdated = markerToUpdate => {
        this.setState({
            clickedMarker: markerToUpdate,
            showInfoWindow: true
        });
    };

    /*onMarkerMounted = marker => {
        this.setState(prevState => ({
            mapMarkers: [...prevState.mapMarkers, marker]
        }));
        console.log(this.props.mapMarkers);
    };*/
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
                    {this.props.mapMarkers.map(shelterMarker => {
                        return (
                            <Marker
                                onClick={this.onMarkerClick}
                                id={shelterMarker.id}
                                name={shelterMarker.name}
                                key={shelterMarker.id}
                                title={shelterMarker.title}
                                position={{
                                    lat: shelterMarker.position.lat,
                                    lng: shelterMarker.position.lng
                                }}
                            />
                        );
                    })}
                    <Marker id="hello" position={{ lat: 33.8353, lng: -117.9136 }} title="hello" />
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
                    mapMarkers={this.props.mapMarkers}
                />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB6aDkp2IyLQVhLJuiOq0lxyrJAaNyhqkA'
})(Container);
