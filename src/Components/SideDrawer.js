import React from 'react';
import ListShelters from './ListShelters';
import FindShelters from './FindShelters';

const sideDrawer = props => {
    return (
        <nav className="side_drawer">
            <div className="filter-input">
                <h2 className="title is-size-5 has-text-grey-darker">FIND BY NAME:</h2>
                <FindShelters updateZip={props.updateZip} searchQuery={props.searchQuery} />
            </div>
            <ListShelters filteredMarkers={props.filteredMarkers} onListClicked={props.onListClicked} />
        </nav>
    );
};
export default sideDrawer;
