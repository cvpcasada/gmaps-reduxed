import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {
  isFetching: false,
  suggest: {},
  suggestInput: '',
  suggestedPlaces: [],

  mapOptions: {
    center: {lat: 14.554729, lng: 121.02444519999995}, markers: []
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_SUGGESTED:
      const {location} = action.suggest;

      const mapOptions = {
        center: location,
        markers: [{
          position: location,
          defaultAnimation: 3
        }]
      };

      return {...state, suggestInput: action.suggest.label, suggest: action.suggest, mapOptions};

    case ActionTypes.SUGGEST_INPUT_CHANGED:
          return {...state, suggestInput: action.value};

    case ActionTypes.REQUEST_SUGGESTED_PLACES:
          return {...state, isFetching: true};
    
    case ActionTypes.RECEIVE_SUGGESTED_PLACES: {
      return {...state, isFetching: false, suggestedPlaces: action.places};
    }
    default:
      return state;
  }
}
