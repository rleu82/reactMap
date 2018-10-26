import React from 'react';

const sideInfo = props => {
    const width = {
        width: '400px',
        left: '0'
    };
    return (
        <div className="column" style={width}>
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title is-size-6">{props.name}</p>
                </header>
                <div class="card-content">
                    <div class="content is-size-6">
                        City: {props.city}
                        <br />
                        Phone: {props.phone}
                        <br />
                        Email: {props.email}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default sideInfo;
