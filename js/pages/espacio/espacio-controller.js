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


    // hover scroll

    var scrollElement = $('section#espacio-images');
    var scrollSpeed = 400; // px/s

    $('section#espacio-scroll-controls .scroll-left').mouseenter(function(event){
        scrollElement.stop().animate({scrollLeft: 0}, scrollElement.scrollLeft() / scrollSpeed * 1000, 'swing');
    });

    $('section#espacio-scroll-controls .scroll-left').mouseleave(function(event){
        scrollElement.stop().animate({scrollLeft: scrollElement.scrollLeft() - 100}, 300 / scrollSpeed * 1000, 'easeOutCubic');
    });

    $('section#espacio-scroll-controls .scroll-right').mouseenter(function(event){
        scrollElement.stop().animate({scrollLeft: scrollElement[0].scrollWidth}, (scrollElement[0].scrollWidth - scrollElement.scrollLeft()) / scrollSpeed * 1000, 'swing');
    });

    $('section#espacio-scroll-controls .scroll-right').mouseleave(function(event){
        scrollElement.stop().animate({scrollLeft: scrollElement.scrollLeft() + 100}, 300 / scrollSpeed * 1000, 'easeOutCubic');
    });


});