import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import Container from './Container';
import './css/App.css';
import './css/bulma.css';

class App extends Component {
    state = {
        shelters: [],
        mapMakers: [],
        searchZip: 91740,
        defaultCenter: { lat: 34.106676, lng: -117.806726 }
    };

    componentDidMount() {
        this.updateZip(this.state.searchZip);
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
            this.updateMapMakers();
        });
    };

    updateMapMakers = () => {
        const newMapMakers = this.state.shelters.map(shelter => {
            return {
                id: shelter.id.$t,
                name: shelter.name.$t,
                title: shelter.name.$t,
                position: { lat: shelter.latitude.$t, lng: shelter.longitude.$t }
            };
        });
        this.setState({ mapMakers: newMapMakers });
        console.log(this.state.mapMakers);
    };

    render() {
        return (
            <div className="App">
                <Container
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
