import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const toggleDrawer = props => {
    /* Conditionally render Toggle button on state change */
    let openedDrawer;
    if (props.drawerOpen) {
        openedDrawer = () => {
            return (
                <button aria-label="Close Search Panel" className="toggle-drawer" onClick={props.drawerToggleHandler}>
                    <FontAwesomeIcon icon="chevron-left" size="3x" />
                </button>
            );
        };
    } else {
        openedDrawer = () => {
            return (
                <button aria-label="Open Search Panel" className="toggle-drawer" onClick={props.drawerToggleHandler}>
                    <FontAwesomeIcon icon="bars" size="3x" />
                </button>
            );
        };
    }
    return openedDrawer();
};
export default toggleDrawer;
