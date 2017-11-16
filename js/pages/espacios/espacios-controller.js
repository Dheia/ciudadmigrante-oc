app.controller('EspaciosController', function($scope, $rootScope, $http, config) {  
 
	if (!$rootScope.espaciosData) {
		$rootScope.loadEspaciosData();
	}

});