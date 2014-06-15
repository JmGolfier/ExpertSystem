var APP_NAME = "expert_pokemon";
var APP_NAME_CONTROLLERS = APP_NAME + ".controllers";
var APP_NAME_SERVICES = APP_NAME + ".services";
var APP_NAME_FILTERS = APP_NAME + ".filters";
var APP_NAME_DIRECTIVES = APP_NAME + ".directives";
var APP_LOCALSTORAGE_PREFIX = APP_NAME;

// Declare app level module which depends on filters, and services
angular.module(APP_NAME, [
    'ngRoute',
//    'ngResource',
//    'ui.bootstrap',
    'LocalStorageModule',
    'multi-select',
    APP_NAME_FILTERS,
    APP_NAME_SERVICES,
    APP_NAME_DIRECTIVES,
    APP_NAME_CONTROLLERS
]).

    constant('Constants', {
        //locale mode :
        //apiUrl: 'api/',
    }).

    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/battle', {templateUrl: 'views/battle.html', controller: 'BattleController'});
        $routeProvider.when('/knowledge', {templateUrl: 'views/fillKnowledge.html', controller: 'FillKnowledgeController'});
        $routeProvider.otherwise({redirectTo: '/battle'});
    }]).

    config(['localStorageServiceProvider', function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix(APP_LOCALSTORAGE_PREFIX);
    }]);

//Modules declarations
angular.module(APP_NAME_CONTROLLERS, []);
angular.module(APP_NAME_SERVICES, []);
angular.module(APP_NAME_FILTERS, []);
angular.module(APP_NAME_DIRECTIVES, []);