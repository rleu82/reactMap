import React, { Component } from 'react';
import Container from './Container';
import * as PetFinder from './PetFinder';
import './css/App.css';
import './css/bulma.css';
import SideBar from './SideBar';

class App extends Component {
    state = {
        dogs: []
    };
    componentDidMount() {
        PetFinder.getDogs(91740).then(dogs => {
            this.setState({ dogs: dogs });
        });
    }
    render() {
        console.log(this.state.dogs);
        return (
            <div className="App">
                <SideBar dogs={this.state.dogs} />
                {/*<Container />*/}
            </div>
        );
    }
}

export default App;
