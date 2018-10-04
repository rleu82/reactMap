import fetchJsonp from 'fetch-jsonp';

// Find Dogs
export const getDogs = zip =>
    // fetch parameters are specified  in URL query strings using '&' then argument name
    // as stated in petfinder API https://www.petfinder.com/developers/api-docs#methods
    fetchJsonp(
        `http://api.petfinder.com/pet.find?format=json&key=0486cb8d84957db4db8abbb194319fdf&animal=dog&location=${zip}&callback=callback`,
        { jsonpCallbackFunction: 'callback' }
    )
        .then(res => res.json())
        .then(data => data.petfinder.pets.pet)
        .catch(err => console.log(err));
