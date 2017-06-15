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
  this.selectedDate;
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
        main.selectedDate=$routeParams.dateSelected;
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

//Team Controller
myApp.controller('teamPageController',['$http','$routeParams','$filter',function($http,
  $routeParams,$filter){
  var main = this;
   this.baseUrl="https://raw.githubusercontent.com/openfootball/football.json/master";
  this.date=$routeParams.dateSelected;
  this.code=$routeParams.key;
  this.matchArray = [];
  this.teamName;
  this.played;
  this.noOfWins = 0;
  this.noOfLoss=0;
  this.noOfDraws = 0;
  this.noOfGoals = 0;
  this.noOfGoalsAgainst = 0;
  $http({
        method: 'GET',
        url: main.baseUrl+'/'+main.date+'/en.1.json'
      }).then(function successCallback(response){
        main.rounds=response.data.rounds;
        matches=response.data.rounds;
        //Logic to get all the matches list
        angular.forEach(main.rounds, function (value, key) {

        angular.forEach(value.matches, function (value, key) {
          main.matchArray.push(value);

        });
      });

        //Logic to get Team details using filters
        main.ListOfMatches = main.matchArray.filter(function (team) {
        if (team.team1.code === main.code) {
          main.teamName=team.team1.name;
          if (main.noOfGoals + team.score1 > main.noOfGoals + team.score2) {
            main.noOfWins = main.noOfWins + 1;
          } else if (main.noOfGoals + team.score1 == main.noOfGoals + team.score2) {
            main.noOfDraws = main.noOfDraws + 1;
          }
          main.noOfGoals = main.noOfGoals + team.score1;
          main.noOfGoalsAgainst = main.noOfGoalsAgainst + team.score2;
          return team;
        } else if (team.team2.code == main.code) {
          main.teamName=team.team1.name;
          if (main.noOfGoals + team.score2 > main.noOfGoals + team.score1) {
            main.noOfWins = main.noOfWins + 1;
          } else if (main.noOfGoals + team.score1 == main.noOfGoals + team.score2) {
            main.noOfDraws = main.noOfDraws + 1;
          }
          main.noOfGoals = main.noOfGoals + team.score2;
          main.noOfGoalsAgainst = main.noOfGoalsAgainst + team.score1;
          return team;
        }
        
      });
       main.played=main.ListOfMatches.length;
       main.noOfLoss=(main.ListOfMatches.length)-(main.noOfWins)-(main.noOfDraws); 

      },function errorCallback(response){

      });
  
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