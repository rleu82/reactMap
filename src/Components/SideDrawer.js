import React from 'react';
import ListShelters from './ListShelters';
import FindShelters from './FindShelters';
import ApiHasError from './ApiHasError';

const sideDrawer = props => {
    let handleList;
    let handleSearch;
    let resultsNum;
    let petFinderAttr = (
        <div className="info-label">
            <span tabIndex="0">
                Animal Shelters provided by <a href="https://www.petfinder.com/developers/">PetFinder</a>
            </span>
        </div>
    );

    // API Error
    if (props.apiError) {
        handleList = <ApiHasError errorValue={this.props.errorValue} />;
        handleSearch = <FindShelters searchQuery={props.searchQuery} drawerOpen={props.drawerOpen} />;
        resultsNum = (
            <div className="info-label">
                <span>Showing {props.filteredMarkers.length} results</span>
            </div>
        );
        // API Call is made but map erorr
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
        resultsNum = (
            <div className="info-label">
                <span>Showing {props.filteredMarkerObjects.length} results</span>
            </div>
        );
        // No errors
    } else {
        handleList = (
            <ListShelters
                filteredMarkers={props.filteredMarkers}
                onListClicked={props.onListClicked}
                drawerOpen={props.drawerOpen}
            />
        );
        handleSearch = <FindShelters searchQuery={props.searchQuery} drawerOpen={props.drawerOpen} />;
        resultsNum = (
            <div className="info-label">
                <span>Showing {props.filteredMarkers.length} results</span>
            </div>
        );
    }

    return (
        <nav className="side-drawer">
            <div className="filter-input">
                <h2 className="title is-size-5-desktop is-size-6-tablet is-size-7-mobile has-text-grey-darker">
                    FIND BY NAME:
                </h2>
                {handleSearch}

                {resultsNum}
                {handleList}
                {petFinderAttr}
            </div>
        </nav>
    );
};
export default sideDrawer;
