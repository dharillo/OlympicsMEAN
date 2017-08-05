import angular from 'angular';
import '@uirouter/angularjs';

angular.module('olympics', ['ui.router'])
.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/sports');
  $stateProvider
  .state('sports', {
    url: '/sports',
    templateUrl: 'sports/sports-nav.html',
    resolve: {
      sportsService: function($http) {
        return $http.get('/sports');
      }
    },
    controller: function (sportsService, $location) {
      this.sports = sportsService.data;

      this.isActive = function(sport) {
        let pathRegexp = /sports\/(\w+)/;
        let match = pathRegexp.exec($location.path());
        if (match === null || match.length === 0) return false;
        let selectedSportName = match[1];
        return sport === selectedSportName;
      }
    },
    controllerAs: 'sportsCtrl'
  })
  .state('sports.medals', {
    url: '/:sportName',
    templateUrl: 'sports/sports-medals.html',
    resolve: {
      sportService: function($http, $stateParams) {
        return $http.get(`/sports/${ $stateParams.sportName }`);
      }
    },
    controller: function(sportService) {
      this.sport = sportService.data;
    },
    controllerAs: 'sportCtrl'
  })
  .state('sports.new', {
    url: '/:sportName/medal/new',
    templateUrl: 'sports/new-medal.html',
    controller: function($stateParams, $state, $http) {
      this.sportName = $stateParams.sportName;
      this.saveMedal = function(medal) {
        $http({method: 'POST', url: `/sports/${this.sportName}/medals`, data: {medal}}).then(() => {
          $state.go('sports.medals', {sportName: this.sportName});
        });
      }
    },
    controllerAs: 'newMedalCtrl'
  })
})