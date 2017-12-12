
var app = angular.module("myApp", [
    "ngRoute",
    "ngSanitize",
    "ngAnimate",
    'pascalprecht.translate'
]);

// load configuration from files
app.constant('config', window.config);




// TRANSLATIONS ===============================================

app.config(['$translateProvider', function ($translateProvider) {

    // try to find out preferred language by yourself
    // $translateProvider.determinePreferredLanguage();

    // choose language form local storage or default
    var lang = localStorage.lang;
    if (!lang) {
        lang = localStorage.lang = config.lang;
    }
    $translateProvider.preferredLanguage(lang);

    // load default language Synchronously
    $.get({
        url: config.api.getTranslations,
        data: ['lang', lang],
        async: false,
        contentType: "application/json",
        dataType: 'json',
        success: function (json) {
            $translateProvider.translations(lang, json);
        }
    });
    
    $translateProvider.useUrlLoader(config.api.urls.getTranslations);
    $translateProvider.useSanitizeValueStrategy(null);
    // tell angular-translate to use your custom handler
    $translateProvider.useMissingTranslationHandler('missingTranslationHandlerFactory');
}]);

// define missing Translation Handler
app.factory('missingTranslationHandlerFactory', function () {
    var called = [];
    return function (translationID) {
        // use last element from code as default translation
        var translation = translationID.substr(translationID.lastIndexOf(".") + 1);

        var element = $("[translate='" + translationID + "']");
        if (element && element.html()) {
            translation = element.html();
        }
        
        if (!called[translationID]) {
            // call API
            $.post({
                url     : config.api.urls.missingTranslation,
                data    : {
                    code : translationID,
                    type : element.attr('translate-type'),
                    translation : translation
                }
            });
        }
        
        called[translationID] = true;

        return translation;
    };
});



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
        .when('/relato/:id', { 
            controller: 'RelatoController', 
            templateUrl: 'js/pages/relato/index.html' 
        })       
        .when('/espacio/:id', { 
            controller: 'EspacioController', 
            templateUrl: 'js/pages/espacio/index.html' 
        })     
        .when('/creditos', { 
            controller: 'CreditosController', 
            templateUrl: 'js/pages/creditos/index.html' 
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

app.run(function($rootScope, $sce, $http, $location, $timeout, $window, $translate, $route) {

    $rootScope.homeSlug = 'espacios';
    $rootScope.urlChangeCount = 0;

    $('body').removeClass('loading');

    $rootScope.$on('$routeChangeStart', function (event, next, prev) 
    {
        // set body class as "prev-page-slug"
        $("body")
        .removeClass(function (index, className) {
            return (className.match (/(^|\s)prev-page-\S+/g) || []).join(' ');
        })
        .addClass("prev-page-"+$rootScope.pageSlug);

        // find page slug
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

        $rootScope.setMetadata(); 
    });

    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.urlChangeCount++;
        // console.log($rootScope.urlChangeCount);
    });

    // fix for displaying html from model field
    $rootScope.trustAsHtml = function(string) {
        return $sce.trustAsHtml(string);
    };


    // set language
    $rootScope.setLanguage = function(lang)
    {
        // save language in local storage
        $rootScope.lang = localStorage.lang = lang;
        // change translations language
        $translate.use(lang);
        // set HTML lang
        $('html').attr('lang', lang);
        // highlight option in menu
        $('.languages a').removeClass('selected');
        $('.languages a[data-language=' + lang + ']').addClass('selected');
    }
    $rootScope.setLanguage(localStorage.lang);



    // language menu
    $('.languages a').click(function(){
        $rootScope.setLanguage($(this).data('language'));
        $route.reload();
        $rootScope.loadRelatosData();
        $rootScope.setMetadata();
    });


    // relatos
    $("#menu-relatos .toggle").click(function(){
        $(this).parent().toggleClass("expanded").find('.faces a').removeClass('selected');
        if (!isTouchDevice()) {
            scrollFacesToMiddle();
        }
    });
    $rootScope.closeRelatos = function()
    {
        $("#menu-relatos").removeClass("expanded").find('.faces a').removeClass('selected');
    }


    $rootScope.relatosData = null;
    
    $rootScope.loadRelatosData = function()
    {
        $http({
            method  : 'GET',
            url     : config.api.urls.get_relatos,
            params  : {
                'lang': $rootScope.lang
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


    // hover scroll
    if (!isTouchDevice()) {

        var scrollElement = $('#menu-relatos .simplebar-content');
        var scrollMargin = 50;
        var scrollFactor;

        $('#menu-relatos .faces').mouseenter(function(event){

            scrollFactor = (scrollElement[0].scrollWidth + 2 * scrollMargin) / window.innerWidth - 1;

            scrollElement.stop().animate({scrollLeft: (event.pageX - scrollMargin) * scrollFactor}, 200, null, bindMouseMove);
        });
        $('#menu-relatos .faces').mouseleave(function(){
            scrollElement.mousemove(null);
        });

        function bindMouseMove()
        {
            scrollElement.mousemove(function(event){
                $(this).scrollLeft((event.pageX - scrollMargin) * scrollFactor);
            });
        }

        function scrollFacesToMiddle()
        {
            // scroll to 50%
            scrollElement.scrollLeft((window.innerWidth/2 - scrollMargin) * scrollFactor);
        }

    }




    $rootScope.goBack = function() 
    {
        if ($rootScope.urlChangeCount > 1) {
            window.history.back();
        }
        else {
            window.location.href = config.homepageSlug; 
        }
    }






    // set meta data
    $rootScope.setMetadata = function()
    {
        $rootScope.metaUrl = $location.absUrl().split('?')[0];

/*        var pageSlug = $rootScope.pageSlug;
        if (pageSlug == 'home') {
            pageSlug = '';
        }
        var page = $rootScope.pagesData[pageSlug];

        if (page) {
            document.title = page.meta_title;
            document.querySelector('meta[name=description]').setAttribute('content', page.meta_description);
        }*/
    }



    // intro

    $rootScope.closeIntro = function() 
    {
        $('#intro').addClass('closed');
        $timeout(function(){
            $('#intro').remove();
        }, 1000);
    }
    if ($window.sessionStorage.intro !== 'hide') { // show intro
        $('#intro').addClass('show');
        // create youtube player
        if (!YT) {
            $window.onYouTubePlayerAPIReady = onYoutubeReady;
        } else if (YT.loaded) {
            onYoutubeReady();
        } else {
            YT.ready(onYoutubeReady);
        }

        function onYoutubeReady() {

            $translate('intro.URL de video en YouTube').then(function (videoURL) {
                console.log(videoURL);
                var player = new YT.Player('intro-player', {
                    videoId: youtube_parser(videoURL),
                    height: '600',
                    width: '800',
                    playerVars: { 
                        'autoplay': 1,
                        'controls': 0, 
                        'rel' : 0,
                        'showinfo' : 0,
                        'cc_load_policy': 0,
                        'color': 'white',
                        // 'modestbranding': 1,
                        'fs': 0
                    },
                    events: {
                        'onStateChange': onStateChange
                    }
                });
            });
            
        }

        function onStateChange(state) {
            if (state.data === YT.PlayerState.ENDED) {
                $rootScope.closeIntro(); 
            }
        }
    }
    $window.sessionStorage.intro = 'hide';



    // share

    $('#menu-1 .share').click(function(){
        $(this).toggleClass('expanded');
    });


    // facebook
    // 2457360881156031



    $rootScope.shareFacebook = function()
    {
        FB.ui(
        {
            method: 'feed',
            name: 'This is the content of the "name" field.',
            link: $rootScope.metaUrl,
            picture: 'http://www.hyperarts.com/external-xfbml/share-image.gif',
            caption: 'cap',
            description: 'This is the content of the "description" field, below the caption.',
            message: ''
        });
    };

});




$.extend($.easing,
{
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t=t/d-1)*t*t + 1) + b;
    }
});



function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}


function isTouchDevice()
{
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

