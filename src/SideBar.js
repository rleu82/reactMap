import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './css/bulma.css';
import FindDog from './FindDog';

class SideBar extends Component {
    render() {
        return (
            <Menu>
                <h2 className="title is-4">Adopt A Dog</h2>
                <FindDog />
            </Menu>
        );
    }
}

export default SideBar;
