var autocompleteLoader = true;
function loadAutocomplete() {
	input = document.getElementById("addressSelector");
    autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete,'place_changed',function () {
          placeMarker(autocomplete.getPlace().geometry.location);
          });
}
