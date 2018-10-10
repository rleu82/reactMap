import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import FindShelters from './FindShelters';
import ListShelters from './ListShelters';

class SideBar extends Component {
    render() {
        return (
            <Menu>
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img
                            src="http://www.free-icons-download.net/images/welsh-dwarf-dog-icon-87624.png"
                            alt="Welsh Corgis"
                        />
                    </figure>
                </div>
                <h2 className="title is-4 has-text-white">Find A Shelter</h2>
                <FindShelters updateZip={this.props.updateZip} />
                <ListShelters
                    shelters={this.props.shelters}
                    mapMarkers={this.props.mapMarkers}
                    onListClicked={this.props.onListClicked}
                />
            </Menu>
        );
    }
}

export default SideBar;
