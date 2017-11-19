
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
        .when('/relatos/:id', { 
            controller: 'RelatosController', 
            templateUrl: 'js/pages/relatos/index.html' 
        })       
        .when('/espacio/:id', { 
            controller: 'EspacioController', 
            templateUrl: 'js/pages/espacio/index.html' 
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

app.run(function($rootScope, $sce, $http, $location, $timeout) {

    $('body').removeClass('loading');

    $rootScope.homeSlug = 'espacios';
    $rootScope.urlChangeCount = 0;

    $rootScope.$on('$routeChangeStart', function (event, next, prev) 
    {
        // find page slug
        var prevSlug = $rootScope.pageSlug = config.homepageSlug;
        if (next.originalPath && next.originalPath.substring(1)) {
            $rootScope.pageSlug = next.originalPath.substring(1);
            // substring until first slash
            if ($rootScope.pageSlug.indexOf('/') != -1) {
                $rootScope.pageSlug = $rootScope.pageSlug.substr(0, $rootScope.pageSlug.indexOf('/'));
            }
        }

        // set body class as "page-slug"
        $("body")
        .removeClass(function (index, className) {
            return (className.match (/(^|\s)page-\S+/g) || []).join(' ');
        })
        .addClass("page-"+$rootScope.pageSlug);
        
    });

    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.urlChangeCount++;
        // console.log($rootScope.urlChangeCount);
    });

    // fix for displaying html from model field
    $rootScope.trustAsHtml = function(string) {
        return $sce.trustAsHtml(string);
    };


    // relatos
    $("#menu-relatos .toggle").click(function(){
        $(this).parent().toggleClass("expanded");
        $(this).parent().find('.faces a').removeClass('selected');
    });


    $rootScope.relatosData = null;
    
    $rootScope.loadRelatosData = function()
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_relatos,
            params  : {
                // 'lang': $rootScope.language
            }
        })
        .then(function(response) {
            $rootScope.relatosData = response.data;
            $timeout(function () {
                $('#menu-relatos .faces a').click(function(){
                    $('#menu-relatos .faces a').removeClass('selected');
                    $(this).addClass("selected");
                });
            });
        });
    }
    $rootScope.loadRelatosData();



    $rootScope.goBack = function() 
    {
        if ($rootScope.urlChangeCount > 1) {
            window.history.back();
        }
        else {
            window.location.href = config.homepageSlug; 
        }
    }





    // espacios data

    $rootScope.espaciosData = null;
    
    $rootScope.loadEspaciosData = function()
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_espacios,
            params  : {
                // 'lang': $rootScope.language
            }
        })
        .then(function(response) {
            $rootScope.espaciosData = response.data;
        });
    };
    $rootScope.loadEspaciosData();



});



    


$.extend($.easing,
{
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    }
});




