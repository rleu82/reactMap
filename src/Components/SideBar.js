import React, { Component } from 'react';
import ListShelters from './ListShelters';
import ToggleDrawer from './ToggleDrawer';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <header className="sidebar">
                <nav className="sidebar-nav">
                    <div>
                        <ToggleDrawer />
                    </div>

                    <div className="branding-title">
                        <a href="./">Branding</a>
                    </div>
                    <div className="navi-items" />
                </nav>
            </header>
        );
    }
}

export default SideBar;
