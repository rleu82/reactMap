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
        searchZip: '91740'
    };
    componentDidMount() {
        this.findShelters(91740);
    }

    findDogs = zip => {
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

    findShelters = zip => {
        fetchJsonp(
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
        this.setState({ searchZip: zip });
    };

    render() {
        console.log(this.state.shelters);
        return (
            <div className="App">
                <SideBar dogs={this.state.dogs} updateZip={this.updateZip} />
                <Container shelters={this.state.shelters} />
            </div>
        );
    }
}

export default App;
