import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import Container from './Container';
import * as PetFinder from './PetFinder';
import './css/App.css';
import './css/bulma.css';
import SideBar from './SideBar';

class App extends Component {
    state = {
        dogs: [],
        searchZip: ''
    };
    componentDidMount() {
        this.findDogs(91740);
    }

    findDogs = zip => {
        fetchJsonp(
            `http://api.petfinder.com/pet.find?format=json&key=0486cb8d84957db4db8abbb194319fdf&animal=dog&location=${zip}&callback=callback`,
            { jsonpCallbackFunction: 'callback' }
        )
            .then(res => res.json())
            .then(data => {
                this.setState({ dogs: data.petfinder.pets.pet });
            });
    };
    updateZip = zip => {
        this.setState({ searchZip: zip });
    };

    render() {
        return (
            <div className="App">
                <SideBar dogs={this.state.dogs} updateZip={this.updateZip} />
                {/*<Container />*/}
            </div>
        );
    }
}

export default App;
