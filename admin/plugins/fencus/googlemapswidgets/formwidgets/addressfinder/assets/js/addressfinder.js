function initialize() {
	input = document.getElementById("addressFinder");
    new google.maps.places.Autocomplete(input);
}