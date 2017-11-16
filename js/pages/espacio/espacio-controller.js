app.controller('EspacioController', function($scope, $rootScope, $http, config, $timeout, $anchorScroll) {  
    

	// console.log('EspacioController');
	
/*
	$timeout(function(){

		var anchor = $(location.hash);
		var firstChild = anchor.parent().find('*:first-child');
		var scrollTo = anchor.position().left - firstChild.position().left - $( window ).width() / 2 + anchor.width() / 2;
		console.log(scrollTo);


		$('#espacio-images').stop().animate({
	        scrollLeft: scrollTo
	    }, 1000, 'easeOutQuart');

    });

*/
/*
    $scope.$watch(function () {
	    return location.hash
	}, function (value) {
        event.preventDefault();
	    console.log(location.hash);

	    var $anchor = $('#' + location.hash.substring(1));
	    console.log($anchor.offset().left);

	    $scope.scrollTo(location.hash.substring(1));

        // $('#espacio-images').animate({
        //     // scrollLeft: $anchor.offset().left
        //     scrollLeft: 600
        // }, 1000);
	});*/


	$scope.scrollTo = function(id)
	{
		var anchor = $('#' + id);
		var firstChild = anchor.parent().find('*:first-child');
		var scrollTo = anchor.position().left - firstChild.position().left - $( window ).width() / 2 + anchor.width() / 2;

		$('#espacio-images').stop().animate({
            scrollLeft: scrollTo
        }, 1000, 'easeOutQuart');
	}


});