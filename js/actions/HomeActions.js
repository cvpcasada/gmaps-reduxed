import {SELECT_SUGGESTED, REQUEST_SUGGESTED_PLACES, RECEIVE_SUGGESTED_PLACES, SUGGEST_INPUT_CHANGED, SUGGEST_ACTIVATED} from '../constants/ActionTypes';

const GooglePlacesService = new google.maps.places.PlacesService(
  (() => {
    const attribution = document.createElement('div');
    attribution.className = 'hidden';

    return attribution;
  })());

export function handleSuggestInputChange(value) {
  return {
    type: SUGGEST_INPUT_CHANGED,
    value
  }
}

export function activateSuggest(suggest) {
  return {
    type: SUGGEST_ACTIVATED,
    suggest
  }
}


export function handleSelectSuggest(suggest) {
  return {
    type: SELECT_SUGGESTED,
    suggest
  }
}

export function requestSuggestedPlaces(suggest) {
  return {
    type: REQUEST_SUGGESTED_PLACES,
    suggest
  }
}

export function receiveSuggestedPlaces(suggest,places =[]) {
  return {
    type: RECEIVE_SUGGESTED_PLACES,
    suggest,
    places
  }
}

export function fetchSuggestedPlace(suggest) {
  return (dispatch) => {
    dispatch(requestSuggestedPlaces(suggest));
    const {lat, lng} = suggest.location;

          
    return new Promise((resolve,reject) => {

      const request = {
        location: new google.maps.LatLng(lat,lng),
        radius: '500',
        types: ['store','food']
      };

      GooglePlacesService.nearbySearch(request, (results, status) => {
        if (results && status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
        }
      });

    }).then(result => dispatch(receiveSuggestedPlaces(suggest,result)));

  }
}
