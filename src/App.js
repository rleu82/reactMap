import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import MapContainer from './MapContainer';
import './css/App.css';
import './css/bulma.css';

// Font Awesome icons
/* import components */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
/* Add Font Awesome icons into library to use within the App */
library.add(faHome);
library.add(faDog);
library.add(faCat);
library.add(faEnvelope);

class App extends Component {
    state = {
        shelters: [],
        mapMarkers: [],
        defaultSearchZip: 91740,
        defaultCenter: { lat: 34.106676, lng: -117.806726 }
    };

    componentDidMount() {
        this.updateZip(this.state.defaultSearchZip);
    }

    // API call to grab shelter info from api.petfinder.com
    findShelters = zip => {
        return fetchJsonp(
            `http://api.petfinder.com/shelter.find?format=json&key=0486cb8d84957db4db8abbb194319fdf&count=25&location=${zip}&callback=callback`,
            { jsonpCallbackFunction: 'callback' }
        )
            .then(res => res.json())
            .then(data => {
                this.setState({ shelters: data.petfinder.shelters.shelter });
            })
            .catch(err => console.log(err));
    };

    updateZip = zip => {
        this.findShelters(zip).then(() => {
            this.updateMapMarkers();
        });
    };
    // store
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
        this.setState({ mapMarkers: newMapMarkers });
    };

    render() {
        return (
            <div className="App">
                <MapContainer
                    mapMarkers={this.state.mapMarkers}
                    shelters={this.state.shelters}
                    defaultCenter={this.state.defaultCenter}
                    updateZip={this.updateZip}
                    findShelters={this.findShelters}
                />
            </div>
        );
    }
}
export default App;
