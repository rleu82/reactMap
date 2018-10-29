# Neighborhood Map : Adopt And Save A Pet

## Overview

This app was created for Project 7 of Udacity Front End Nanodegree program using React and is bootstrap with Create React App. It is a local map of animal shelters within and around Downtown Los Angeles.

![Map with Side Panel](src/images/image1.png)
![Map without Side Panel](src/images/image2.png)

[PetFinder's API](https://www.petfinder.com/developers/) is used for all the needed information. Markers are placed when map finishes loading. The list of shelters are sorted in real time as user types. Information about the shelter is displayed when the user clicks or keypress 'Enter'.

## Installation and Development

1. Download or clone this [repository](https://github.com/rleu82/reactMap)
2. Navigate to the directory where this repo was clone or extracted
3. Run `npm install` to install all dependencies.
4. Run `npm start` to start the server at [localhost:3000](http://localhost:3000/)
5. Navigate to [Google](https://cloud.google.com/maps-platform/) and create and account and generate an api key for Google Maps Javascript API. (Place your maps key on line 358 MapContainer.js after "apiKey:")
6. Goto [PetFinder](https://www.petfinder.com/developers/api-key) and create an account and grab your api key. PetFinder's api key is used within the fetch url after `...&key=` and before `&count`.
   IE: `http://api.petfinder.com/shelter.find?format=json&key=YourKeyHere&count=100&location=${location}&callback=callback`

## Dependencies
