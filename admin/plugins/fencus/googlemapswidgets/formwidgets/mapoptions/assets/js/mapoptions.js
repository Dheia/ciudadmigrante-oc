var map;
var options = {};
var markers = {};

function addMarkers(data)
{

	for(marker in markers) {
		markers[marker].setMap(null);
	  }
	
	markers = {};

	var result = JSON.parse(data.result);
	for (i = 0; i < result.length; i++) {
		latLng = JSON.parse(result[i].latlng);
		var name = "("+latLng.lat+", "+latLng.lng+")";
		 markers[name] = new google.maps.Marker({
		    position: latLng,
		    map: map,
		    title: result[i].name
		  });

		 if(result[i].info_window)
	   	  {
	   		  markers[name].infowindow =  new google.maps.InfoWindow({content: result[i].info_window});
	       	  markers[name].addListener('click', function(pos) {
	       		  for(marker in markers) {
	       			markers[marker].infowindow.close();
	       		  }
	       		  markers[pos.latLng].infowindow.open(map, markers[pos.latLng]);
	       	  }); 
	   	  }
		}
	}

function refreshLocations()
{
	var session_key = '';
	if(document.getElementsByName('_session_key'))
		session_key = document.getElementsByName('_session_key')[0].value;
	var func = document.getElementById('isFunction').value;
	$.request('onGetMarkers', {
		data: {markers: document.getElementById('markers').value, sessionKey: session_key, isFunction: func},
	    success: function(data) {
	    	addMarkers(data);
	    }
	});
}

function changeZoom(){
	if(document.getElementById('zoom').value)
	{
		map.setZoom(parseInt(document.getElementById('zoom').value));
		options.zoom = parseInt(document.getElementById('zoom').value);
	}
}

function changeMapTypeId(){
	options.mapTypeId = document.getElementById('map_type').value;
	changeOptions();
	map.setMapTypeId(document.getElementById('map_type').value);
}

function changeMapTypeControl(){
	options.mapTypeControl = document.getElementById('map_type_control').checked;
	changeOptions();
}

function changeFullscreen(){
	options.fullscreenControl = document.getElementById('fullscreen').checked;
	changeOptions();
}

function changeStreetview(){
	options.streetViewControl = document.getElementById('streetview').checked;
	changeOptions();
}

function changeMapTypes(){
	var mapTypes = [];
	var checkboxes = document.getElementsByName('map-types');
	for (i=0; i < checkboxes.length; i++) {
	    if(checkboxes[i].checked)
	    {
	    	mapTypes.push(checkboxes[i].value);
	    }
	}
	
	options.mapTypeControlOptions = { mapTypeIds: mapTypes, position: document.getElementById('map_type_position').value, style: document.getElementById('map_type_style').value };
	changeOptions();
}

function changeZoomControlOptions(){
	options.zoomControlOptions = { position: document.getElementById('zoom_position').value, style: google.maps.ZoomControlStyle.DEFAULT };
	changeOptions();
}

function changePosition(){
	if(document.getElementById('latitude').value && document.getElementById('longitude').value)
	{
		map.setCenter(new google.maps.LatLng(document.getElementById('latitude').value, document.getElementById('longitude').value ));
		options.center = new google.maps.LatLng(document.getElementById('latitude').value, document.getElementById('longitude').value );
	}
}

function changeZoomControl(){
	options.zoomControl = document.getElementById('zoom_control').checked;
	changeOptions();
}

function changeScrollwheel(){
	options.scrollwheel = document.getElementById('scrollwheel').checked;
	changeOptions();
}

function changeOptions()
{
	saveOptions();
	map.setOptions(options);
}

function saveOptions()
{
	document.getElementById('options').value = JSON.stringify(options);
}

