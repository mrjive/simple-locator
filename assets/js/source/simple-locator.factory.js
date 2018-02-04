/**
* Primary Simple Locator Initialization
* @package Simple Locator
* @author Kyle Phillips - https://github.com/kylephillips
*
* Document Events:
* simple-locator-error[error-type, form]
* simple-locator-address-geocoded[results, form]
* simple-locator-form-success[results, form]
* simple-locator-infowindow-opened[mapIndex, markerIndex]
*/

jQuery(document).ready(function(){
	new SimpleLocator.Factory;
});

var SimpleLocator = SimpleLocator || {};

// DOM Selectors
SimpleLocator.selectors = {
	form : 'data-simple-locator-form',
	formContainer : 'data-simple-locator-form-container',
	formError : 'data-simple-locator-form-error',
	results : 'data-simple-locator-results',
	map : 'data-simple-locator-map',
	inputAddress : 'data-simple-locator-input-address',
	inputLatitude : 'data-simple-locator-input-latitude',
	inputLongitude : 'data-simple-locator-input-longitude',
	inputUnit : 'data-simple-locator-input-unit',
	inputDistance : 'data-simple-locator-input-distance',
	inputFormattedLocation : 'data-simple-locator-input-formatted-location',
	inputGeocode : 'data-simple-locator-input-geocode',
	submitButton : 'data-simple-locator-submit',
	infoWindowLink : 'data-simple-locator-open-infowindow'
}

// JS Data
SimpleLocator.jsData = {
	secure : false,
}

// API Endpoints
SimpleLocator.endpoints = {
	search : wpsl_locator.rest_url + '/search',
	locations : wpsl_locator.rest_url + '/locations'
}

// Map Objects
SimpleLocator.maps = [];

// Map Markers
SimpleLocator.markers = [];

/**
* Primary Simple Locator Class
*/
SimpleLocator.Factory = function()
{
	var self = this;
	var $ = jQuery;

	self.init = function()
	{
		SimpleLocator.jsData.secure = ( location.protocol === 'https:' ) ? true : false;
		new SimpleLocator.Geocoder;
		new SimpleLocator.PlacesAutocomplete;
		new SimpleLocator.DefaultMap;
		new SimpleLocator.SingleLocation;
		new SimpleLocator.AllLocations;
		new SimpleLocator.Form;
		new SimpleLocator.ResultsMap;
		new SimpleLocator.ResultsList;
		new SimpleLocator.InfoWindowOpen;
		new SimpleLocator.Errors;
	}

	return self.init();
}