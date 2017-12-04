app.controller('ParticpaController', function($scope, $rootScope, $http, config, $translate) {  

    $scope.translations = [];

    $translate(['participa.Selecciona las opciones', 'participa.seleccionados']).then(function (translations) {
        $scope.translations = translations;
    });


    // categories
    $scope.categoriesData = [];
    $scope.selectedCategories = [];

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

            // initialize multiselect
            $(document).ready(function() {
		        $('#categories-multiselect').multiselect({
		            inheritClass: true,
                    buttonText: function(options) {
                        if (options.length === 0) {
                            return $scope.translations['participa.Selecciona las opciones'];
                        }
                        else if (options.length > 3) {
                            return options.length + ' ' + $scope.translations['participa.Selecciona las opciones'];
                        }
                        else {
                            var selected = [];
                            options.each(function() {
                                selected.push([$(this).text(), $(this).data('order')]);
                            });
         
                            selected.sort(function(a, b) {
                                return a[1] - b[1];
                            });
         
                            var text = '';
                            for (var i = 0; i < selected.length; i++) {
                                text += selected[i][0] + ', ';
                            }
         
                            return text.substr(0, text.length -2);
                        }
                    }
		        });
		    });
        });
    }
    $scope.loadCategoriesData();



    $scope.submitForm = function() 
    {
        // console.log($scope.selectedCategories); return;

        $http({
            method  : 'POST',
            url     : config.api.urls.add_puntodeacogida,
            data    : {
                name            : $scope.name,
                categories      : $scope.selectedCategories,
                direccion       : $scope.direccion,
                web             : $scope.web,
                email           : $scope.email,
                telefono        : $scope.telefono,
                usuario_nombre  : $scope.usuario_nombre,
                usuario_email   : $scope.usuario_email
            }
        })
        .then(function(response) {
        });
    }



    // Google Maps
    var map = new google.maps.Map(document.getElementById("participa-map"), config.map); 

    var input = document.getElementById('participa-direccion');
    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
        icon: 'images/marker-blue.png'
    });

    autocomplete.addListener('place_changed', function() 
    {
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });

});