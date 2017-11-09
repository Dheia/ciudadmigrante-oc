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

/*    
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(41.3900844,2.1763873),
        map: map,
        icon: 'images/marker-blue.png'
    });
    var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(41.3831942,2.1864975),
        map: map,
        icon: 'images/marker-green.png'
    });
    var marker3 = new google.maps.Marker({
        position: new google.maps.LatLng(41.3800844,2.1663873),
        map: map,
        icon: 'images/marker-yellow.png'
    });


    var content = [
        '<h2>hola</h2><p>Dirección completa con calle número xxx puerta. 08000 - ciudad</p><p class="lead">T. <a href="tel:+34 600 000 000">+34 600 000 000</a></p><p class="lead"><a href="mailto:direccion@demail.com">direccion@demail.com</a></p><p class="lead"><a href="http://www.bcn.cat/novaciutadania/index.html" target="_blank">www.bcn.cat/novaciutadania/index.html</a></p>',
        '<a href="javascript:" class="espacio"><img src="dummy-data/infowindow/espacio.jpg" alt=""><h2>Dialogos sin fronteras</h2></a>',
        '<a href="javascript:" class="relato"><img src="dummy-data/infowindow/relato.jpg" alt=""></a>'        
    ];

    var infowindow = new google.maps.InfoWindow({
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(content[0]);
        infowindow.open(map, marker);
    });
    google.maps.event.addListener(marker2, 'click', function() {
        infowindow.setContent(content[1]);
        infowindow.open(map, marker2);
    });
    google.maps.event.addListener(marker3, 'click', function() {
        infowindow.setContent(content[2]);
        infowindow.open(map, marker3);
    });
    */

    $scope.markers = [];

    $scope.infowindow = new google.maps.InfoWindow({});

    var marker;

    $scope.openedInfoWindowId;

    $scope.createMarkers = function() 
    {
        $scope.deleteMarkers();

        for (i in $scope.puntosDeAcogidaData) {
            var itemData = $scope.puntosDeAcogidaData[i];

            if (!itemData.latlng) {
                continue;
            }

            var latlng = itemData.latlng.split(",");

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(latlng[0],latlng[1]),
                map: map,
                icon: 'images/marker-blue.png',
                title: itemData.name
            });
            $scope.markers.push(marker);

            $scope.createInfoWindow(marker, itemData);
        }
    }

    $scope.createInfoWindow = function(m, itemData) 
    {
        google.maps.event.addListener(m, 'click', function() {
            if ($scope.openedInfoWindowId == ('ayuda' + itemData.id)) {
                $scope.infowindow.close();
                $scope.openedInfoWindowId = null;
            }
            else {
                $scope.infowindow.setContent($scope.generateInfowindowContent(itemData));
                $scope.infowindow.open(map, m);
                $scope.openedInfoWindowId = 'ayuda' + itemData.id;
            }
        });
    }


    $scope.generateInfowindowContent = function(itemData)
    {
        var html = '<h2>' + itemData.name + '</h2><p>' + itemData.direccion + ' ' + itemData.codigo_postal + ' - ' + itemData.ciudad + '</p>';
        if (itemData.telefono) {
            html += '<p class="lead">T. <a href="tel:' + itemData.telefono + '">' + itemData.telefono + '</a></p>';
        }
        if (itemData.email) {
            html += '<p class="lead"><a href="mailto:' + itemData.email + '">' + itemData.email + '</a></p>';
        }      
        if (itemData.web) {
            html += '<p class="web"><a href="' + itemData.web + '" target="_blank"></a></p>';
        }        

        // '<a href="javascript:" class="espacio"><img src="dummy-data/infowindow/espacio.jpg" alt=""><h2>Dialogos sin fronteras</h2></a>',
        // '<a href="javascript:" class="relato"><img src="dummy-data/infowindow/relato.jpg" alt=""></a>' 

        return html;
    }


    $scope.deleteMarkers = function() 
    {
        for (i in $scope.markers) {
            $scope.markers[i].setMap(null);
        }
        $scope.markers = [];
    }



    $scope.puntosDeAcogidaData = null;
    
    $scope.loadPuntosDeAcogidaData = function()
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_puntosdeacogida,
            params  : {
                // 'lang': $rootScope.language
            }
        })
        .then(function(response) {
            $scope.puntosDeAcogidaData = response.data;
            $scope.createMarkers();
        });
    }
    $scope.loadPuntosDeAcogidaData();

});