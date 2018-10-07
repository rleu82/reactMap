import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import Container from './Container';
import './css/App.css';
import './css/bulma.css';
import SideBar from './SideBar';

class App extends Component {
    state = {
        dogs: [],
        shelters: [],
        searchZip: 91740,
        defaultCenter: { lat: 34.106676, lng: -117.806726 }
    };
    componentDidMount() {
        this.findShelters(this.state.searchZip);
    }

    componentDidUpdate() {
        console.log(this.state.shelters);
    }

    /*  findDogs = zip => {
        fetchJsonp(
            `http://api.petfinder.com/pet.find?format=json&key=0486cb8d84957db4db8abbb194319fdf&animal=dog&location=${zip}&callback=callback`,
            { jsonpCallbackFunction: 'callback' }
        )
            .then(res => res.json())
            .then(data => {
                this.setState({ dogs: data.petfinder.pets.pet });
            })
            .catch(ex => console.log(ex));
    };
    */

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

    updateZip = zip => {
        this.findShelters(zip).then(() => {
            this.setState({
                defaultCenter: { lat: this.state.shelters[0].latitude.$t, lng: this.state.shelters[0].longitude.$t }
            });
            console.log(this.state.defaultCenter.lat);
        });
    };

    render() {
        return (
            <div className="App">
                <SideBar shelters={this.state.shelters} updateZip={this.updateZip} />
                <Container shelters={this.state.shelters} defaultCenter={this.state.defaultCenter} />
            </div>
        );
    }
}

export default App;
