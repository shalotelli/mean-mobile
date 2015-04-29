(function () {
  'use strict';

  var app = {
    name: 'mean',
    version: '0.0.0'
  };

  angular.module('templates', []);

  angular.module(app.name, [
    'ui.router',
    'ngResource',

    'templates'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        controller: function () {}
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('AppName', app.name)
  .constant('AppVersion', app.version);

  angular.element(document).ready(function () {
    angular.bootstrap(document, [ app.name ]);
  });
})();
