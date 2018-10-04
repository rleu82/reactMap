import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './css/bulma.css';

class SideBar extends Component {
    render() {
        return (
            <Menu>
                <h2 className="title is-4">Adopt A Pet</h2>
                <input className="input is-normal" type="text" placeholder="Search by Zipcode" />
            </Menu>
        );
    }
}

export default SideBar;
