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
    controller: function (sportsService) {
      this.sports = sportsService.data;
    },
    controllerAs: 'sportsCtrl'
  })
  .state('sports.medals', {
    url: '/:sportName',
    templateUrl: 'sports/sports-medals.html'
  })
})