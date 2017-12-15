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

                // create youtube player
                if (!YT) {
                    $window.onYouTubePlayerAPIReady = onYoutubeReady;
                } else if (YT.loaded) {
                    onYoutubeReady();
                } else {
                    YT.ready(onYoutubeReady);
                }

                function onYoutubeReady() {
                    var player = new YT.Player('my-player', {
                        videoId: $scope.espacioData.youtube_id,
                        height: '600',
                        width: '800',
                        playerVars: { 
                            'autoplay': 1,
                            'controls': 1, 
                            'rel' : 0,
                            'showinfo' : 0,
                            'cc_load_policy': 1,
                            'color': 'white',
                            // 'modestbranding': 1,
                            'fs': 0
                        }
                    });
                }

        
                // set metadata
                document.title = 'Ciudad Migrante - ' + $scope.espacioData.name;
                document.querySelector('meta[name=description]').setAttribute('content', $($scope.espacioData.descripcion).text());
 
            }
        });
    };
    $scope.loadEspacioData();



});