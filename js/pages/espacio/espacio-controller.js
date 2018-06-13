app.controller('EspacioController', function($scope, $rootScope, $routeParams, $http, config, $timeout, $interval, $anchorScroll) {  
    
	$scope.id = $routeParams.id;

    $scope.espacioData = [];

    // var scrollElement = $('section#espacio-images');
    // var scrollInterval;

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

            // set metadata
            document.title = 'Ciudad Migrante - ' + $scope.espacioData.name;
            document.querySelector('meta[name=description]').setAttribute('content', $($scope.espacioData.descripcion).text());

/*            scrollInterval = $interval(function(){
                scrollElementToMiddle();
                // $('section#espacio-images').mouseenter();
            }, 200);*/
        });
    };
    $scope.loadEspacioData();


    if (!isTouchDevice()) {

        // hover scroll

        var scrollElement = $('section#espacio-images');
        var scrollSpeed = 400; // px/s

        $('section#espacio-scroll-controls .scroll-left').mouseenter(function(event){
            scrollElement.stop().animate({scrollLeft: 0}, scrollElement.scrollLeft() / scrollSpeed * 1000, 'swing');
        });

        $('section#espacio-scroll-controls .scroll-right').mouseenter(function(event){
            scrollElement.stop().animate({scrollLeft: scrollElement[0].scrollWidth}, (scrollElement[0].scrollWidth - scrollElement.scrollLeft()) / scrollSpeed * 1000, 'swing');
        });

        var oldX;
        scrollElement.mouseenter(function(event){
            oldX = event.pageX;
        });
        scrollElement.mousemove(function(event){
            scrollElement.scrollLeft(scrollElement.scrollLeft() + event.pageX - oldX);
            oldX = event.pageX;
        });

        
/*
        var scrollElement = $('section#espacio-images');
        var scrollMargin = 50;
        var scrollFactor;

        scrollElement.mouseenter(function(event){

            // $interval.cancel(scrollInterval);

            // console.log('mouseenter');

            scrollFactor = (scrollElement[0].scrollWidth + 2 * scrollMargin) / window.innerWidth - 1;

            scrollElement.stop().animate({scrollLeft: (event.pageX - scrollMargin) * scrollFactor}, 200, null, bindMouseMove);
            // bindMouseMove();
        });
        scrollElement.mouseleave(function(){
            scrollElement.mousemove(null);
        });

        function bindMouseMove()
        {
            scrollElement.mousemove(function(event){
                $(this).scrollLeft((event.pageX - scrollMargin) * scrollFactor);
            });
        }

        function scrollElementToMiddle()
        {
            // scroll to 50%
            console.log('scrollElementToMiddle');
            var scrollFactor = (scrollElement[0].scrollWidth + 2 * scrollMargin) / window.innerWidth - 1;
            // scrollElement.scrollLeft((window.innerWidth/2 - scrollMargin) * scrollFactor);
            scrollElement.stop().animate({scrollLeft: (window.innerWidth/2 - scrollMargin) * scrollFactor}, 200);
        }*/

    }

});