function initialize() {
	  if(document.getElementById('options').value)
	  {
		  options = JSON.parse(document.getElementById('options').value);
	  }
	  else
	  {
		  options.mapTypeId = google.maps.MapTypeId.ROADMAP;
		  options.zoom = 16;
		  options.center = JSON.parse(document.getElementById('locationDefault').value);
		  options.mapTypeControl = true;
		  options.fullscreenControl = false;
		  options.streetViewControl = true;
		  options.zoomControl = true;
		  options.scrollwheel = true;
		  options.zoomControlOptions = { position: google.maps.ControlPosition.RIGHT_BOTTOM, style: google.maps.ZoomControlStyle.DEFAULT };
		  options.mapTypeControlOptions = { mapTypeIds: [google.maps.MapTypeId.ROADMAP], position: google.maps.ControlPosition.TOP_LEFT, style: google.maps.MapTypeControlStyle.DEFAULT };
	  }
	  
	  var positions = [];
	  i=0;
	  positions[i++] = { id: google.maps.ControlPosition.RIGHT_BOTTOM, text: "Right Bottom"};
	  positions[i++] = { id: google.maps.ControlPosition.RIGHT_TOP, text: "Right Top"};
	  positions[i++] = { id: google.maps.ControlPosition.RIGHT_CENTER, text: "Right Center"};
	  positions[i++] = { id: google.maps.ControlPosition.LEFT_BOTTOM, text: "Left Bottom"};
	  positions[i++] = { id: google.maps.ControlPosition.LEFT_TOP, text: "Left Top"};
	  positions[i++] = { id: google.maps.ControlPosition.LEFT_CENTER, text: "Left Center"};
	  positions[i++] = { id: google.maps.ControlPosition.BOTTOM_RIGHT, text: "Bottom Right"};
	  positions[i++] = { id: google.maps.ControlPosition.BOTTOM_LEFT, text: "Bottom Left"};
	  positions[i++] = { id: google.maps.ControlPosition.BOTTOM_CENTER, text: "Bottom Center"};
	  positions[i++] = { id: google.maps.ControlPosition.TOP_RIGHT, text: "Top Right"};
	  positions[i++] = { id: google.maps.ControlPosition.TOP_LEFT, text: "Top Left"};
	  positions[i++] = { id: google.maps.ControlPosition.TOP_CENTER, text: "Top Center"};
	  
	  var zoomPos = document.getElementById('zoom_position');
	  for (i=0; i < positions.length; i++) {
		    var option = document.createElement('option');
		    option.setAttribute('value', positions[i].id);
		    option.innerHTML =  positions[i].text;
		    zoomPos.appendChild(option);
		}
	  
	  var mapTypePos = document.getElementById('map_type_position');
	  for (i=0; i < positions.length; i++) {
		    var option = document.createElement('option');
		    option.setAttribute('value', positions[i].id);
		    option.innerHTML =  positions[i].text;
		    mapTypePos.appendChild(option);
		}
	  
	  var mapTypeStyles = [];
	  i=0;
	  mapTypeStyles[i++] = { id: google.maps.MapTypeControlStyle.DEFAULT, text: "Default"};
	  mapTypeStyles[i++] = { id: google.maps.MapTypeControlStyle.DROPDOWN_MENU, text: "Dropdown Menu"};
	  mapTypeStyles[i++] = { id: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, text: "Horizontal Bar"};
	  
	  var mapTypeStyle = document.getElementById('map_type_style');
	  for (i=0; i < mapTypeStyles.length; i++) {
		    var option = document.createElement('option');
		    option.setAttribute('value', mapTypeStyles[i].id);
		    option.innerHTML =  mapTypeStyles[i].text;
		    mapTypeStyle.appendChild(option);
		}
	  
	  var mapTypes = [];
	  i=0;
	  mapTypes[i++] = { id: google.maps.MapTypeId.ROADMAP, text: "Roadmap"};
	  mapTypes[i++] = { id: google.maps.MapTypeId.SATELLITE, text: "Satellite"};
	  mapTypes[i++] = { id: google.maps.MapTypeId.HYBRID, text: "Hybrid"};
	  mapTypes[i++] = { id: google.maps.MapTypeId.TERRAIN, text: "Terrain"};
	  
	  var mapType = document.getElementById('map_type');
	  for (i=0; i < mapTypes.length; i++) {
		    var option = document.createElement('option');
		    option.setAttribute('value', mapTypes[i].id);
		    option.innerHTML =  mapTypes[i].text;
		    mapType.appendChild(option);
		}
	  
	  var divMapTypes = document.getElementById("map-types-div");
	  for (i=0; i < mapTypes.length; i++) {
		  
		  	var div = document.createElement('div');
		  	div.setAttribute('class', "checkbox custom-checkbox");
		  	divMapTypes.appendChild(div);
		  	
		    var checkbox = document.createElement('input');
		    checkbox.setAttribute('type', "checkbox");
		    checkbox.setAttribute('name', "map-types");
		    checkbox.setAttribute('id', "map-types-"+mapTypes[i].id);
		    checkbox.setAttribute('value', mapTypes[i].id);
		    div.appendChild(checkbox);
		    checkbox.addEventListener("change", changeMapTypes);
		    var label = document.createElement('label');
		    label.setAttribute('for', "map-types-"+mapTypes[i].id);
		    label.innerHTML = mapTypes[i].text;
		    div.appendChild(label);
		}
	  
	  document.getElementById('zoom').value = options.zoom;
	  document.getElementById('latitude').value = options.center.lat;
	  document.getElementById('longitude').value = options.center.lng;
	  document.getElementById('map_type').value = google.maps.MapTypeId.ROADMAP;
	  document.getElementById('map_type_control').checked = options.mapTypeControl;
	  document.getElementById('fullscreen').checked = options.fullscreenControl;
	  document.getElementById('streetview').checked = options.streetViewControl;
	  document.getElementById('zoom_control').checked = options.zoomControl;
	  document.getElementById('scrollwheel').checked = options.scrollwheel;
	  document.getElementById('map_type_position').value = options.mapTypeControlOptions.position;
	  document.getElementById('map_type_style').value = options.mapTypeControlOptions.style;
	  document.getElementById('zoom_position').value = options.zoomControlOptions.position;
	  var checkedMapTypes = options.mapTypeControlOptions.mapTypeIds;
	  for (i=0; i < checkedMapTypes.length; i++) {
		  document.getElementById('map-types-'+checkedMapTypes[i]).checked = true;
		}
	  
      map = new google.maps.Map(document.getElementById("map"), options);
      saveOptions();
      
      map.addListener('zoom_changed', function() {
    	 document.getElementById('zoom').value = map.getZoom();
    	 options.zoom = map.getZoom();
    	 saveOptions()
      });
     
      map.addListener('center_changed', function() {
    	 document.getElementById('latitude').value = map.getCenter().lat();
    	 document.getElementById('longitude').value = map.getCenter().lng();
    	 options.center = map.getCenter();
    	 saveOptions()
      });
      
      $('#latitude').change("keydown", changePosition);
      $('#longitude').change("keydown", changePosition);
      $('#zoom').change("keydown", changeZoom);
      $('#fullscreen').change("change", changeFullscreen);
      $('#streetview').change("change", changeStreetview);
      $('#map_type_style').change("change", changeMapTypes);
      $('#map_type_position').change("change", changeMapTypes);
      $('#zoom_position').change("change", changeZoomControlOptions);
      $('#map_type').change("change", changeMapTypeId);
      $('#map_type_control').change("change", changeMapTypeControl);
      $('#zoom_control').change("change", changeZoomControl);
      $('#scrollwheel').change("change", changeScrollwheel);
      
      changeMapTypes();
      changeZoomControlOptions();
      changePosition();
      changeZoom();
      if(document.getElementById('markers').value)
      {
    	  refreshLocations();
      }
}