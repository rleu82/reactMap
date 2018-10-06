import React, { Component } from 'react';

class ListDogs extends Component {
    render() {
        const listStyle = { margin: '10px 0' };
        return (
            <div className="level-left">
                <ul>
                    {this.props.dogs.map(dog => {
                        return (
                            <li style={listStyle} key={dog.id.$t}>
                                <div className="box">
                                    <article className="media">
                                        <div className="media-left">
                                            <figure className="image is-64x64">
                                                <img
                                                    src={
                                                        dog.media.photos
                                                            ? dog.media.photos.photo[0].$t
                                                            : 'http://www.free-icons-download.net/images/welsh-dwarf-dog-icon-87624.png'
                                                    }
                                                    alt={dog.name.$t}
                                                />
                                            </figure>
                                        </div>
                                        <div className="media-content">
                                            <div className="content">
                                                <p className="is-size-6">
                                                    <strong>{dog.name.$t ? dog.name.$t : 'Not Available'}</strong>
                                                    <br />
                                                    <small>Age: {dog.age.$t ? dog.age.$t : 'Not Available'}</small>
                                                    <br />
                                                    <small>
                                                        Phone:{' '}
                                                        {dog.contact.phone.$t ? dog.contact.phone.$t : 'Not Available'}
                                                    </small>
                                                    <br />
                                                    <small className="is-size-7">
                                                        Email: {/* Check if email is there and length > 1 */}
                                                        {dog.contact.email.$t && dog.contact.email.$t.length > 1
                                                            ? dog.contact.email.$t
                                                            : 'Not Available'}
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListDogs;
