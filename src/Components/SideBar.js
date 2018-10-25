import React, { Component } from 'react';
import ToggleDrawer from './ToggleDrawer';
import SideDrawer from './SideDrawer';

class SideBar extends Component {
    render() {
        return (
            <header className="sidebar">
                <nav className="sidebar-nav">
                    <div>
                        <ToggleDrawer drawerToggleHandler={this.props.drawerToggleHandler} />
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
