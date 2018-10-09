import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import Container from './Container';
import './css/App.css';
import './css/bulma.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import SideBar from './SideBar';
class App extends Component {
    state = {
        dogs: [],
        shelters: [],
        searchZip: 91740,
        defaultCenter: { lat: 34.106676, lng: -117.806726 },
        mapMarkers: []
    };
    componentDidMount() {
        this.findShelters(this.state.searchZip).then(() => {
            console.log(this.state.mapMarkers);
        });
    }

    componentDidUpdate() {}
    // API call to grab shelter info from api.petfinder.com
    findShelters = zip => {
        return fetchJsonp(
            `http://api.petfinder.com/shelter.find?format=json&key=0486cb8d84957db4db8abbb194319fdf&location=${zip}&callback=callback`,
            { jsonpCallbackFunction: 'callback' }
        )
            .then(res => res.json())
            .then(data => {
                this.setState({ shelters: data.petfinder.shelters.shelter });
            })
            .catch(ex => console.log(ex));
    };

    // Clear mapMarkers array and updates zipcode and find shelters of new zip which triggers a repopulate of mapMarkers array
    updateZip = zip => {
        this.setState({ mapMarkers: [] });
        this.findShelters(zip);
        console.log(this.state.mapMarkers);
    };

    // Add markers to state
    onMarkerMounted = marker => {
        this.state.mapMarkers.push(marker);
    };

    render() {
        return (
            <div className="App">
                <SideBar mapMarkers={this.state.mapMarkers} shelters={this.state.shelters} updateZip={this.updateZip} />
                <Container
                    shelters={this.state.shelters}
                    defaultCenter={this.state.defaultCenter}
                    onMarkerMounted={this.onMarkerMounted}
                />
            </div>
        );
    }
}
export default App;
