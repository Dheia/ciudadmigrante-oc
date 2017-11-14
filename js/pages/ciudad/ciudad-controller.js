app.controller('CiudadController', function($scope, $rootScope, $http, config) {  



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


    var icons = {
        'relatos':  'images/marker-yellow.png',
        'ayuda':    'images/marker-blue.png',
        'espacios': 'images/marker-green.png'
    }


    $scope.markers = {
        'relatos':  [],
        'ayuda':    [],
        'espacios': []
    };

    $scope.infowindow = new google.maps.InfoWindow({});

    var marker;

    $scope.openedInfoWindowId;

    $scope.createMarkers = function(type, data) 
    {
        $scope.deleteMarkers(type);

        for (i in data) {
            var item = data[i];

            if (!item.latlng) {
                continue;
            }

            var latlng = item.latlng.split(",");

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(latlng[0],latlng[1]),
                map: map,
                icon: icons[type],
                title: item.name
            });
            $scope.markers[type].push(marker);

            $scope.createInfoWindow(marker, item, type);
        }
    }

    $scope.createInfoWindow = function(m, item, type) 
    {
        google.maps.event.addListener(m, 'click', function() {
            if ($scope.openedInfoWindowId == (type + item.id)) {
                $scope.infowindow.close();
                $scope.openedInfoWindowId = null;
            }
            else {
                $scope.infowindow.setContent($scope.generateInfowindowContent(item));
                $scope.infowindow.open(map, m);
                $scope.openedInfoWindowId = type + item.id;
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


    $scope.deleteMarkers = function(type) 
    {
        for (i in $scope.markers[type]) {
            $scope.markers[type][i].setMap(null);
        }
        $scope.markers[type] = [];
    }


    $scope.deleteAllMarkers = function() 
    {
        for (i in $scope.markers) {
            $scope.deleteMarkers(i);
        }
    }



    // load relatos
    $scope.relatosData = null;
    
    $scope.loadRelatosData = function()
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_relatos,
            params  : {
                // 'lang': $rootScope.language
            }
        })
        .then(function(response) {
            $scope.relatosData = response.data;
            $scope.createMarkers('relatos', $scope.relatosData);
        });
    }



    // load ayuda
    $scope.ayudaData = null;
    
    $scope.loadAyudaData = function()
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_puntosdeacogida,
            params  : {
                // 'lang': $rootScope.language
            }
        })
        .then(function(response) {
            $scope.ayudaData = response.data;
            $scope.createMarkers('ayuda', $scope.ayudaData);
        });
    }



    // filters
    $scope.selectedFilters = {
        relatos:    true,
        ayuda:      true,
        espacios:   true
    } 




    // load data
    $scope.loadData = function()
    {
        $scope.deleteAllMarkers();
        if ($scope.selectedFilters.relatos) {
            $scope.loadRelatosData();
        }
        if ($scope.selectedFilters.ayuda) {
            $scope.loadAyudaData();
        }
    }
    $scope.loadData();



    $scope.onFilterClick = function(filter)
    {
        $scope.selectedFilters[filter] = !$scope.selectedFilters[filter];
        $scope.loadData();
    }



    // categories
    $scope.selectedCategories = {};




});