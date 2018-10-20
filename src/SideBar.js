import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import FindShelters from './FindShelters';
import ListShelters from './ListShelters';

class SideBar extends Component {
    render() {
        return (
            <Menu isOpen={true} noOverlay>
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img
                            src="http://www.free-icons-download.net/images/welsh-dwarf-dog-icon-87624.png"
                            alt="Welsh Corgis"
                        />
                    </figure>
                </div>
                <h2 className="title is-4 has-text-white">Los Angeles Area Shelters</h2>
                <FindShelters updateZip={this.props.updateZip} searchQuery={this.props.searchQuery} />
                <ListShelters filteredMarkers={this.props.filteredMarkers} onListClicked={this.props.onListClicked} />
            </Menu>
        );
    }
}

export default SideBar;
