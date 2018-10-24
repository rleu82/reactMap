import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import FindShelters from './FindShelters';
import ListShelters from './ListShelters';

class HeaderContainer extends Component {
    render() {
        const navAlign = {
            left: '0px',
            width: '370px'
        };
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-item has-dropdown is-active">
                    <a className="navbar-link is-dropdown-menu is-size-6-mobile">LOS ANGELES ANIMAL SHELTERS</a>

                    <div className="navbar-dropdown">
                        <div className="filter-input">
                            <h2 className="title is-size-5 has-text-grey-darker">FIND BY NAME:</h2>
                            <FindShelters updateZip={this.props.updateZip} searchQuery={this.props.searchQuery} />
                        </div>
                        <ListShelters
                            filteredMarkers={this.props.filteredMarkers}
                            onListClicked={this.props.onListClicked}
                        />
                    </div>
                </div>

                <div className="navbar-brand">
                    <a className="navbar-item nav-item is-size-5-desktop is-size-5-tablet is-size-6-mobile" href="./">
                        <strong>LOS ANGELES ANIMAL SHELTERS</strong>
                    </a>
                </div>
            </nav>
        );
    }
}

export default HeaderContainer;
