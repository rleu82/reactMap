import React from 'react';
import ListShelters from './ListShelters';
import FindShelters from './FindShelters';
import ApiHasError from './ApiHasError';
import SideInfo from './SideInfo';

const sideDrawer = props => {
    let handleList;
    let handleSearch;
    let resultsNum;

    if (props.apiError) {
        handleList = <ApiHasError />;
        handleSearch = <FindShelters searchQuery={props.searchQuery} drawerOpen={props.drawerOpen} />;
        resultsNum = <span>Showing {props.filteredMarkers.length} results</span>;
    } else if (!props.apiErorr & props.mapError) {
        handleList = (
            <ListShelters
                filteredMarkers={props.filteredMarkerObjects}
                onListClicked={props.onListClicked}
                drawerOpen={props.drawerOpen}
                mapError={props.mapError}
            />
        );
        handleSearch = <FindShelters searchQuery={props.searchQueryWithMapError} drawerOpen={props.drawerOpen} />;
        resultsNum = <span>Showing {props.filteredMarkerObjects.length} results</span>;
    } else {
        handleList = (
            <ListShelters
                filteredMarkers={props.filteredMarkers}
                onListClicked={props.onListClicked}
                drawerOpen={props.drawerOpen}
            />
        );
        handleSearch = <FindShelters searchQuery={props.searchQuery} drawerOpen={props.drawerOpen} />;
        resultsNum = <span>Showing {props.filteredMarkers.length} results</span>;
    }

    return (
        <nav className="side-drawer">
            <div className="filter-input">
                <h2 className="title is-size-5-desktop is-size-6-tablet is-size-7-mobile has-text-grey-darker">
                    FIND BY NAME:
                </h2>
                {handleSearch}
                {resultsNum}
                <div className="column">{handleList}</div>
            </div>
        </nav>
    );
};
export default sideDrawer;
