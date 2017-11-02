app.controller('CiudadController', function($scope, $rootScope, $http, config) {  

	$("body > header nav").removeClass("short");


	// filters

	$("section#ciudad-map aside .handle").click(function(){
		$(this).parent().toggleClass('expanded');
	});


    // Google Maps

    var myOptions = {
        zoom: 14,
        center: new google.maps.LatLng(41.3900844,2.1763873),
        disableDefaultUI: true,
        zoomControl: true,
        // mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeId: 'satellite',
        heading: 90,
        tilt: 45,
        styles: [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#193341"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c5a71"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#29768a"
            },
            {
                "lightness": -37
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#3e606f"
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.84
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "weight": 0.6
            },
            {
                "color": "#1a3541"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c5a71"
            }
        ]
    }
]
    };
    var map = new google.maps.Map(document.getElementById("map"), myOptions); 
    
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(41.3900844,2.1763873),
        map: map,
        icon: 'images/marker-yellow.png'
    });

    var infowindow = new google.maps.InfoWindow({
        content: 'hola'
    });

    google.maps.event.addListener(marker, 'click', function() {
       infowindow.open(map, marker);
    });

    infowindow.open(map, marker);

});