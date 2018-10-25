import React from 'react';

const toggleDrawer = props => {
    return (
        <button role="button" aria-label="Navigation" className="toggle-drawer" onClick={props.drawerToggleHandler}>
            <div className="hamburger-line" />
            <div className="hamburger-line" />
            <div className="hamburger-line" />
        </button>
    );
};
export default toggleDrawer;
