export const MAPS_API_KEY = 'AIzaSyDt7QhRgsLNtaBAlr_fEQYvRVh9bbxEsFg';

export const fetchOptions = {
    method: 'get',
    headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
};

export const placesApis = {
    countryList : 'http://api.geonames.org/countryInfo?username=cyrus_apps&type=json',
    countryInfo : (countryCode, countryName) => `http://api.geonames.org/search?country=${countryCode}&maxRows=1&type=json&username=cyrus_apps`,
    famousLocations: (lat,lng, apiKey = MAPS_API_KEY) => `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=100&key=${apiKey}`,
    grabImage: (photoRef, maxWidth = 400, apiKey = MAPS_API_KEY) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoRef}&key=${apiKey}`,
    requestUber: (lat,lng) => `uber://?client_id=SRJGjoE8VyAkiUtO_D43D18uQCsHj2kl&action=setPickup&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d`

};