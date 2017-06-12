var myApp = angular.module('footballApp', ['ngRoute']);

var matches=[];
myApp.controller('mainPageController',['$http','$routeParams',function($http,
  $routeParams){

	//create a context
  var main = this;
  this.rounds=[];
  this.matchesSelected=[];
  this.selectedItem="2015-16";
  this.baseUrl="https://raw.githubusercontent.com/openfootball/football.json/master";

  this.loadAllMatches=function(date){
  	$http({
        method: 'GET',
        url: main.baseUrl+'/'+date+'/en.1.json'
      }).then(function successCallback(response){
        main.rounds=response.data.rounds;
        matches=response.data.rounds;
        main.matchesSelected=main.rounds[0].matches;
      },function errorCallback(response){

      });

      this.getMatches=function(){
        this.roundId = $routeParams.matchId;
        main.matchesSelected=main.rounds[this.roundId].matches;
    }
     this.update=function(){
        console.log(main.selectedItem);
        main.loadAllMatches(main.selectedItem);
    }
  }

}]);

myApp.controller('matchController',['$http',function($http){
  var main = this;
  this.matchesSelected=[];
  this.getMatches=function(){
      console.log("Inside");
      main.matchesSelected=matches[0].matches;
      console.log(main.matchesSelected);
    }
}]);