app.controller('EspacioMakingOfController', function($scope, $rootScope, $http, $routeParams, config) {  


    $("body").addClass("page-espacio-makingof");

    $scope.id = $routeParams.id;

    $scope.espacioData = [];
    
    $scope.loadEspacioData = function()
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_espacio.replace(':id', $scope.id),
            params  : {
                'lang': $rootScope.lang
            }
        })
        .then(function(response) {
            $scope.espacioData = response.data;

            if ($scope.espacioData.youtube_id) {

                $rootScope.loadYoutubeVideo($scope.espacioData.youtube_id, 'my-player', config);
        
                // set metadata
                document.title = 'Ciudad Migrante - ' + $scope.espacioData.name;
                document.querySelector('meta[name=description]').setAttribute('content', $($scope.espacioData.descripcion).text());
 
            }
        });
    };
    $scope.loadEspacioData();



});