import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import escapeRegExp from 'escape-string-regexp';
import TopNav from './Components/TopNav';
import SideDrawer from './Components/SideDrawer';

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: '',
            filteredMarkers: [],
            mapMarkers: [],
            selectedMarker: {},
            drawerOpen: false,
            haveError: true
        };

        // This binding is necessary to make `this` work in the callback
        this.searchQuery = this.searchQuery.bind(this);
    }

    componentDidCatch() {
        this.setState({ haveError: true });
    }

    componentDidMount() {
        // https://developers.google.com/maps/documentation/javascript/events
        // Check for google maps auth errors.
        window.gm_authFailure = () => {
            this.setState({
                haveError: true
            });
        };
    }
    // Filter the results into filteredMarkers array
    searchQuery(queryInputValue) {
        // Check if the user entered a value
        if (queryInputValue.length > 0) {
            // Hide all markers as user types
            this.state.mapMarkers.forEach(marker => marker.setVisible(false));

            // Use Regular expression to do a search of marker names and output matched markers. 'i' = case insensitive
            const regStringToEscape = escapeRegExp(queryInputValue);
            const stringToTest = new RegExp(regStringToEscape, 'i');

            // Set filteredMarkers array to equal results of filter. This triggers rerendering of list of shelters.
            const queryMarkers = this.state.mapMarkers.filter(marker => stringToTest.test(marker.title));

            // Set the markers that match the query to be visible
            queryMarkers.forEach(marker => marker.setVisible(true));

            // Store the queryResults into state
            this.setState({ filteredMarkers: queryMarkers });
        } else {
            // If length of queryInput is 0 reset the array of markers and show all markers
            this.setState({ filteredMarkers: this.state.mapMarkers });
            this.state.filteredMarkers.forEach(marker => marker.setVisible(true));
            this.state.mapMarkers.forEach(marker => marker.setVisible(true));
        }
    }

    // Find Marker that matches the list item and trigger a click
    onListClicked = clickedMarker => {
        console.log(clickedMarker);
        const matchedMarker = this.state.mapMarkers.find(mapMarker => mapMarker.id === clickedMarker);
        window.google.maps.event.trigger(matchedMarker, 'click');
    };

    /* google-maps-react display markers by adding them using components. I could not figure out a way to store
    // them to work with side bar list. Originally used the object array to create a component for each marker and
    // displayed them on side bar, but they weren't able to link. I had to use querySelector to find <area> tag and 
    // attached a .click() to trigger the click. 
    //
    // Thanks to 'tidyline' for the work around. Create the markers without using <Marker/> component by using the onReady
    // attribute of google-maps-react.
    // https://github.com/fullstackreact/google-maps-react/issues/198#issuecomment-419119690
    */
    createMarkers(mapProps, map) {
        const { google } = mapProps;
        const newMapMarkersArray = [];

        const infowindow = new google.maps.InfoWindow();
        // Loop through destructured array [markerObjects] created from api data
        this.props.markerObjects.forEach(marker => {
            const newMapMarker = new google.maps.Marker({
                map: map,
                position: { lat: marker.position.lat, lng: marker.position.lng },
                name: marker.name,
                title: marker.title,
                id: marker.id,
                key: marker.id,
                city: marker.city,
                phone: marker.phone,
                email: marker.email
            });

            const contentString = `<div class="card">
                <header class="card-header">
                  <p class="card-header-title is-size-6">
                    ${marker.name}
                  </p>
                </header>
                <div class="card-content">
                  <div class="content is-size-6">
                    City: ${marker.city}<br />
                    Phone: ${marker.phone}<br />
                    Email: ${marker.email}
                  </div>
                </div>
               
              </div>`;

            // Add event listener to mapMarker
            newMapMarker.addListener('click', () => {
                map.setCenter(newMapMarker.getPosition());
                infowindow.close();
                infowindow.setContent(contentString);
                infowindow.open(map, newMapMarker);
            });

            map.addListener('click', function() {
                infowindow.close();
            });

            // Add marker array
            newMapMarkersArray.push(newMapMarker);
        }, this);
        // Update state to the array that was generated in forEach loop
        this.setState({ mapMarkers: newMapMarkersArray });
        this.setState({ filteredMarkers: newMapMarkersArray });
        console.log(this.state.mapMarkers);
    }

    // Handle Toggle of Drawer
    drawerToggleHandler = () => {
        this.setState(prevState => {
            return { drawerOpen: !prevState.drawerOpen };
        });
    };

    render() {
        // Calculate bound points
        let points = this.state.mapMarkers.map(mapMarker => {
            return mapMarker.position;
        });

        // Set the bounds
        let bounds = new this.props.google.maps.LatLngBounds();
        points.forEach(point => {
            bounds.extend(point);
        });

        const mapStyle = {
            width: '100%',
            height: 'calc(100% - 52px)',
            top: '52px'
        };

        let haveDrawer;
        if (this.state.drawerOpen) {
            haveDrawer = (
                <SideDrawer
                    onListClicked={this.onListClicked}
                    filteredMarkers={this.state.filteredMarkers}
                    searchQuery={this.searchQuery}
                    drawerOpen={this.state.drawerOpen}
                    apiError={this.props.apiError}
                />
            );
        }

        /* Due to how Map Markers are loaded 'onReady' because of the work around. I had make scenarios that include:
        // Scenario 1: Api failed(true) to retrieve but map is able to load. Don't create markers. Remove onReady
        // Scenario 2: Api no errors but map had errors. Load the list, but have notice instead of map. 
        // Scenario 3: Both Api and Map works. Display both.
        */

        let mapComponent;
        if (this.props.apiError & !this.state.haveError) {
            mapComponent = (
                <Map
                    role={'application'}
                    onClick={this.onMapClicked}
                    google={window.google}
                    zoom={15}
                    initialCenter={{
                        lat: this.props.defaultCenter.lat,
                        lng: this.props.defaultCenter.lng
                    }}
                    bounds={bounds}
                    style={mapStyle}
                />
            );
        } else if (!this.props.apiError & this.state.haveError) {
            mapComponent = (
                <div class="notification is-primary">
                    <button class="delete" />
                    Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.{' '}
                    <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus
                    ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit
                    amet, consectetur adipiscing elit
                </div>
            );
        } else {
            mapComponent = (
                <Map
                    role={'application'}
                    onReady={this.createMarkers.bind(this)}
                    onClick={this.onMapClicked}
                    google={window.google}
                    zoom={15}
                    initialCenter={{
                        lat: this.props.defaultCenter.lat,
                        lng: this.props.defaultCenter.lng
                    }}
                    bounds={bounds}
                    style={mapStyle}
                />
            );
        }

        return (
            <main style={mapStyle} role="main" aria-label="map">
                <TopNav drawerToggleHandler={this.drawerToggleHandler} drawerOpen={this.state.drawerOpen} />
                {
                    /* If drawer is in open state display drawer */
                    haveDrawer
                }
                {/*<Map
                    role={'application'}
                    onReady={this.createMarkers.bind(this)}
                    onClick={this.onMapClicked}
                    google={window.google}
                    zoom={15}
                    initialCenter={{
                        lat: this.props.defaultCenter.lat,
                        lng: this.props.defaultCenter.lng
                    }}
                    bounds={bounds}
                    style={mapStyle}
                />*/}
                {mapComponent}
            </main>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB6aDkp2IyLQVhLJuiOq0lxyrJAaNyhqkA'
})(MapContainer);

/*let mapComponent;
if (this.props.apiError && !this.state.haveError) {
    mapComponent = (
        <Map
            role={'application'}
            onClick={this.onMapClicked}
            google={window.google}
            zoom={15}
            initialCenter={{
                lat: this.props.defaultCenter.lat,
                lng: this.props.defaultCenter.lng
            }}
            bounds={bounds}
            style={mapStyle}
        />
    );
} else if (!this.props.apiError && this.state.haveError) {
    //
} else {
    <Map
        role={'application'}
        onReady={this.createMarkers.bind(this)}
        onClick={this.onMapClicked}
        google={window.google}
        zoom={15}
        initialCenter={{
            lat: this.props.defaultCenter.lat,
            lng: this.props.defaultCenter.lng
        }}
        bounds={bounds}
        style={mapStyle}
    />;
}
*/
