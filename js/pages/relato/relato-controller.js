app.controller('RelatoController', function($scope, $rootScope, $http, $routeParams, config) {  

    $("section#relato-video aside .handle").click(function(){
        $(this).parent().toggleClass('expanded');
    });


    $rootScope.$watch('relatosData', function() {
        if ($rootScope.relatosData) {
            $scope.relatoData = $rootScope.relatosData[$routeParams.id];

            if ($scope.relatoData.youtube_id) {

                $rootScope.loadYoutubeVideo($scope.relatoData.youtube_id, 'my-player', config);

                // set metadata
                document.title = 'Ciudad Migrante - ' + $scope.relatoData.name;
                document.querySelector('meta[name=description]').setAttribute('content', $($scope.relatoData.descripcion).text());
                
            }


        }
    });
    

});