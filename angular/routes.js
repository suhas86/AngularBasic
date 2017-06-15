myApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{
		template	: '<h1>Welcome select Match Play</h1>'
	}).when('/match/:matchId/:dateSelected',{
		templateUrl		: 'views/index-view.html',
        	
        controller 		: 'mainPageController'
	}).
	when('/view-match',{
		templateUrl		: 'views/match-detail.html',
        	
        controller 		: 'matchController',
        controllerAs 	: 'matchPage'
	}).
	when('/team/:key/:dateSelected',{
		templateUrl		: 'views/team-detail.html',
        	
        controller 		: 'teamPageController',
        controllerAs 	: 'teamPage'
	}).
	otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}])