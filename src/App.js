import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import MapContainer from './MapContainer';
/* CSS */
import './css/bulma.css';
import './css/App.css';
/* FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faBars);
library.add(faChevronLeft);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelters: [],
            markerObjects: [],
            mapMarkers: [],
            defaultLocation: 'LosAngeles,CA',
            defaultCenter: { lat: 34.0407, lng: -118.2468 },
            loading: false,
            apiError: false,
            errorValue: ''
        };
    }

    componentDidMount() {
        fetchJsonp(
            `http://api.petfinder.com/shelter.find?format=json&key=0486cb8d84957db4db8abbb194319fdf&count=100&location=${
                this.state.defaultLocation
            }&callback=callback`,
            { jsonpCallbackFunction: 'callback' }
        )
            .then(res => res.json())
            .then(data => {
                this.setState({ shelters: data.petfinder.shelters.shelter });
            })
            .then(() => {
                const newMapMarkers = this.state.shelters.map(shelter => {
                    return {
                        id: shelter.id.$t,
                        name: shelter.name.$t,
                        title: shelter.name.$t,
                        city: shelter.city.$t,
                        phone: shelter.phone.$t && shelter.phone.$t.length > 1 ? shelter.phone.$t : 'Not Available',
                        email: shelter.email.$t && shelter.email.$t.length > 1 ? shelter.email.$t : 'Not Available',
                        position: { lat: parseFloat(shelter.latitude.$t), lng: parseFloat(shelter.longitude.$t) }
                    };
                });
                this.setState({ markerObjects: newMapMarkers });
            })
            .catch(err => {
                this.setState({ apiError: true, errorValue: err });
                console.log(err);
            });
        //this.updateDefaultLocation(this.state.defaultLocation);
    }
    // Manage api call and chain destructuring of response
    updateDefaultLocation = () => {
        this.findShelters(this.state.defaultLocation).then(() => {
            this.updateMapMarkers();
        });
    };

    // API call to grab shelter info from api.petfinder.com
    findShelters = location => {
        return fetchJsonp(
            `http://api.petfinder.com/shelter.find?format=json&key=0486cb8d84957db4db8abbb194319fdf&count=100&location=${location}&callback=callback`,
            { jsonpCallbackFunction: 'callback' }
        )
            .then(res => res.json())
            .then(data => {
                this.setState({ shelters: data.petfinder.shelters.shelter });
            })
            .catch(err => {
                this.setState({ apiError: true, errorValue: err });
                console.log(err);
            });
    };

    // Destructure response into easier to managed objects with conditions to check for email and phone
    updateMapMarkers = () => {
        const newMapMarkers = this.state.shelters.map(shelter => {
            return {
                id: shelter.id.$t,
                name: shelter.name.$t,
                title: shelter.name.$t,
                city: shelter.city.$t,
                phone: shelter.phone.$t && shelter.phone.$t.length > 1 ? shelter.phone.$t : 'Not Available',
                email: shelter.email.$t && shelter.email.$t.length > 1 ? shelter.email.$t : 'Not Available',
                position: { lat: parseFloat(shelter.latitude.$t), lng: parseFloat(shelter.longitude.$t) }
            };
        });
        this.setState({ markerObjects: newMapMarkers });
    };

    render() {
        // Displays Message while api call is being made
        if (!this.state.markerObjects.length) return <div>loading</div>;
        return (
            <div className="App">
                <MapContainer
                    markerObjects={this.state.markerObjects}
                    mapMarkers={this.state.mapMarkers}
                    defaultCenter={this.state.defaultCenter}
                    apiError={this.state.apiError}
                    errorValue={this.state.errorValue}
                />
            </div>
        );
    }
}
export default App;
