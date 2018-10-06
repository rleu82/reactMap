import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import FindDog from './FindDog';
import ListDogs from './ListDogs';

class SideBar extends Component {
    render() {
        return (
            <Menu>
                <h2 className="title is-4 has-text-white">Adopt A Dog</h2>
                <FindDog updateZip={this.props.updateZip} />
                <ListDogs dogs={this.props.dogs} />
            </Menu>
        );
    }
}

export default SideBar;
