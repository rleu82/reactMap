import React from 'react';
import ListShelters from './ListShelters';
import FindShelters from './FindShelters';

const sideDrawer = props => {
    return (
        <nav className="side_drawer">
            <div className="filter-input">
                <h2 className="title is-size-5-desktop is-size-6-tablet is-size-7-mobile has-text-grey-darker">
                    FIND BY NAME:
                </h2>
                <FindShelters updateZip={props.updateZip} searchQuery={props.searchQuery} />
                <span>Showing {props.filteredMarkers.length} results</span>
            </div>
            <ListShelters filteredMarkers={props.filteredMarkers} onListClicked={props.onListClicked} />
        </nav>
    );
};
export default sideDrawer;
