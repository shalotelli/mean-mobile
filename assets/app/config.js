(function () {
  'use strict';

  var app = {
    name: 'mean',
    version: '0.0.0'
  };

  angular.module('templates', []);

  angular.module(app.name + '.controllers', []);
  angular.module(app.name + '.models', []);
  angular.module(app.name + '.services', []);

  angular.module(app.name, [
    'ui.router',
    'ngResource',

    'templates',

    app.name + '.controllers',
    app.name + '.models',
    app.name + '.services'
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
