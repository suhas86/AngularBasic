myApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{
		template	: '<h1>Welcome select Match Play</h1>'
	}).when('/match/:matchId',{
		templateUrl		: 'views/index-view.html',
        	
        controller 		: 'mainPageController'
	}).
	otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}])