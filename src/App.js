import React, { Component } from 'react';
import Container from './Container';
import * as Petfinder from './PetFinder';
import './css/App.css';
import './css/bulma.css';
import SideBar from './SideBar';

class App extends Component {
    render() {
        return (
            <div className="App">
                <SideBar />
                {/*<Container />*/}
            </div>
        );
    }
}

export default App;
