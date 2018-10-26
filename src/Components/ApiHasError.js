import React from 'react';

const apiHasError = props => {
    const sidePanel = {
        height: '73vh',
        width: '350px'
    };
    const notificationBox = {
        width: '100%'
    };
    return (
        <div className="level-left" style={sidePanel}>
            <div class="notification is-warning" style={notificationBox}>
                There was a problem retrieving the list of animal shelters.
            </div>
        </div>
    );
};
export default apiHasError;
