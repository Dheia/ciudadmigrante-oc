app.controller('EspaciosController', function($scope, $rootScope, $http, config) {  
 
    $scope.espaciosData = [];
    
    $scope.loadEspaciosData = function()
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_espacios,
            params  : {
                // 'lang': $rootScope.lang
            }
        })
        .then(function(response) {
            $scope.espaciosData = response.data;
        });
    };
    $scope.loadEspaciosData();

});