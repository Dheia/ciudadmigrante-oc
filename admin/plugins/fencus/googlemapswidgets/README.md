# Fencus Google Maps Widgets

An simple solution to use Google Maps on the Back-end and Front-end.

## Description
* It's a solution to manage Google Maps and Markers on the back-end with an extensible Map Model to be used on the front-end.
* This plugin it's aimed for developers by developers.
* It aims to be as simple as possible, that's why we give you another two plugins to serve as an example of use for free: **Fencus Maps** and **Fencus Addressbook**.
* It is used by us in our own projects, so you can expect for a continued development and maintenance.
* We try to give you the best documentation that we can make, if you don't understand something on it, please contact us so we can help you and improve the documentation.
* If you want to see the plugin in action you can visit our [demo](http://www.fencus.com/octobercms/plugins/google-maps-widgets):
 * The demo uses two plugins that depends on this one: **Fencus Maps** and **Fencus Addressbook**.
* You can use **Fencus Maps** and **Fencus Addressbook** as examples to build your own plugin, they are available in GitHub and in the October Marketplace for **FREE** (they depend on Fencus Google Maps Widgets, so you will need to buy Fencus Google Maps WIdgets in order to use them):
 * **Fencus Maps** - [GitHub Repository](https://github.com/FlingeR/maps-plugin) - [October Marketplace](https://octobercms.com/plugin/fencus-maps)
 * **Fencus Addressbook** - [GitHub Repository](https://github.com/FlingeR/addressbook-plugin) - [October Marketplace](https://octobercms.com/plugin/fencus-addressbook)
* Do you need more functionality or have any idea to make this plugin better? Contact us, we want you to be happy and to make this the definitive solution to Google Maps for Developers on October.
 
### Consideration
* This plugin depends on **Google Maps JavaScript API**, for its use you need an API Key provided by **Google**. We are not responsable for the conditions and limitations of the service from Google, [click here to know more and get a key](https://developers.google.com/maps/documentation/javascript/).

## Contents of this plugin

### Location Selector FormWidget
Renders a map and uses a marker to indicate a given position on it, it returns the value as a [`google.maps.LatLngLiteral`](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngLiteral) object (in string format so you can store it in your database).

- Read the documentation for more information on how to use it.

### Address Locator FormWidget
It works in conjunction with the **Location Selector FormWidget**. It allows you to find an address using **Google Maps Geocoding Service**. When an address is selected it automaticaly places the marker of the **Location Selector FormWidget** on it.

- Read the documentation for more information on how to use it.

### Address Finder FormWidget
It allows you to find an address using the **Google Maps Geocoding Service**.

- Read the documentation for more information on how to use it.

### Map Configurator FormWidget
Configure the options of a Google Map and shows a preview of it LIVE, it returns the value as a [`google.maps.MapOptions`](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions) object (in string format so you can store it in your database):
* Select the initial position of the map.
* Select the initial zoom of the map.
* Enable/disable the scrollwheel to zoom in and out.
* Enable/disable StreetView option.
* Enable/disable full screen option.
* Enable/disable the Map Type selector.
* Define the position of the Map Type selector.
* Define the style of the Map Type selector.
* Select witch Map Type to use by default.
* Select the available Map Types to use.
* Enable/disable the Zoom Control.
* Define the position of the Zoom Control.
* Show markers form a relation or function on the map.

- Read the documentation for more information on how to use it.

### An API Loader Component
The API Loader Component loads the Javascript API from google and initilizes all the maps on a page that use the **Map Behavior**.
* The API also loads additional libraries if needed: [`drawing`](https://developers.google.com/maps/documentation/javascript/drawinglayer), [`geometry`](https://developers.google.com/maps/documentation/javascript/geometry), [`places`](https://developers.google.com/maps/documentation/javascript/places) and [`visualization`](https://developers.google.com/maps/documentation/javascript/visualization).
* The HTML code generated if used on the front-end will detect if there is more than one map on the page and will manage the conflicts to avoid any problems, that means that you can show lots of maps on a single page without conflicts.

### A Map Behavior
A behavior to implement in your components to show a Google Map.
* The behavior will automaticaly use the `$options`, `$width` and `$height` attributes to render the map.
* You can pass an array of **Markers** to be placed on the map.
* You need to use the API Loader Component **BEFORE** the map on the HTML page.

- Read the documentation for more information on how to use it.

### A Geolocation Component
Sets an approximate position to the user using HTML5 Geolocation or based on the IP of the user through Google Geolocation Web Service.
The data is saved to the user's session for further use.

- Read the documentation for more information on how to use it.

## Posible future developments on this plugin:
As stated before, we are users of this same plugin, in the future we will probably implement the following features to it or in a FREE Plugin compatible with this one:
* `Geolocation.` **Implemented in version 1.0.2.**
* Shapes on map.
* Markers customization:
 * Custom Icons.
 * Animations.
* Heatmap.
* Directions and distance matrix.
* Geocoding from latitude-longitude (marker) to formatted address.

## Warnings and considerations
* For the time being the FormWidgets are incompatible to use in the same form (the only exeption being using the **Address Locator** + **Location Selector**).
* When using the Map Model, remember that the markers are passed to the client-side in JSON Format, if you are passing a model remember to use the [`$hidden` attribute](https://octobercms.com/docs/database/serialization#hiding-attributes-from-json) to define those fields that you don't wish to be publicly visible.

# Documentation

## First step

### Google API Key and default map center.
1. Go to your **backend settings**, click on **Fencus Google Maps Widgets**.
2. Define your **Google Maps Browser API Key**.
* This plugin depends on **Google Maps JavaScript API**, for its use you need an API Key, provided by **Google**, [click here to know more and get an API Key](https://developers.google.com/maps/documentation/javascript/).
3. Set the default map center for the FormWidgets.
* This will be the starting position of the maps shown by the FormWidgets.

## Location selector FormWidget
### Description
Indicates a given position on a map using a marker.

### Usage
	latlng:
        label: Location
        type: location-selector
        height: 450px
        width: 100%

* **type:** Must be `location-selector`.
* **height:** Height of the FormWidget. *(Optional, format in px or %)*.
* **width:** Width of the FormWidget. *(Optional, format in px or %)*.
* Returns the value as a [`google.maps.LatLngLiteral`](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngLiteral) object (in string format so you can store it in your database).

### Warnings
* Compatible to use with **Address Locator FormWidget**.
* Incompatible with **Map Configurator FormWidget** and **Address Finder FormWidget**.

## Address Locator FormWidget
It works in conjunction with the **Location Selector FormWidget**, it allows you to find an address using **Google Maps Geocoding Service**, when an address is selected it automaticaly places the Marker of the **Location Selector FormWidget** on it.

### Usage
    address:
        label: Address
        type: address-locator

* **type:** Must be `address-locator`.
* Returns a string with the selected address.

### Warnings
* Requires **Location Selector FormWidget** to be used.
* Incompatible with **Map Configurator FormWidget** and **Address Finder FormWidget**.

## Address Finder FormWidget
It allows you to find an address using the **Google Maps Geocoding Service**.

### Usage
    address:
        label: Address
        type: address-finder

* **type:** Must be `address-locator`.
* Returns a string with the selected address.

### Warnings
* Incompatible with **Location Selector FormWidget**, **Address Locator FormWidget** and **Map Configurator FormWidget**.

## Map Configurator FormWidget
Configure the options of a Google Map and shows a preview of it LIVE:
* Select the initial position of the map.
* Select the initial zoom of the map.
* Enable/disable the scrollwheel to zoom in and out.
* Enable/disable StreetView option.
* Enable/disable full screen option.
* Enable/disable the Map Type Selector.
* Define the position of the Map Type Selector.
* Define the Style of the Map Type Selector.
* Select witch Map Type to use by default.
* Select the available Map Types to use.
* Enable/disable the Zoom Control.
* Define the position of the Zoom Control.
* Show markers form a relation or function on the map.

### Usage
    options:
        label: Options
        type: map-options
        height: 450px
        width: 100%
        markers: locations
        function: false


* **type:** Must be `map-options`.
* **height:** Height of the FormWidget. *(Optional, format in px or %)*.
* **width:** Width of the FormWidget. *(Optional, format in px or %)*.
* **markers:** Relation or function of the model used to get the markers (it allows [Deferred binding](https://octobercms.com/docs/database/relations#deferred-binding)), the models or results must have these attributes: `$name`, `$latlng` and optionaly `$info_window`. *(Optional)*.
 * `$name`: String.
 * `$latlng`: Must be a [`google.maps.LatLngLiteral`](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngLiteral) object in String Format.
 * `$info_window`: Infowindows are displayed when the marker is clicked, must be a string with html format.
* **function:** Specifies if the **markers** variable is a relation or a function. *(Optional)*.
* Returns the value as a [`google.maps.MapOptions`](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions) object (in string format so you can store it in your database)

### Example using a function to get the markers:
    options:
        label: Options
        type: map-options
        height: 450px
        width: 100%
        markers: getLocations
        function: true

* The function of the model must return an array of objects with the attributes: `$name`, `$latlng` and optionaly `$info_window` as estated before.

### Warnings
* Incompatible with **Location Selector FormWidget**, **Address Locator FormWidget** and **Address Finder FormWidget**.


### An API Loader Component

### Usage
1- Configure your API Key on the backend settings.
2- Place the API Loader Component on your page or layout.
3- Select which additional libraries to load if needed: [`drawing`](https://developers.google.com/maps/documentation/javascript/drawinglayer), [`geometry`](https://developers.google.com/maps/documentation/javascript/geometry), [`places`](https://developers.google.com/maps/documentation/javascript/places) and [`visualization`](https://developers.google.com/maps/documentation/javascript/visualization).

The API Loader does two things:
* Loads the Javascript API from Google.
* Initilizes all the maps using the Map Behavior.

Because of that, you should place the API Loader Component **BEFORE** using the HTML code generated by the behavior.

## A Map Behavior

### Usage
1- Implement the Map Behavior on your class:

	class Map extends Model
	{
		public $implement = [
			'Fencus.GoogleMapsWidgets.Behaviors.Map',
		];
	}

2- Use the following function to obtain a HTML code, ready to be used on the front-end:

	
	$html = $map->getHtmlMap($alias,$markers);
	

* **alias:** Must be a name to identify this map to avoid conflicts with others (without whitespaces), if you are using this fuction on a component, the most recomendable thing is to pass the alias of the component (`$this->alias`).
* **markers:** These are the markers to be shown on the map, they must have the following attributes: `$name`, `$latlng` and optionaly `$info_window`.
 * `$name`: String.
 * `$latlng`: Must be a [`google.maps.LatLngLiteral`](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngLiteral) object in String Format.
 * `$info_window`: Infowindows are displayed when the marker is clicked, must be a string with HTML format.
 
### Warnings
* You need to use the API Loader Component **BEFORE** the HTML code generated by the Behavior.

## A Geolocation Component
Just add the component to your layout, the component will get an approximate position from the user Browser using HTML5 or by its IP Address using Google Geolocation Web Service and will add three keys to the users session:
* `geolocation`: A [`google.maps.LatLngLiteral`](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngLiteral) object in String Format.
* `geolocationType`: This could be 'HTML5' or 'IP'.
* `geolocationAccuracy`: The approximate radius between the user and the geolocation position.

 - You need an API Key with Google Geolocation Web Service enabled to use this component.
 - Remember that we do not held responsability for the use of this component.