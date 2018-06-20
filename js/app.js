// 
var app = angular.module("myApp", [
    "ngRoute",
    "ngSanitize",
    "ngAnimate",
    'pascalprecht.translate'
]);

// load configuration from files
app.constant('config', window.config);



// translations

app.config(function ($translateProvider, config) {

    // choose language form local storage or default
    if (!window.localStorage.lang) {
        window.localStorage.lang = config.lang;
    }
    $translateProvider.preferredLanguage(window.localStorage.lang);

    $translateProvider.useUrlLoader(config.api.urls.translations);
    $translateProvider.useSanitizeValueStrategy(null);
    // tell angular-translate to use your custom handler
    $translateProvider.useMissingTranslationHandler('missingTranslationHandlerFactory');


});

// define missing Translation Handler
app.factory('missingTranslationHandlerFactory', function () {

    var missingTranslations = {
        codes : [],
        translations : [],
        types : [],
        parameters : []
    };

    return function (translationId) {

        // prevent multiple calls
        var index = missingTranslations.codes.indexOf(translationId);
        if (index != -1) {
            return missingTranslations.translations[index];
        }

        // call API: send all missing translations at once
        if (!missingTranslations.codes.length) {
            setTimeout(function(){ 
                $.post({
                    url     : config.api.urls.translations,
                    data    : {
                        codes : missingTranslations.codes,
                        types : missingTranslations.types,
                        translations : missingTranslations.translations,
                        parameters : missingTranslations.parameters
                    }
                });
            }, 1000);
        }

        // use last element from translationId as default translation
        var translation = translationId.substr(translationId.lastIndexOf(".") + 1);
        var type;
        var parameters = {};

        // find html element
        var element = $("[translate='" + translationId + "'], [translate-cloak='" + translationId + "'], [translate-attr-src='" + translationId + "']");
        if (element) {
            if (element.html()) {
                translation = element.html();
            }
            type = element.attr('translate-type');
            switch (type) {
                case 'image-mediafinder':
                    parameters.width = element.attr('translate-width');
                    parameters.height = element.attr('translate-height');
                    parameters.mode = element.attr('translate-mode');
                    translation = element.attr('src');
                    break;
            }
        }

        // add missing translation to the table         
        missingTranslations.codes.push(translationId);
        missingTranslations.translations.push(translation);
        missingTranslations.types.push(type);
        missingTranslations.parameters.push(parameters);
        
        return translation;
    };

});



