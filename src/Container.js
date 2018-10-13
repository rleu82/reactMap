import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import SideBar from './SideBar';

class Container extends Component {
    state = {
        showInfoWindow: false,
        clickedMarker: {},
        selectedShelter: {},
        currentLocation: '',
        newMapMarkers: [],
        windowPosition: {}
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
        const selShelter = this.props.mapMarkers.find(mapMarker => mapMarker.id === marker.id);
        console.log(selShelter);

        this.setState({ windowPosition: { lat: selShelter.position.lat, lng: selShelter.position.lng } });
        window.google.maps.event.trigger(selShelter, 'click');
        this.onMarkerClick(selShelter);

        console.log(selShelter.id);
    };

    onMarkerUpdated = markerToUpdate => {
        this.setState({
            clickedMarker: markerToUpdate,
            showInfoWindow: true
        });
    };

    onMarkerMounted = element => {
        this.setState(prevState => ({
            newMapMarkers: [...prevState.newMapMarkers, element.marker]
        }));
    };

    render() {
        return (
            <div ref="map">
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
                                {...this.props}
                                ref={this.onMarkerMounted}
                                onClick={this.onMarkerClick}
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
                    {console.log(this.state.newMapMarkers)}
                    <InfoWindow
                        pixelOffset={new window.google.maps.Size(0, -42)}
                        position={this.state.windowPosition}
                        marker={this.state.clickedMarker}
                        visible={this.state.showInfoWindow}
                    >
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
const mapContainer = props => <div id="map" />;
export default GoogleApiWrapper({
    apiKey: 'AIzaSyB6aDkp2IyLQVhLJuiOq0lxyrJAaNyhqkA',
    LoadingContainer: mapContainer
})(Container);
