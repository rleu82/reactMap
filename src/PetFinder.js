import fetchJsonp from 'fetch-jsonp';

// Find Dogs
export function getDogs(zip) {
    let zipcode = zip;
    // fetch parameters are specified  in URL query strings using '&' then argument name
    // as stated in petfinder API https://www.petfinder.com/developers/api-docs#methods
    fetchJsonp(
        `http://api.petfinder.com/pet.find?format=json&key=0486cb8d84957db4db8abbb194319fdf&animal=dog&location=${zipcode}&output=full&callback=callback`,
        { jsonpCallbackFunction: 'callback' }
    )
        .then(res => res.json())
        .then(data => console.log(data.petfinder.pets.pet));
}

export const getshelter = zip => {
    let zipcode = zip;
    // fetch parameters are specified  in URL query strings using '&' then argument name
    // as stated in petfinder API https://www.petfinder.com/developers/api-docs#methods
    fetchJsonp(
        `http://api.petfinder.com/shelter.find?format=json&key=0486cb8d84957db4db8abbb194319fdf&location=${zipcode}&name=full&callback=callback`,
        { jsonpCallbackFunction: 'callback' }
    )
        .then(res => res.json())
        .then(data => console.log(data.petfinder.shelters.shelter))
        .catch(err => console.log(err));
};
getshelter(91740);
