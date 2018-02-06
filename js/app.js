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

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

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

  .state('loading', {
    url: '/loading',
    abstract: true,
    templateUrl: 'templates/loading.html'
  })

  .state('loading.prospectos', {
    url: '/prospectos',
    views: {
      'loading': {
        templateUrl: 'templates/loading-prospectos.html',
        controller: 'LoadingProspectosCtrl'
      }
    }
  })

  .state('loading.ventas', {
    url: '/ventas',
    views: {
      'loading': {
        templateUrl: 'templates/loading-ventas.html',
        controller: 'LoadingVentasCtrl',
        animation: 'slide-in-right'
      }
    }
  })

  // setup an abstract state for the tabs directive
  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    animation: 'slide-in-up'
  })

  // Each tab has its own nav history stack:

  .state('tabs.ventas', {
    url: '/ventas',
    views: {
      'tab-ventas': {
        templateUrl: 'templates/tab-ventas.html',
        controller: 'VentasCtrl'
      }
    },
    animation: 'slide-in-left'
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
    },
    animation: 'slide-in-right'
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
        templateUrl: 'templates/modal-acciones-comerciales.html',
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

.run(function ($state, $ionicConfig, $rootScope, geoPos, $cordovaGeolocation, apiConnection) {
  $ionicConfig.tabs.position('bottom');
  $rootScope.comunas = [
    // comunas RM
    {
      "codigo": "13502",
      "tipo": "comuna",
      "nombre": "Alhué",
      "lat": -34.0355,
      "lng": -71.028,
      "url": "",
      "codigo_padre": "135"
    },
    {
      "codigo": "13402",
      "tipo": "comuna",
      "nombre": "Buin",
      "lat": -33.754,
      "lng": -70.7163,
      "url": "",
      "codigo_padre": "134"
    },
    {
      "codigo": "13403",
      "tipo": "comuna",
      "nombre": "Calera de Tango",
      "lat": -33.6326,
      "lng": -70.7821,
      "url": "",
      "codigo_padre": "134"
    },
    {
      "codigo": "13102",
      "tipo": "comuna",
      "nombre": "Cerrillos",
      "lat": -33.497,
      "lng": -70.7112,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13103",
      "tipo": "comuna",
      "nombre": "Cerro Navia",
      "lat": -33.4267,
      "lng": -70.7434,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13301",
      "tipo": "comuna",
      "nombre": "Colina",
      "lat": -33.1996,
      "lng": -70.6702,
      "url": "",
      "codigo_padre": "133"
    },
    {
      "codigo": "13104",
      "tipo": "comuna",
      "nombre": "Conchalí",
      "lat": -33.3862,
      "lng": -70.6727,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13503",
      "tipo": "comuna",
      "nombre": "Curacaví",
      "lat": -33.4063,
      "lng": -71.1333,
      "url": "",
      "codigo_padre": "135"
    },
    {
      "codigo": "13105",
      "tipo": "comuna",
      "nombre": "El Bosque",
      "lat": -33.5638,
      "lng": -70.6714,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13602",
      "tipo": "comuna",
      "nombre": "El Monte",
      "lat": -33.6662,
      "lng": -71.0294,
      "url": "",
      "codigo_padre": "136"
    },
    {
      "codigo": "13106",
      "tipo": "comuna",
      "nombre": "Estación Central",
      "lat": -33.4503,
      "lng": -70.6751,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13107",
      "tipo": "comuna",
      "nombre": "Huechuraba",
      "lat": -33.3665,
      "lng": -70.6315,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13108",
      "tipo": "comuna",
      "nombre": "Independencia",
      "lat": -33.4196,
      "lng": -70.6627,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13603",
      "tipo": "comuna",
      "nombre": "Isla de Maipo",
      "lat": -33.7536,
      "lng": -70.8862,
      "url": "",
      "codigo_padre": "136"
    },
    {
      "codigo": "13109",
      "tipo": "comuna",
      "nombre": "La Cisterna",
      "lat": -33.538,
      "lng": -70.6612,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13110",
      "tipo": "comuna",
      "nombre": "La Florida",
      "lat": -33.5225,
      "lng": -70.5952,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13111",
      "tipo": "comuna",
      "nombre": "La Granja",
      "lat": -33.5373,
      "lng": -70.6188,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13112",
      "tipo": "comuna",
      "nombre": "La Pintana",
      "lat": -33.5902,
      "lng": -70.6322,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13113",
      "tipo": "comuna",
      "nombre": "La Reina",
      "lat": -33.4565,
      "lng": -70.5349,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13302",
      "tipo": "comuna",
      "nombre": "Lampa",
      "lat": -33.2863,
      "lng": -70.8789,
      "url": "",
      "codigo_padre": "133"
    },
    {
      "codigo": "13114",
      "tipo": "comuna",
      "nombre": "Las Condes",
      "lat": -33.4154,
      "lng": -70.5837,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13115",
      "tipo": "comuna",
      "nombre": "Lo Barnechea",
      "lat": -33.2993,
      "lng": -70.3748,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13116",
      "tipo": "comuna",
      "nombre": "Lo Espejo",
      "lat": -33.5247,
      "lng": -70.6916,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13117",
      "tipo": "comuna",
      "nombre": "Lo Prado",
      "lat": -33.4489,
      "lng": -70.721,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13118",
      "tipo": "comuna",
      "nombre": "Macul",
      "lat": -33.492,
      "lng": -70.5968,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13119",
      "tipo": "comuna",
      "nombre": "Maipú",
      "lat": -33.5213,
      "lng": -70.7572,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13504",
      "tipo": "comuna",
      "nombre": "María Pinto",
      "lat": -33.5154,
      "lng": -71.1191,
      "url": "",
      "codigo_padre": "135"
    },
    {
      "codigo": "13501",
      "tipo": "comuna",
      "nombre": "Melipilla",
      "lat": -33.6866,
      "lng": -71.2139,
      "url": "",
      "codigo_padre": "135"
    },
    {
      "codigo": "13120",
      "tipo": "comuna",
      "nombre": "Ñuñoa",
      "lat": -33.4607,
      "lng": -70.5927,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13604",
      "tipo": "comuna",
      "nombre": "Padre Hurtado",
      "lat": -33.5761,
      "lng": -70.8003,
      "url": "",
      "codigo_padre": "136"
    },
    {
      "codigo": "13404",
      "tipo": "comuna",
      "nombre": "Paine",
      "lat": -33.8673,
      "lng": -70.7303,
      "url": "",
      "codigo_padre": "134"
    },
    {
      "codigo": "13121",
      "tipo": "comuna",
      "nombre": "Pedro Aguirre Cerda",
      "lat": -33.4891,
      "lng": -70.6729,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13605",
      "tipo": "comuna",
      "nombre": "Peñaflor",
      "lat": -33.6141,
      "lng": -70.8876,
      "url": "",
      "codigo_padre": "136"
    },
    {
      "codigo": "13122",
      "tipo": "comuna",
      "nombre": "Peñalolén",
      "lat": -33.4904,
      "lng": -70.5105,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13202",
      "tipo": "comuna",
      "nombre": "Pirque",
      "lat": -33.7384,
      "lng": -70.4914,
      "url": "",
      "codigo_padre": "132"
    },
    {
      "codigo": "13123",
      "tipo": "comuna",
      "nombre": "Providencia",
      "lat": -33.4214,
      "lng": -70.6033,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13124",
      "tipo": "comuna",
      "nombre": "Pudahuel",
      "lat": -33.4184,
      "lng": -70.8324,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13201",
      "tipo": "comuna",
      "nombre": "Puente Alto",
      "lat": -33.6079,
      "lng": -70.5778,
      "url": "",
      "codigo_padre": "132"
    },
    {
      "codigo": "13125",
      "tipo": "comuna",
      "nombre": "Quilicura",
      "lat": -33.3551,
      "lng": -70.7278,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13126",
      "tipo": "comuna",
      "nombre": "Quinta Normal",
      "lat": -33.428,
      "lng": -70.6964,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13127",
      "tipo": "comuna",
      "nombre": "Recoleta",
      "lat": -33.4173,
      "lng": -70.6303,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13128",
      "tipo": "comuna",
      "nombre": "Renca",
      "lat": -33.4141,
      "lng": -70.7129,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13401",
      "tipo": "comuna",
      "nombre": "San Bernardo",
      "lat": -33.5913,
      "lng": -70.702,
      "url": "",
      "codigo_padre": "134"
    },
    {
      "codigo": "13129",
      "tipo": "comuna",
      "nombre": "San Joaquín",
      "lat": -33.4961,
      "lng": -70.6245,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13203",
      "tipo": "comuna",
      "nombre": "San José de Maipo",
      "lat": -33.6921,
      "lng": -70.1325,
      "url": "",
      "codigo_padre": "132"
    },
    {
      "codigo": "13130",
      "tipo": "comuna",
      "nombre": "San Miguel",
      "lat": -33.5017,
      "lng": -70.6489,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13505",
      "tipo": "comuna",
      "nombre": "San Pedro",
      "lat": -33.8779,
      "lng": -71.4609,
      "url": "",
      "codigo_padre": "135"
    },
    {
      "codigo": "13131",
      "tipo": "comuna",
      "nombre": "San Ramón",
      "lat": -33.5349,
      "lng": -70.6392,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13101",
      "tipo": "comuna",
      "nombre": "Santiago Centro",
      "lat": -33.4417,
      "lng": -70.6541,
      "url": "",
      "codigo_padre": "131"
    },
    {
      "codigo": "13601",
      "tipo": "comuna",
      "nombre": "Talagante",
      "lat": -33.6643,
      "lng": -70.9296,
      "url": "",
      "codigo_padre": "136"
    },
    {
      "codigo": "13303",
      "tipo": "comuna",
      "nombre": "Tiltil",
      "lat": -33.0655,
      "lng": -70.8465,
      "url": "",
      "codigo_padre": "133"
    },
    {
      "codigo": "13132",
      "tipo": "comuna",
      "nombre": "Vitacura",
      "lat": -33.3863,
      "lng": -70.5698,
      "url": "",
      "codigo_padre": "131"
    }
    // fin comunas RM
  ];
  $rootScope.updateGeoPos = function (accion) {

    var posOptions = {
      timeout: 10000,
      enableHighAccuracy: false
    };
    var model = {
      latitud: '',
      longitud: ''
    };
    $cordovaGeolocation.getCurrentPosition(posOptions).then(
      function (position) {
        model.latitud = (position.coords.latitude).toString();
        model.longitud = (position.coords.longitude).toString();
      }
    );
    apiConnection.sendGeoPos().save(sessionStorage.userToken, model.latitud, model.longitud, accion).$promise.then(
      function (response) {
        console.log('Updated GeoPos at ' + accion + ' succeed')
      },
      function (err) {
        console.log('Error: ',err);
      }
    );
  }
});
