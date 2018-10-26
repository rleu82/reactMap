import React from 'react';
import ListShelters from './ListShelters';
import FindShelters from './FindShelters';
import ApiHasError from './ApiHasError';

const sideDrawer = props => {
    return (
        <nav className="side-drawer">
            <div className="filter-input">
                <h2 className="title is-size-5-desktop is-size-6-tablet is-size-7-mobile has-text-grey-darker">
                    FIND BY NAME:
                </h2>
                <FindShelters searchQuery={props.searchQuery} drawerOpen={props.drawerOpen} />
                <span>Showing {props.filteredMarkers.length} results</span>
            </div>
            {!props.apiError ? (
                <ListShelters
                    filteredMarkers={props.filteredMarkers}
                    onListClicked={props.onListClicked}
                    drawerOpen={props.drawerOpen}
                />
            ) : (
                <ApiHasError />
            )}
        </nav>
    );
};
export default sideDrawer;
