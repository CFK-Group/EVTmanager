'use.strict';

var app = angular.module('evtManager.controllers', []);

app.controller('LoginCtrl', function ($scope, $ionicPlatform, $cordovaDevice, $rootScope, $ionicPopup, $ionicLoading, $state, apiConnection) {
  console.log('loginCtrl');
  $ionicPlatform.ready(function () {
    //console.log($cordovaDevice.getDevice());
    var mode = 'develop'; //cambiar valor entre develop y produccion según corresponda
    var model = "";
    var uuid = "";

    //detecccion de modo para saltar la comprobación de dispositivo
    if(mode === 'produccion'){
      model = $cordovaDevice.getModel();
      uuid = $cordovaDevice.getUUID();
      $scope.user = {
        username: "",
        password: "",
        deviceId: uuid,
        deviceModel: model
      };
    }else{
      model = "";
      uuid = "";
      $scope.user = {
        username: "test",
        password: "test",
        deviceId: uuid,
        deviceModel: model
      };
    }

    $scope.login = function () {
      $ionicLoading.show({
        template: 'Iniciando Sesión...',
        animation: 'fade-in',
        showBackdrop: true
      });
      $scope.loginVar = apiConnection.loginUser($scope.user.username, $scope.user.password, $scope.user.deviceId, $scope.user.deviceModel).query(
        function (response) {

          $scope.loginInfo = response;

          if ($scope.loginInfo.statusCode === 0) {

            sessionStorage.userSession = angular.toJson($scope.loginInfo);

            $rootScope.userToken = JSON.parse(sessionStorage.userSession).sessionToken;


            $ionicLoading.hide();
            //$rootScope.loginShow = false;
            $state.go('tabs.ventas');
          } else {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Ups!',
              template: $scope.loginInfo.errorDesc
            });
          }
        },
        function (response) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Ups!',
            template: 'Algo ha pasado, vuelve a intentar más tarde'
          });
        }
      );
    };
  });
});

app.controller('VentasCtrl', function($scope, $ionicNavBarDelegate, $ionicHistory, $ionicPlatform, $ionicPopup, $rootScope, apiConnection) {
  console.log('ventasctrl');
  $ionicNavBarDelegate.showBackButton(false);
  $ionicHistory.clearHistory();
  $ionicPlatform.registerBackButtonAction(function () {
    // A confirm dialog
    $scope.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Salir',
        template: '¿Desea salir de la aplicación?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          navigator.app.exitApp();
        } else {
          //cancel action
        }
      });
    };
  }, 100);
  apiConnection.getVentas($rootScope.userToken).query().$promise.then(
    function (response) {
      $rootScope.ventas = JSON.parse(JSON.stringify(response));
      console.log($rootScope.ventas);
    }
  );
});

app.controller('VentasEstadoCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal) {
  $ionicNavBarDelegate.showBackButton(true);
  console.log('ventasEstado');
  $scope.filtro = {
    estados: 'Todos',
    meses: 'Todos'
  };

  //Template del modal 1 (Ventas Estado)
  $ionicModal.fromTemplateUrl('templates/modal-ventas-estado.html',{
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal_1 = modal;
  });

  $scope.openModal = function(index) {
    if (index === 1){
      $scope.modal_1.show();
    }else{
      $scope.modal_2.show();
    }
  };

  $scope.closeModal = function(index) {
    if (index === 1){
      $scope.modal_1.hide();
    }else{
      $scope.modal_2.hide();
    }
  };
});

app.controller('VentasVisacionesCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.filtro = {
    visacion: 'Todos',
    meses: 'Todos'
  }
});

app.controller('VentasPermanenciaCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.filtro = {
    permanencias: 'Todos',
    meses: 'Todos'
  }
});

app.controller('VentasCobranzasCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal) {
  $ionicNavBarDelegate.showBackButton(true);

  //Template del modal 1 (Ventas Estado)
  $ionicModal.fromTemplateUrl('templates/modal-ventas-cobranzas.html',{
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal_1 = modal;
  });

  $scope.openModal = function(index) {
    if (index === 1){
      $scope.modal_1.show();
    }else{
      $scope.modal_2.show();
    }
  };

  $scope.closeModal = function(index) {
    if (index === 1){
      $scope.modal_1.hide();
    }else{
      $scope.modal_2.hide();
    }
  };
});

