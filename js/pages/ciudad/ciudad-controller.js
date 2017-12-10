app.controller('CiudadController', function($scope, $rootScope, $http, config, $timeout) {  

 
	$("section#ciudad-map aside .handle").click(function(){
		$(this).parent().toggleClass('expanded');
	});


    // Google Maps
    var map = new google.maps.Map(document.getElementById("map"), config.map); 


    var icons = {
        'relatos':  'images/marker-yellow.png',
        'ayuda':    'images/marker-blue.png',
        'espacios': 'images/marker-green.png'
    }


    $scope.markers = {
        'ayuda':    [],
        'relatos':  [],
        'espacios': []
    };

    $scope.infowindow = new google.maps.InfoWindow({
        maxWidth: 286
    });

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

            setTimeout($scope.createMarker.bind(null, data, i, type), i*100);
        }
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
        $scope.markers[type].push(marker);

        $scope.createInfoWindow(marker, item, type);
    } 

    $scope.createInfoWindow = function(m, item, type) 
    {
        google.maps.event.addListener(m, 'click', function() {
            if ($scope.openedInfoWindowId == (type + item.id)) {
                $scope.infowindow.close();
                $scope.openedInfoWindowId = null;
            }
            else {
                $scope.infowindow.setContent($scope.generateInfowindowContent(item, type));
                $scope.infowindow.open(map, m);
                $scope.openedInfoWindowId = type + item.id;
            }
        });
    }


    $scope.generateInfowindowContent = function(itemData, type)
    {

        function getContentAyuda(itemData)
        {
            var html = '<div class="ayuda-content"><h2>' + itemData.name + '</h2><p>' + itemData.direccion + ' ' + itemData.codigo_postal + ' - ' + itemData.ciudad + '</p>';
            if (itemData.telefono) {
                html += '<p class="lead">T. <a href="tel:' + itemData.telefono + '">' + itemData.telefono + '</a></p>';
            }
            if (itemData.email) {
                html += '<p class="lead"><a href="mailto:' + itemData.email + '">' + itemData.email + '</a></p>';
            }      
            if (itemData.web) {
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
            return '<a href="relato/' + itemData.id + '" class="relato" title="' + itemData.name + '" style="background-image:url(' + itemData.image_map_url + ')"></a>';
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
                categories: selectedCategoriesToString(),
                'lang': $rootScope.lang
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
                categories: selectedCategoriesToString(),
                'lang': $rootScope.lang
            }
        })
        .then(function(response) {
            $scope.ayudaData = response.data;
            $scope.createMarkers('ayuda', $scope.ayudaData);
        });
    }



    // load espacios
    $scope.espaciosData = null;
    
    $scope.loadEspaciosData = function()
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_espacios,
            params  : {
                categories: selectedCategoriesToString(),
                'lang': $rootScope.lang
            }
        })
        .then(function(response) {
            $scope.espaciosData = response.data;
            $scope.createMarkers('espacios', $scope.espaciosData);
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
    $scope.selectedFilters = {'relatos' : true}; 


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
            $scope.selectedCategories[$scope.categoriesData[0].id] = true;
            $scope.loadData();
        });
    }
    $scope.loadCategoriesData();



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
        if ($scope.selectedFilters.espacios) {
            $scope.loadEspaciosData();
        }
    }
    



    $scope.onFilterClick = function(filter)
    {
        // $scope.selectedFilters[filter] = !$scope.selectedFilters[filter];
        $scope.selectedFilters = {};
        $scope.selectedFilters[filter] = true;
        $scope.loadData();
    }

    $scope.onCategoryClick = function(id)
    {
        // $scope.selectedCategories[id] = !$scope.selectedCategories[id];
        $scope.selectedCategories = {};
        $scope.selectedCategories[id] = true;
        $scope.loadData();
    }




});