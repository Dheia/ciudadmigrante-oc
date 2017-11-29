app.controller('EspacioController', function($scope, $rootScope, $routeParams, $http, config, $timeout, $anchorScroll) {  
    
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
        });
    };
    $scope.loadEspacioData();



	$scope.scrollTo = function(id)
	{
		var anchor = $('#' + id);
		var firstChild = anchor.parent().find('*:first-child');
		var scrollTo = anchor.position().left - firstChild.position().left - $( window ).width() / 2 + anchor.width() / 2;

		if (scrollTo < 0) {
			scrollTo = 0;
		}

		var maxScroll = $('#espacio-images').prop("scrollWidth") - $( window ).width();

		if (scrollTo > maxScroll) {
			scrollTo = maxScroll;
		}

		$('#espacio-images').stop().animate({
            scrollLeft: scrollTo
        }, 1000, 'easeOutQuart');
	}


});