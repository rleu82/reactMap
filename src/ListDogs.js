import React, { Component } from 'react';

class ListDogs extends Component {
    render() {
        return (
            <div className="level-left">
                <ol>
                    {this.props.dogs.map(dog => {
                        return (
                            <li key={dog.id.$t}>
                                <figure className="image is-96x96">
                                    <img src={dog.media.photos.photo[3].$t} />
                                </figure>
                                <p className="has-text-white">Name and Age</p>
                                <p className="has-text-white">Address:</p>
                                <p className="has-text-white">Phone:</p> {/* Check if available*/}
                                <p className="has-text-white">Email:</p> {/* Check if available*/}
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}

export default ListDogs;
