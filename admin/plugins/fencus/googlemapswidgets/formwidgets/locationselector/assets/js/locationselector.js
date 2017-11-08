var map;
var geocoder;
var marker;

function initialize() {
if(document.getElementById('locationSelector').value)
{
	var loc = JSON.parse(document.getElementById('locationSelector').value);
}
else
{
	var loc = JSON.parse(document.getElementById('locationDefault').value);
	document.getElementById('locationSelector').value = document.getElementById('locationDefault').value;
}
	var options = {
	        center: loc,
	        zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        streetViewControl: false
	    };
      geocoder = new google.maps.Geocoder();
      map = new google.maps.Map(document.getElementById("map"),
    		  options);
      
      placeMarker(loc);
      
      google.maps.event.addListener(marker, "position_changed", function() {
          document.getElementById('locationSelector').value=JSON.stringify(marker.getPosition());
      });
      
      if(typeof autocompleteLoader !== "undefined")
      	loadAutocomplete();
}



function placeMarker(location) {
    if(marker){
        marker.setPosition(location);
    }else{
        marker = new google.maps.Marker({
            position: location, 
            map: map,
            draggable: true
        });
    }
    map.setCenter(location);
}
