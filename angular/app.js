var myApp = angular.module('footballApp', ['ngRoute']);

var matches=[];
myApp.controller('mainPageController',['$http','$routeParams','matchService','$location',function($http,
  $routeParams,matchService,$location){

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
    this.viewMatchDetails=function(item){
      console.log("Inside");
      console.log(item);
      matchService.addMatch(item);
      $location.path('/view-match');
    }
  }

}]);

myApp.controller('matchController',['$http','matchService',function($http,
  matchService){
  var main = this;
  this.matchesSelected;
  this.getMatchDetails=function(){
      console.log("Inside");
     main.matchesSelected= matchService.getMatch()
     console.log(main.matchesSelected);
    }
}]);


myApp.service('matchService', function() {
  var match = [];

  var addMatch = function(newObj) {
      match=newObj;
  };

  var getMatch = function(){
      return match;
  };

  return {
    addMatch: addMatch,
    getMatch: getMatch
  };

});