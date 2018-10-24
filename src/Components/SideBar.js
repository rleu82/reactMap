import React, { Component } from 'react';
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

                    <div className="branding-title is-size-4-desktop is-size-5-tablet is-size-6-mobile">
                        <a href="./">
                            <strong>LOS ANGELES AREA SHELTERS</strong>
                        </a>
                    </div>
                    <div className="navi-items" />
                </nav>
            </header>
        );
    }
}

export default SideBar;
