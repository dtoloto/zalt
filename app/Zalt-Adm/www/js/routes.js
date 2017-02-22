angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('tabsController.meusCartEs', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/meusCartEs.html',
        controller: 'meusCartEsCtrl'
      }
    }
  })

  .state('tabsController.meusRecibos', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/meusRecibos.html',
        controller: 'meusRecibosCtrl'
      }
    }
  })

  .state('tabsController.minhasFaturas', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/minhasFaturas.html',
        controller: 'minhasFaturasCtrl'
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
    url: '/autenticacao',
    templateUrl: 'templates/autenticacao.html',
    controller: 'autenticacaoCtrl'
  })

  .state('tabsController.meuCartO', {
    url: '/page6',
    views: {
      'tab1': {
        templateUrl: 'templates/meuCartO.html',
        controller: 'meuCartOCtrl'
      }
    }
  })

  .state('tabsController.estabelecimentos', {
    url: '/page7',
    views: {
      'tab1': {
        templateUrl: 'templates/estabelecimentos.html',
        controller: 'estabelecimentosCtrl'
      }
    }
  })

  .state('tabsController.fatura', {
    url: '/page8',
    views: {
      'tab3': {
        templateUrl: 'templates/fatura.html',
        controller: 'faturaCtrl'
      }
    }
  })

  .state('tabsController.recibos', {
    url: '/page9',
    views: {
      'tab1': {
        templateUrl: 'templates/recibos.html',
        controller: 'recibosCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page5')



});
