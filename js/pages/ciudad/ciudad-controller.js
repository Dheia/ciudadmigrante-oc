app.controller('CiudadController', function($scope, $rootScope, $http, config, $timeout, $routeParams, $route, $location) {  

	$("section#ciudad-map aside .handle").click(function(){
		$(this).parent().toggleClass('expanded');
	});

    // on mobile close sidebar
    if ($(document).width() < 768) {
        $("section#ciudad-map aside").removeClass('expanded');
    }


    // Google Maps
    var map = new google.maps.Map(document.getElementById("map"), config.map); 


    if ($(document).width() > 1600) {
        var icons = {
            'relatos':  'images/marker-yellow.png',
            'ayuda':    'images/marker-blue.png',
            'espacios': 'images/marker-green.png'
        }
    }
    else {
        var icons = {
            'relatos':  'images/1200/marker-yellow.png',
            'ayuda':    'images/1200/marker-blue.png',
            'espacios': 'images/1200/marker-green.png'
        }
    }


    $scope.markers = {
        'ayuda':    {},
        'relatos':  {},
        'espacios': {}
    };

    $scope.infowindow = new google.maps.InfoWindow({
        maxWidth: 133
    });



    var marker;

    $scope.openedInfoWindowId;

    $scope.createMarkers = function(type, data) 
    {
        $scope.deleteMarkers(type);

        var j;
        for (i in data) {

            var item = data[i]; 

            if (!item.latlng) {
                continue;
            }

            setTimeout($scope.createMarker.bind(null, data, i, type), i*5);
            j = i;
        }
        // setTimeout($scope.openInfoWindowByUrl.bind(null, type), j*5+5);
    }

    $scope.createMarker = function(data, i, type)
    {
        var item = data[i]; 

        if (!item.latlng) {
            return;
        }

        var latlng = item.latlng.split(",");

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(latlng[0],latlng[1]),
            map: map,
            icon: icons[type],
            title: item.name,
            animation: google.maps.Animation.DROP
        });
        $scope.markers[type][item.id] = marker;

        $scope.createInfoWindow(marker, item, type);
    } 

    $scope.createInfoWindow = function(marker, item, type) 
    {
        google.maps.event.addListener(marker, 'click', function() {
            if ($scope.openedInfoWindowId == (type + item.id)) {
                $scope.infowindow.close();
                $scope.openedInfoWindowId = null;
            }
            else {
                $scope.infowindow.setContent($scope.generateInfowindowContent(item, type));
                $scope.infowindow.open(map, marker);
                $scope.openedInfoWindowId = type + item.id;
            }
        });
        if (!isTouchDevice()) {
            google.maps.event.addListener(marker, 'mouseover', function() {
                // google.maps.event.trigger(marker, 'click');
                if ($scope.openedInfoWindowId == (type + item.id)) {
                }
                else {
                    $scope.infowindow.setContent($scope.generateInfowindowContent(item, type));
                    $scope.infowindow.open(map, marker);
                    $scope.openedInfoWindowId = type + item.id;
                }
            });
        }
    }


    $scope.generateInfowindowContent = function(itemData, type)
    {

        function getContentAyuda(itemData)
        {
            var html = '<div class="ayuda-content"><h2>' + itemData.name + '</h2><p>' + itemData.direccion + ' ' + itemData.codigo_postal + ' - ' + itemData.ciudad + '</p>';
            if (itemData.telefono) {
                html += '<p class="lead">T. <a href="tel:' + itemData.telefono + '">' + itemData.telefono + '</a></p>';
            }
            if (itemData.email && !$rootScope.isKiosk) {
                html += '<p class="lead"><a href="mailto:' + itemData.email + '">' + itemData.email + '</a></p>';
            }      
            if (itemData.web && !$rootScope.isKiosk) {
                html += '<p class="web"><a href="' + itemData.web + '" target="_blank" title="' + itemData.web + '"></a></p>';
            }  
            html += '</div>';
            return html;
        }


        function getContentEspacios(itemData)
        {
            return '<a href="espacio/' + itemData.id + '" class="espacio" title="' + itemData.name + '" style="background-image:url(' + itemData.image_map_url + ')"><h2>' + itemData.name + '</h2></a>';
        }


        function getContentRelatos(itemData)
        {
            return '<a href="relato/' + itemData.id + '" class="relato" title="' + itemData.name + '" style="background-image:url(' + itemData.image_map_url + ')"><h2>' + itemData.name + '</h2></a>';
        }


        switch (type) {
            case 'ayuda' :      return getContentAyuda(itemData);
            case 'espacios' :   return getContentEspacios(itemData);
            case 'relatos' :    return getContentRelatos(itemData);
        }
      
    }







    $scope.deleteMarkers = function(type) 
    {
        for (i in $scope.markers[type]) {
            $scope.markers[type][i].setMap(null);
        }
        $scope.markers[type] = {};
    }


    $scope.deleteAllMarkers = function() 
    {
        for (i in $scope.markers) {
            $scope.deleteMarkers(i);
        }
    }


    // load relatos
    $scope.relatosData = null;
    
    $scope.loadRelatosData = function(onLoad)
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_relatos,
            params  : {
                categories: selectedCategoriesToString(),
                'lang': $rootScope.lang
            }
        })
        .then(function(response) {
            $scope.relatosData = response.data;
            onLoad();
        });
    }



    // load ayuda
    $scope.ayudaData = null;
    
    $scope.loadAyudaData = function(onLoad)
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_puntosdeacogida,
            params  : {
                categories: selectedCategoriesToString(),
                'lang': $rootScope.lang
            }
        })
        .then(function(response) {
            $scope.ayudaData = response.data;
            onLoad();
        });
    }



    // load espacios
    $scope.espaciosData = null;
    
    $scope.loadEspaciosData = function(onLoad)
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_espacios,
            params  : {
                // categories: selectedCategoriesToString(),
                'lang': $rootScope.lang
            }
        })
        .then(function(response) {
            $scope.espaciosData = response.data;
            onLoad();
        });
    }


    function selectedCategoriesToString()
    {
        var categories = [];
        for (i in $scope.selectedCategories) {
            if ($scope.selectedCategories[i]) {
                categories.push(i);
            }
        }
        return categories.join(',');
    }



    // filters
    $scope.selectedFilters = {};
    if ($routeParams.filter) {
        // $scope.selectedFilters[$routeParams.filter] = true;
    }
    else {
        $scope.selectedFilters['relatos'] = true;
    }


    // categories
    $scope.categoriesData = [];
    $scope.selectedCategories = {}; 

    $scope.loadCategoriesData = function()
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_categories,
            params  : {
                'lang': $rootScope.lang
            }
        })
        .then(function(response) {
            $scope.categoriesData = response.data;
            $scope.loadData();
        });
    }
    $scope.loadCategoriesData();



    // load data
    $scope.loadData = function()
    {
        $scope.deleteAllMarkers();

        if ($scope.selectedFilters.relatos) {
            $scope.loadRelatosData(function(){
                $scope.createMarkers('relatos', $scope.relatosData);
            });
        }
        if ($scope.selectedFilters.ayuda) {
            $scope.loadAyudaData(function(){
                $scope.createMarkers('ayuda', $scope.ayudaData);
            });
        }
        if ($scope.selectedFilters.espacios) {
            $scope.loadEspaciosData(function(){
                $scope.createMarkers('espacios', $scope.espaciosData);
            });
        }
    }
    



    $scope.onFilterClick = function(filter)
    {
        $scope.selectedFilters = {};
        $scope.selectedFilters[filter] = true;
        $scope.selectedCategories = {};
        $scope.loadData();

        $rootScope.closeRelatos();
    }

    $scope.onCategoryClick = function(id)
    {
        if ($scope.selectedCategories[id]) {
            $scope.selectedCategories[id] = false;
        }
        else {
            $scope.selectedCategories = {};
            $scope.selectedCategories[id] = true;
        }
        $scope.loadData();

        $rootScope.closeRelatos();
    }






    // create marker by id

    $scope.createMarkerByUrl = function()
    {
        if (!$routeParams.filter || !$routeParams.id) {
            return;
        }

        switch ($routeParams.filter) {
            case 'relatos' :
                var data = $scope.relatosData;
                break;
            case 'espacios' :
                var data = $scope.espaciosData;
                break;
            case 'ayuda' :
                var data = $scope.ayudaData;
                break;
        }

        // find item by id
        for (i in data) {
            if (data[i].id == $routeParams.id) {
                var item = data[i];
                break;
            }
        }

        // create marker
        $scope.createMarkers($routeParams.filter, [data[i]]);
        
        // open infowindow
        setTimeout($scope.openInfoWindowByUrl, 100);
    }

    if ($routeParams.filter && $routeParams.id) {
        switch ($routeParams.filter) {
            case 'relatos' :
                $scope.loadRelatosData($scope.createMarkerByUrl);
                break;
            case 'espacios' :
                $scope.loadEspaciosData($scope.createMarkerByUrl);
                break;
            case 'ayuda' :
                $scope.loadAyudaData($scope.createMarkerByUrl);
                break;
        }
    }


    // open info window by id    
    $scope.openInfoWindowByUrl = function()
    {
        if ($routeParams.filter && $routeParams.id)
        {
            var marker = $scope.markers[$routeParams.filter][$routeParams.id];
            map.panTo(marker.getPosition());
            google.maps.event.trigger(marker, 'click');
            map.setZoom(14);
        }
    }

});