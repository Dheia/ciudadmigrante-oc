
var app = angular.module("myApp", [
    "ngRoute",
    "ngSanitize",
    "ngAnimate"
]);

// load configuration from files
app.constant('config', window.config);


// ROUTING ===============================================
app.config(function ($routeProvider, $locationProvider) { 
    
    $routeProvider 

        .when('/espacios', { 
            controller: 'EspaciosController', 
            templateUrl: 'js/pages/espacios/index.html' 
        })     
        .when('/participa', { 
            controller: 'ParticpaController', 
            templateUrl: 'js/pages/participa/index.html' 
        })     
        .when('/ciudad', { 
            controller: 'CiudadController', 
            templateUrl: 'js/pages/ciudad/index.html' 
        })      
        .when('/relatos', { 
            controller: 'RelatosController', 
            templateUrl: 'js/pages/relatos/index.html' 
        })     
        .otherwise({ 
            redirectTo: '/espacios' 
        }); 

    // remove hashbang
    $locationProvider.html5Mode(true);
});

// CORS fix
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.run(function($rootScope, $sce, $http, $location) {

    $('body').removeClass('loading');

    $rootScope.$on('$routeChangeStart', function (event, next, prev) 
    {
        // get page slug
        var prevSlug = $rootScope.pageSlug = 'home';
        if (next.originalPath && next.originalPath.substring(1)) {
            $rootScope.pageSlug = next.originalPath.substring(1);
        }

        // set body class as "page-slug"
        $("body")
        .removeClass(function (index, className) {
            return (className.match (/(^|\s)page-\S+/g) || []).join(' ');
        })
        .addClass("page-"+$rootScope.pageSlug);
        
    });

    $rootScope.$on('$routeChangeSuccess', function() {

    });

    // fix for displaying html from model field
    $rootScope.trustAsHtml = function(string) {
        return $sce.trustAsHtml(string);
    };


    // expand stories
    $("#menu-relatos .toggle").click(function(){
        $(this).parent().toggleClass("expanded");
    });



    $rootScope.goBack = function() 
    {
        console.log(document.referrer);
        // window.history.back();
        if (document.referrer.indexOf('markiewicz.click') >= 0) {
            history.go(-1);
        }
        else {
            window.location.href = 'espacios'; 
        }
    }

});



    



