import React from 'react';

const apiHasError = props => {
    const sidePanel = {
        height: '73vh',
        width: '350px'
    };
    return (
        <div className="level-left" style={sidePanel}>
            <div class="notification is-warning">
                <button class="delete" />
                An error has occured
            </div>
        </div>
    );
};
export default apiHasError;
