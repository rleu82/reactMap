import React, { Component } from 'react';
import ToggleDrawer from './ToggleDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TopNav extends Component {
    render() {
        const addMargin = {
            margin: '0 15px 0'
        };
        return (
            <header className="sidebar">
                <nav className="sidebar-nav" role="navigation" aria-label="main navigation">
                    <div>
                        <ToggleDrawer
                            drawerToggleHandler={this.props.drawerToggleHandler}
                            drawerOpen={this.props.drawerOpen}
                        />
                    </div>
                    <div className="branding-title is-size-4-desktop is-size-5-tablet is-size-6-mobile">
                        <a href="./">
                            <FontAwesomeIcon icon="dog" size="small" aria-hidden="true" />
                            <span style={addMargin}>
                                <strong>ADOPT AND SAVE A PET</strong>
                            </span>
                        </a>
                    </div>

                    <div className="navi-items" />
                </nav>
            </header>
        );
    }
}

export default TopNav;
