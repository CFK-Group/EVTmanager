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

  $urlRouterProvider.otherwise('login');
})

.run(function ($state, $ionicConfig, $rootScope, $cordovaGeolocation, apiConnection) {
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
    },
    // comunas del sur
    {
      "codigo": "07301",
      "tipo": "comuna",
      "nombre": "Curicó",
      "lat": -34.9756,
      "lng": -71.2235,
      "url": "",
      "codigo_padre": "073"
    },
    {
      "codigo": "07101",
      "tipo": "comuna",
      "nombre": "Talca",
      "lat": -35.4288,
      "lng": -71.6607,
      "url": "",
      "codigo_padre": "071"
    },
    {
      "codigo": "07102",
      "tipo": "comuna",
      "nombre": "Constitución",
      "lat": -35.3309,
      "lng": -72.4139,
      "url": "",
      "codigo_padre": "071"
    },
    {
      "codigo": "08401",
      "tipo": "comuna",
      "nombre": "Chillán",
      "lat": -36.6013,
      "lng": -72.1093,
      "url": "",
      "codigo_padre": "084"
    },
    {
      "codigo": "08416",
      "tipo": "comuna",
      "nombre": "San Carlos",
      "lat": -36.4221,
      "lng": -71.9594,
      "url": "",
      "codigo_padre": "084"
    },
    {
      "codigo": "08101",
      "tipo": "comuna",
      "nombre": "Concepción",
      "lat": -36.8148,
      "lng": -73.0293,
      "url": "",
      "codigo_padre": "081"
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
      "codigo": "08112",
      "tipo": "comuna",
      "nombre": "Hualpén",
      "lat": -36.7827,
      "lng": -73.1454,
      "url": "",
      "codigo_padre": "081"
    },
    {
      "codigo": "08107",
      "tipo": "comuna",
      "nombre": "Penco",
      "lat": -36.7423,
      "lng": -72.998,
      "url": "",
      "codigo_padre": "081"
    },
    {
      "codigo": "08103",
      "tipo": "comuna",
      "nombre": "Chiguayante",
      "lat": -36.9046,
      "lng": -73.0164,
      "url": "",
      "codigo_padre": "081"
    },
    {
      "codigo": "08110",
      "tipo": "comuna",
      "nombre": "Talcahuano",
      "lat": -36.7364,
      "lng": -73.1047,
      "url": "",
      "codigo_padre": "081"
    },
    {
      "codigo": "08301",
      "tipo": "comuna",
      "nombre": "Los Ángeles",
      "lat": -37.473,
      "lng": -72.3507,
      "url": "",
      "codigo_padre": "083"
    }

    // // comunas Región del Biobío
    // {
    //   "codigo": "08314",
    //   "tipo": "comuna",
    //   "nombre": "Alto Biobío",
    //   "lat": -37.8708,
    //   "lng": -71.6106,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08302",
    //   "tipo": "comuna",
    //   "nombre": "Antuco",
    //   "lat": -37.3273,
    //   "lng": -71.6775,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08202",
    //   "tipo": "comuna",
    //   "nombre": "Arauco",
    //   "lat": -37.257,
    //   "lng": -73.2839,
    //   "url": "",
    //   "codigo_padre": "082"
    // },
    // {
    //   "codigo": "08402",
    //   "tipo": "comuna",
    //   "nombre": "Bulnes",
    //   "lat": -36.7422,
    //   "lng": -72.3018,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08303",
    //   "tipo": "comuna",
    //   "nombre": "Cabrero",
    //   "lat": -37.0374,
    //   "lng": -72.4057,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08203",
    //   "tipo": "comuna",
    //   "nombre": "Cañete",
    //   "lat": -37.8039,
    //   "lng": -73.4016,
    //   "url": "",
    //   "codigo_padre": "082"
    // },
    // {
    //   "codigo": "08103",
    //   "tipo": "comuna",
    //   "nombre": "Chiguayante",
    //   "lat": -36.9046,
    //   "lng": -73.0164,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08401",
    //   "tipo": "comuna",
    //   "nombre": "Chillán",
    //   "lat": -36.6013,
    //   "lng": -72.1093,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08406",
    //   "tipo": "comuna",
    //   "nombre": "Chillán Viejo",
    //   "lat": -36.6333,
    //   "lng": -72.1404,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08403",
    //   "tipo": "comuna",
    //   "nombre": "Cobquecura",
    //   "lat": -36.1318,
    //   "lng": -72.7911,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08404",
    //   "tipo": "comuna",
    //   "nombre": "Coelemu",
    //   "lat": -36.4877,
    //   "lng": -72.7022,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08405",
    //   "tipo": "comuna",
    //   "nombre": "Coihueco",
    //   "lat": -36.6166,
    //   "lng": -71.8344,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08101",
    //   "tipo": "comuna",
    //   "nombre": "Concepción",
    //   "lat": -36.8148,
    //   "lng": -73.0293,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08204",
    //   "tipo": "comuna",
    //   "nombre": "Contulmo",
    //   "lat": -38.026,
    //   "lng": -73.2581,
    //   "url": "",
    //   "codigo_padre": "082"
    // },
    // {
    //   "codigo": "08102",
    //   "tipo": "comuna",
    //   "nombre": "Coronel",
    //   "lat": -37.0265,
    //   "lng": -73.1498,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08205",
    //   "tipo": "comuna",
    //   "nombre": "Curanilahue",
    //   "lat": -37.4759,
    //   "lng": -73.353,
    //   "url": "",
    //   "codigo_padre": "082"
    // },
    // {
    //   "codigo": "08407",
    //   "tipo": "comuna",
    //   "nombre": "El Carmen",
    //   "lat": -36.8964,
    //   "lng": -72.0218,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08104",
    //   "tipo": "comuna",
    //   "nombre": "Florida",
    //   "lat": -36.8209,
    //   "lng": -72.6621,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08112",
    //   "tipo": "comuna",
    //   "nombre": "Hualpén",
    //   "lat": -36.7827,
    //   "lng": -73.1454,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08105",
    //   "tipo": "comuna",
    //   "nombre": "Hualqui",
    //   "lat": -37.0145,
    //   "lng": -72.8662,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08304",
    //   "tipo": "comuna",
    //   "nombre": "Laja",
    //   "lat": -37.2768,
    //   "lng": -72.7171,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08201",
    //   "tipo": "comuna",
    //   "nombre": "Lebu",
    //   "lat": -37.6079,
    //   "lng": -73.6508,
    //   "url": "",
    //   "codigo_padre": "082"
    // },
    // {
    //   "codigo": "08206",
    //   "tipo": "comuna",
    //   "nombre": "Los Álamos",
    //   "lat": -37.6747,
    //   "lng": -73.3896,
    //   "url": "",
    //   "codigo_padre": "082"
    // },
    // {
    //   "codigo": "08301",
    //   "tipo": "comuna",
    //   "nombre": "Los Ángeles",
    //   "lat": -37.473,
    //   "lng": -72.3507,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08106",
    //   "tipo": "comuna",
    //   "nombre": "Lota",
    //   "lat": -37.0906,
    //   "lng": -73.1547,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08305",
    //   "tipo": "comuna",
    //   "nombre": "Mulchén",
    //   "lat": -37.7147,
    //   "lng": -72.2394,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08306",
    //   "tipo": "comuna",
    //   "nombre": "Nacimiento",
    //   "lat": -37.5011,
    //   "lng": -72.6763,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08307",
    //   "tipo": "comuna",
    //   "nombre": "Negrete",
    //   "lat": -37.5974,
    //   "lng": -72.5646,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08408",
    //   "tipo": "comuna",
    //   "nombre": "Ninhue",
    //   "lat": -36.4011,
    //   "lng": -72.397,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08409",
    //   "tipo": "comuna",
    //   "nombre": "Ñiquén",
    //   "lat": -36.2848,
    //   "lng": -71.8994,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08410",
    //   "tipo": "comuna",
    //   "nombre": "Pemuco",
    //   "lat": -36.9865,
    //   "lng": -72.0191,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08107",
    //   "tipo": "comuna",
    //   "nombre": "Penco",
    //   "lat": -36.7423,
    //   "lng": -72.998,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08411",
    //   "tipo": "comuna",
    //   "nombre": "Pinto",
    //   "lat": -36.6978,
    //   "lng": -71.8934,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08412",
    //   "tipo": "comuna",
    //   "nombre": "Portezuelo",
    //   "lat": -36.529,
    //   "lng": -72.433,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08308",
    //   "tipo": "comuna",
    //   "nombre": "Quilaco",
    //   "lat": -37.6799,
    //   "lng": -72.0074,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08309",
    //   "tipo": "comuna",
    //   "nombre": "Quilleco",
    //   "lat": -37.4335,
    //   "lng": -71.8761,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08413",
    //   "tipo": "comuna",
    //   "nombre": "Quillón",
    //   "lat": -36.7383,
    //   "lng": -72.469,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08414",
    //   "tipo": "comuna",
    //   "nombre": "Quirihue",
    //   "lat": -36.2839,
    //   "lng": -72.5414,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08415",
    //   "tipo": "comuna",
    //   "nombre": "Ránquil",
    //   "lat": -36.6485,
    //   "lng": -72.6064,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08416",
    //   "tipo": "comuna",
    //   "nombre": "San Carlos",
    //   "lat": -36.4221,
    //   "lng": -71.9594,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08417",
    //   "tipo": "comuna",
    //   "nombre": "San Fabián",
    //   "lat": -36.5538,
    //   "lng": -71.5487,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08418",
    //   "tipo": "comuna",
    //   "nombre": "San Ignacio",
    //   "lat": -36.8186,
    //   "lng": -71.9883,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08419",
    //   "tipo": "comuna",
    //   "nombre": "San Nicolás",
    //   "lat": -36.4996,
    //   "lng": -72.2126,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08108",
    //   "tipo": "comuna",
    //   "nombre": "San Pedro de la Paz",
    //   "lat": -36.8635,
    //   "lng": -73.1085,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08310",
    //   "tipo": "comuna",
    //   "nombre": "San Rosendo",
    //   "lat": -37.2021,
    //   "lng": -72.748,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08311",
    //   "tipo": "comuna",
    //   "nombre": "Santa Bárbara",
    //   "lat": -37.6627,
    //   "lng": -72.0184,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08109",
    //   "tipo": "comuna",
    //   "nombre": "Santa Juana",
    //   "lat": -37.1726,
    //   "lng": -72.9352,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08110",
    //   "tipo": "comuna",
    //   "nombre": "Talcahuano",
    //   "lat": -36.7364,
    //   "lng": -73.1047,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08207",
    //   "tipo": "comuna",
    //   "nombre": "Tirúa",
    //   "lat": -38.3315,
    //   "lng": -73.3794,
    //   "url": "",
    //   "codigo_padre": "082"
    // },
    // {
    //   "codigo": "08111",
    //   "tipo": "comuna",
    //   "nombre": "Tomé",
    //   "lat": -36.6177,
    //   "lng": -72.9579,
    //   "url": "",
    //   "codigo_padre": "081"
    // },
    // {
    //   "codigo": "08420",
    //   "tipo": "comuna",
    //   "nombre": "Treguaco",
    //   "lat": -36.4095,
    //   "lng": -72.6603,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // {
    //   "codigo": "08312",
    //   "tipo": "comuna",
    //   "nombre": "Tucapel",
    //   "lat": -37.2901,
    //   "lng": -71.9491,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08313",
    //   "tipo": "comuna",
    //   "nombre": "Yumbel",
    //   "lat": -37.0964,
    //   "lng": -72.5562,
    //   "url": "",
    //   "codigo_padre": "083"
    // },
    // {
    //   "codigo": "08421",
    //   "tipo": "comuna",
    //   "nombre": "Yungay",
    //   "lat": -37.122,
    //   "lng": -72.0132,
    //   "url": "",
    //   "codigo_padre": "084"
    // },
    // // comunas Región del Maule
    // {
    //   "codigo": "07201",
    //   "tipo": "comuna",
    //   "nombre": "Cauquenes",
    //   "lat": -35.9738,
    //   "lng": -72.3142,
    //   "url": "",
    //   "codigo_padre": "072"
    // },
    // {
    //   "codigo": "07202",
    //   "tipo": "comuna",
    //   "nombre": "Chanco",
    //   "lat": -35.7337,
    //   "lng": -72.5333,
    //   "url": "",
    //   "codigo_padre": "072"
    // },
    // {
    //   "codigo": "07402",
    //   "tipo": "comuna",
    //   "nombre": "Colbún",
    //   "lat": -35.6927,
    //   "lng": -71.4067,
    //   "url": "",
    //   "codigo_padre": "074"
    // },
    // {
    //   "codigo": "07102",
    //   "tipo": "comuna",
    //   "nombre": "Constitución",
    //   "lat": -35.3309,
    //   "lng": -72.4139,
    //   "url": "",
    //   "codigo_padre": "071"
    // },
    // {
    //   "codigo": "07103",
    //   "tipo": "comuna",
    //   "nombre": "Curepto",
    //   "lat": -35.091,
    //   "lng": -72.0216,
    //   "url": "",
    //   "codigo_padre": "071"
    // },
    // {
    //   "codigo": "07301",
    //   "tipo": "comuna",
    //   "nombre": "Curicó",
    //   "lat": -34.9756,
    //   "lng": -71.2235,
    //   "url": "",
    //   "codigo_padre": "073"
    // },
    // {
    //   "codigo": "07104",
    //   "tipo": "comuna",
    //   "nombre": "Empedrado",
    //   "lat": -35.6213,
    //   "lng": -72.2473,
    //   "url": "",
    //   "codigo_padre": "071"
    // },
    // {
    //   "codigo": "07302",
    //   "tipo": "comuna",
    //   "nombre": "Hualañé",
    //   "lat": -34.9762,
    //   "lng": -71.8043,
    //   "url": "",
    //   "codigo_padre": "073"
    // },
    // {
    //   "codigo": "07303",
    //   "tipo": "comuna",
    //   "nombre": "Licantén",
    //   "lat": -34.9591,
    //   "lng": -72.0269,
    //   "url": "",
    //   "codigo_padre": "073"
    // },
    // {
    //   "codigo": "07401",
    //   "tipo": "comuna",
    //   "nombre": "Linares",
    //   "lat": -35.8495,
    //   "lng": -71.585,
    //   "url": "",
    //   "codigo_padre": "074"
    // },
    // {
    //   "codigo": "07403",
    //   "tipo": "comuna",
    //   "nombre": "Longaví",
    //   "lat": -35.9657,
    //   "lng": -71.6816,
    //   "url": "",
    //   "codigo_padre": "074"
    // },
    // {
    //   "codigo": "07105",
    //   "tipo": "comuna",
    //   "nombre": "Maule",
    //   "lat": -35.5057,
    //   "lng": -71.7069,
    //   "url": "",
    //   "codigo_padre": "071"
    // },
    // {
    //   "codigo": "07304",
    //   "tipo": "comuna",
    //   "nombre": "Molina",
    //   "lat": -35.0896,
    //   "lng": -71.2788,
    //   "url": "",
    //   "codigo_padre": "073"
    // },
    // {
    //   "codigo": "07404",
    //   "tipo": "comuna",
    //   "nombre": "Parral",
    //   "lat": -36.14,
    //   "lng": -71.8244,
    //   "url": "",
    //   "codigo_padre": "074"
    // },
    // {
    //   "codigo": "07106",
    //   "tipo": "comuna",
    //   "nombre": "Pelarco",
    //   "lat": -35.3723,
    //   "lng": -71.3278,
    //   "url": "",
    //   "codigo_padre": "071"
    // },
    // {
    //   "codigo": "07203",
    //   "tipo": "comuna",
    //   "nombre": "Pelluhue",
    //   "lat": -35.8145,
    //   "lng": -72.5736,
    //   "url": "",
    //   "codigo_padre": "072"
    // },
    // {
    //   "codigo": "07107",
    //   "tipo": "comuna",
    //   "nombre": "Pencahue",
    //   "lat": -35.3051,
    //   "lng": -71.8284,
    //   "url": "",
    //   "codigo_padre": "071"
    // },
    // {
    //   "codigo": "07305",
    //   "tipo": "comuna",
    //   "nombre": "Rauco",
    //   "lat": -34.9295,
    //   "lng": -71.3111,
    //   "url": "",
    //   "codigo_padre": "073"
    // },
    // {
    //   "codigo": "07405",
    //   "tipo": "comuna",
    //   "nombre": "Retiro",
    //   "lat": -36.0458,
    //   "lng": -71.7591,
    //   "url": "",
    //   "codigo_padre": "074"
    // },
    // {
    //   "codigo": "07108",
    //   "tipo": "comuna",
    //   "nombre": "Río Claro",
    //   "lat": -35.2827,
    //   "lng": -71.2665,
    //   "url": "",
    //   "codigo_padre": "071"
    // },
    // {
    //   "codigo": "07306",
    //   "tipo": "comuna",
    //   "nombre": "Romeral",
    //   "lat": -34.9634,
    //   "lng": -71.1205,
    //   "url": "",
    //   "codigo_padre": "073"
    // },
    // {
    //   "codigo": "07307",
    //   "tipo": "comuna",
    //   "nombre": "Sagrada Familia",
    //   "lat": -34.9949,
    //   "lng": -71.3798,
    //   "url": "",
    //   "codigo_padre": "073"
    // },
    // {
    //   "codigo": "07109",
    //   "tipo": "comuna",
    //   "nombre": "San Clemente",
    //   "lat": -35.534,
    //   "lng": -71.4865,
    //   "url": "",
    //   "codigo_padre": "071"
    // },
    // {
    //   "codigo": "07406",
    //   "tipo": "comuna",
    //   "nombre": "San Javier",
    //   "lat": -35.6035,
    //   "lng": -71.7362,
    //   "url": "",
    //   "codigo_padre": "074"
    // },
    // {
    //   "codigo": "07110",
    //   "tipo": "comuna",
    //   "nombre": "San Rafael",
    //   "lat": -35.2942,
    //   "lng": -71.5254,
    //   "url": "",
    //   "codigo_padre": "071"
    // },
    // {
    //   "codigo": "07101",
    //   "tipo": "comuna",
    //   "nombre": "Talca",
    //   "lat": -35.4288,
    //   "lng": -71.6607,
    //   "url": "",
    //   "codigo_padre": "071"
    // },
    // {
    //   "codigo": "07308",
    //   "tipo": "comuna",
    //   "nombre": "Teno",
    //   "lat": -34.8701,
    //   "lng": -71.0895,
    //   "url": "",
    //   "codigo_padre": "073"
    // },
    // {
    //   "codigo": "07309",
    //   "tipo": "comuna",
    //   "nombre": "Vichuquén",
    //   "lat": -34.8594,
    //   "lng": -72.0074,
    //   "url": "",
    //   "codigo_padre": "073"
    // },
    // {
    //   "codigo": "07407",
    //   "tipo": "comuna",
    //   "nombre": "Villa Alegre",
    //   "lat": -35.6868,
    //   "lng": -71.6704,
    //   "url": "",
    //   "codigo_padre": "074"
    // },
    // {
    //   "codigo": "07408",
    //   "tipo": "comuna",
    //   "nombre": "Yerbas Buenas",
    //   "lat": -35.6882,
    //   "lng": -71.5636,
    //   "url": "",
    //   "codigo_padre": "074"
    // }
  ];
  $rootScope.decode = function(text) {
    return decodeURIComponent(escape(text));
  };
  var model = {
    latitud: '0',
    longitud: '0'
  };
  $rootScope.updateGeoPos = function (accion) {
    var posOptions = {timeout: 40000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(
      function (position) {
        model.latitud = position.coords.latitude.toString();
        model.longitud = position.coords.longitude.toString();
        data = {
          token: sessionStorage.userToken,
          lat: model.latitud,
          lon: model.longitud,
          accion: accion};
        console.table(data);
        apiConnection.sendGeoPos().save(data).$promise.then(
          function (response) {
            console.log('Updated GeoPos at ' + accion + ' succeed');
          },
          function (err) {
            console.log('Error: ',err);
          }
        );
      },
      function (err) {
          console.log('Error de geolocalizacion: ',err);
      }
    );
  }
});