app.controller('VentasPendientesCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal) {
  $ionicNavBarDelegate.showBackButton(true);

  //Template del modal 1 (Ventas Estado)
  $ionicModal.fromTemplateUrl('templates/modal-ventas-pendiente.html',{
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal_1 = modal;
  });

  $scope.openModal = function(index) {
    if (index === 1){
      $scope.modal_1.show();
    }else{
      $scope.modal_2.show();
    }
  };

  $scope.closeModal = function(index) {
    if (index === 1){
      $scope.modal_1.hide();
    }else{
      $scope.modal_2.hide();
    }
  };
});

app.controller('MiCuadernoCtrl', function($scope, $ionicNavBarDelegate, $ionicHistory, $ionicPlatform, $ionicPopup) {
  console.log('micuadernoctrl');
  $ionicNavBarDelegate.showBackButton(false);
  $ionicHistory.clearHistory();
  $ionicPlatform.registerBackButtonAction(function () {
    // A confirm dialog
    $scope.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Salir',
        template: '¿Desea salir de la aplicación?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          navigator.app.exitApp();
        } else {
          //cancel action
        }
      });
    };
  }, 100)
});

app.controller('MiCuadernoDireccionesAsignadasCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.filtro = {
    comunas: 'Todos',
    nodos: 'Todos',
    cuadrantes: 'Todos',
    deudas: 'Todos'
  };

  //Template del modal 1 (Ventas Estado)
  $ionicModal.fromTemplateUrl('templates/modal-direcciones-asignadas.html',{
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal_1 = modal;
  });

  $scope.openModal = function(index) {
    if (index === 1){
      $scope.modal_1.show();
    }else{
      $scope.modal_2.show();
    }
  };

  $scope.closeModal = function(index) {
    if (index === 1){
      $scope.modal_1.hide();
    }else{
      $scope.modal_2.hide();
    }
  };
});

app.controller('MiCuadernoNuevoProspectoCtrl', function ($scope, $ionicNavBarDelegate) {
  $ionicNavBarDelegate.showBackButton(false);
  $scope.step = 'inicio';

  $scope.stepForward = function(nextStep, id){
    $scope.step = nextStep;
    console.log($scope.step);
  };

  $scope.cancel = function () {
    console.log('cancelando');
    $scope.step = 'inicio';
    window.history.back();
  };
});

app.controller('MiCuadernoHistorialCtrl', function ($scope, $ionicNavBarDelegate) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.filtro = {
    comunas: 'Todos',
    nodos: 'Todos',
    cuadrantes: 'Todos',
    deudas: 'Todos'
  }
});

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

app.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});

app.controller('MiCuadernoAccionesComercialesCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal) {

  console.log('MiCuadernoAccionesComercialesCtrl');

  $scope.ac = {
    accion: 'Seleccionar Acción',
    resultado: 'Seleccionar Resultado',
    observaciones: ''
  };

  $scope.cancel = function () {
    $scope.ac = {
      accion: 'Seleccionar Acción',
      resultado: 'Seleccionar Resultado',
      observaciones: ''
    };
    $scope.closeModal(1);
  };

  $ionicModal.fromTemplateUrl('templates/modal-nueva-ac.html',{
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal_1 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-edit-ac.html',{
    id: 2,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal_2 = modal;
  });

  $scope.openModal = function(index) {
    if (index === 1){
      $scope.modal_1.show();
    }else{
      $scope.modal_2.show();
    }
  };

  $scope.closeModal = function(index) {
    if (index === 1){
      $scope.modal_1.hide();
    }else{
      $scope.modal_2.hide();
    }
  };

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal_1.remove();
    $scope.modal_2.remove();
  });

  $scope.chooseModal= function (index, model){
    model = model || null;
    if (model !== null){
      $scope.model = {
        id: model.id,
        accion_id: model.tipo_accion_comercial_id,
        resultado: model.resultado,
        observacion: model.observacion
      };
      //console.log($scope.model);
    }else{
      // $scope.model = {
      //   accion_id: null,
      //   resultado: "",
      //   idVenta: idVenta,
      //   idCarga: idCarga,
      //   observacion : ""
      // };
    }
    $scope.openModal(index);
  };
});
