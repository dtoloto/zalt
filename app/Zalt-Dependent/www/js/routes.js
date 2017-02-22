angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('tabsController.menu', {
    url: '/page3',
    views: {
      'tab3': {
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      }
    }
  })

  .state('tabsController.meuCartO', {
    url: '/page4',
    views: {
      'tab1': {
        templateUrl: 'templates/meuCartO.html',
        controller: 'meuCartOCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('autenticacao', {
    url: '/page9',
    templateUrl: 'templates/autenticacao.html',
    controller: 'autenticacaoCtrl'

  })

  .state('tabsController.meusRecibos', {
    url: '/page6',
    views: {
      'tab2': {
        templateUrl: 'templates/meusRecibos.html',
        controller: 'meusRecibosCtrl'
      }
    }
  })



$urlRouterProvider.otherwise('/page5')



});