// ROUTING ===============================================
app.config(function ($routeProvider, $locationProvider) { 
    
    $routeProvider 

        .when('/espacios', { 
            redirectTo: '/' 
        })     
        .when('/participa', { 
            controller: 'ParticpaController', 
            templateUrl: 'js/pages/participa/index.html' 
        })     
        .when('/ciudad/:filter?/:id?', { 
            controller: 'CiudadController', 
            templateUrl: 'js/pages/ciudad/index.html',
            reloadOnSearch: false
        })       
        .when('/relato/:id', { 
            controller: 'RelatoController', 
            templateUrl: 'js/pages/relato/index.html' 
        })       
        .when('/espacio/:id', { 
            controller: 'EspacioController', 
            templateUrl: 'js/pages/espacio/index.html' 
        })     
        .when('/espacio/:id/makingof', { 
            controller: 'EspacioMakingOfController', 
            templateUrl: 'js/pages/espacio/makingof.html' 
        })     
        .when('/creditos', { 
            controller: 'CreditosController', 
            templateUrl: 'js/pages/creditos/index.html' 
        })   
        .otherwise({ 
            // redirectTo: '/espacios' 
            controller: 'EspaciosController', 
            templateUrl: 'js/pages/espacios/index.html' 
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

app.run(function($rootScope, $sce, $http, $location, $timeout, $window, $translate, $route, $animate) {

    $rootScope.homeSlug = config.homeSlug;
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
        if (next.originalPath == undefined) {
            next.originalPath = '/' + $rootScope.homeSlug;
        }
        if (next.originalPath && next.originalPath.substring(1)) {
            $rootScope.pageSlug = next.originalPath.substring(1);
            // substring until first slash
            if ($rootScope.pageSlug.indexOf('/') != -1) {
                $rootScope.pageSlug = $rootScope.pageSlug.substr(0, $rootScope.pageSlug.indexOf('/'));
            }
        }
        if ($rootScope.pageSlug == undefined) {
            $rootScope.pageSlug = $rootScope.homeSlug;
        }



        // set body class as "page-slug"
        $("body")
        .removeClass(function (index, className) {
            return (className.match (/(^|\s)page-\S+/g) || []).join(' ');
        })
        .addClass("page-"+$rootScope.pageSlug);

        $rootScope.setMetadata(); 

        // background audio
        if (!$rootScope.isKiosk) {
            if ($rootScope.pageSlug == 'relato') {
                $rootScope.pauseBackgroundAudio();
            }
            else {
                $rootScope.playBackgroundAudio();
            }
        }
        

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
        $rootScope.lang = window.localStorage.lang = lang;
        console.log($rootScope.lang);
        // change translations language
        $translate.use(lang);
        // set HTML lang
        $('html').attr('lang', lang);
        // highlight option in menu
        $('.languages a').removeClass('selected');
        $('.languages a[data-language=' + lang + ']').addClass('selected');
    }
    $rootScope.setLanguage(window.localStorage.lang);


    // language menu
    $('.languages a').click(function(){
        $rootScope.setLanguage($(this).data('language'));
        // $route.reload();
        $animate.enabled(false);
        $route.reload();
        $timeout(function () {
            $animate.enabled(true);
        });
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
            window.location.href = config.homeSlug; 
        }
    }






    // set meta data
    $rootScope.setMetadata = function()
    {
        $rootScope.metaUrl = $location.absUrl().split('?')[0];

        var pageSlug = $rootScope.pageSlug;

        if (pageSlug != 'relato' && pageSlug != 'espacio') {
            $translate('compartir.descripcion').then(function (descripcion) {
                document.querySelector('meta[name=description]').setAttribute('content', descripcion);
            });
       }
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
                // console.log(videoURL);
                var videoId = youtube_parser(videoURL);
                var player = new YT.Player('intro-player', {
                    videoId: videoId,
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
                        'fs': 0,
                        'mute': 1,
                        playlist: videoId,
                        loop: 1
                    }
/*                    events: {
                        'onStateChange': onStateChange
                    }*/
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


    // load settings
    $http({
        method  : 'GET',
        url     : config.api.urls.get_settings
    })
    .then(function(response) {
        $rootScope.settings = response.data;
    });


    // background audio
    $rootScope.pauseBackgroundAudio = function()
    {
        $("#background-audio").animate({volume: 0}, 1000);
        $timeout(function(){
            document.getElementById("background-audio").pause()
        }, 1000);
    }
    $rootScope.playBackgroundAudio = function()
    {
        document.getElementById("background-audio").play();
        $("#background-audio").animate({volume: 1}, 1000);
    }


    /* Kiosk mode */
    $rootScope.isKiosk = false;
    var url = new URL(window.location);
    if (url.searchParams.get("kiosk")) {
        $window.sessionStorage.isKiosk = true;
    }
    $rootScope.isKiosk = $window.sessionStorage.isKiosk;

    if ($rootScope.isKiosk) {

        // disable right click
        $(function() {
            $(this).bind("contextmenu", function(e) {
                e.preventDefault();
            });
        }); 

        // select catalan language
        $('.languages a[data-language=ca]').click();
    }


    $rootScope.loadYoutubeVideo = function(youtube_id, element_id, config)
    {
        // create youtube player
        if (!YT) {
            $window.onYouTubePlayerAPIReady = onYoutubeReady;
        } else if (YT.loaded) {
            onYoutubeReady();
        } else {
            YT.ready(onYoutubeReady);
        }

        var player;

        function onYoutubeReady() {
            var playerVars = $rootScope.isKiosk ? config.youtube.playerVars_kiosk : config.youtube.playerVars_web;
            switch ($rootScope.lang) {
                case 'es': 
                    playerVars.hl = 'ES_es';
                    break;
                case 'ca':
                    playerVars.hl = 'ES_ca';
            }
            player = new YT.Player(element_id, {
                videoId: youtube_id,
                height: '600',
                width: '800',
                playerVars: playerVars
            });
        }

        $('#'+element_id).parent().find('.overlay').click(function(){
            switch (player.getPlayerState()) {
                case YT.PlayerState.ENDED:
                    player.seekTo(0)
                    player.playVideo();
                    break;
                case YT.PlayerState.PLAYING:
                    player.pauseVideo();
                    break;
                case YT.PlayerState.PAUSED:
                    player.playVideo();
                    break;
                case YT.PlayerState.BUFFERING:
                    player.pauseVideo();
                    break;
            }
        });

        return player;
    }


    // touch sound
    $(document).on('touchstart', function(){
        var sound = document.getElementById("tap-player");
        sound.volume = 0.1;
        sound.currentTime = 0;
        sound.play();
    })

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






