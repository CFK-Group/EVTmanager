// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('evtManager', ['ionic', 'evtManager.controllers', 'evtManager.services','ngCordova','ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tabs.ventas', {
    url: '/ventas',
    views: {
      'tab-ventas': {
        templateUrl: 'templates/tab-ventas.html',
        controller: 'VentasCtrl'
      }
    }
  })

  .state('tabs.ventas-estado', {
    url: '/ventas/estado',
    views: {
      'tab-ventas': {
        templateUrl: 'templates/estado-ventas.html',
        controller: 'VentasEstadoCtrl'
      }
    }
  })

  .state('tabs.ventas-visaciones', {
    url: '/ventas/visaciones',
    views: {
      'tab-ventas': {
        templateUrl: 'templates/ventas-visaciones.html',
        controller: 'VentasVisacionesCtrl'
      }
    }
  })

  .state('tabs.ventas-permanencia', {
    url: '/ventas/permanencia',
    views: {
      'tab-ventas': {
        templateUrl: 'templates/ventas-permanencia.html',
        controller: 'VentasPermanenciaCtrl'
      }
    }
  })

  .state('tabs.ventas-cobranzas', {
    url: '/ventas/cobranzas',
    views: {
      'tab-ventas': {
        templateUrl: 'templates/ventas-cobranzas.html',
        controller: 'VentasCobranzasCtrl'
      }
    }
  })

  .state('tabs.ventas-pendientes', {
    url: '/ventas/pendientes',
    views: {
      'tab-ventas': {
        templateUrl: 'templates/ventas-pendientes.html',
        controller: 'VentasPendientesCtrl'
      }
    }
  })

  .state('tabs.cuaderno', {
    url: '/mi-cuaderno',
    views: {
      'tab-mi-cuaderno': {
        templateUrl: 'templates/tab-mi-cuaderno.html',
        controller: 'MiCuadernoCtrl'
      }
    }
  })

  .state('tabs.cuaderno-direcciones-asignadas', {
    url: '/mi-cuaderno/direcciones-asignadas',
    views: {
      'tab-mi-cuaderno': {
        templateUrl: 'templates/tab-mi-cuaderno-direcciones-asignadas.html',
        controller: 'MiCuadernoDireccionesAsignadasCtrl'
      }
    }
  })

  .state('tabs.cuaderno-nuevo-prospecto', {
    url: '/mi-cuaderno/nuevo-prospecto',
    views: {
      'tab-mi-cuaderno': {
        templateUrl: 'templates/tab-mi-cuaderno-nuevo-prospecto.html',
        controller: 'MiCuadernoNuevoProspectoCtrl'
      }
    }
  })

  .state('tabs.cuaderno-historial', {
    url: '/mi-cuaderno/historial',
    views: {
      'tab-mi-cuaderno': {
        templateUrl: 'templates/tab-mi-cuaderno-historial.html',
        controller: 'MiCuadernoHistorialCtrl'
      }
    }
  })

  .state('tabs.cuaderno-ac', {
    url: '/mi-cuaderno/acciones-comerciales',
    views: {
      'tab-mi-cuaderno': {
        templateUrl: 'templates/acciones-comerciales.html',
        controller: 'MiCuadernoAccionesComercialesCtrl'
      }
    }
  })

  .state('tabs.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })

  .state('tabs.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-mi-cuaderno.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');

})

.run(function ($state, $ionicConfig, apiConnection) {
  $ionicConfig.tabs.position('bottom');
});
