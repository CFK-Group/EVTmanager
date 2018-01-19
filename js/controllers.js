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

            sessionStorage.userToken = JSON.parse(sessionStorage.userSession).sessionToken;

            console.log('token al loggear: ' + sessionStorage.userToken);

            $ionicLoading.hide();
            //$rootScope.loginShow = false;
            $state.go('loading.ventas');
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
            template: 'Algo ha pasado, revisa la conexión a internet.'
          });
        }
      );
    };
  });
});

app.controller('VentasCtrl', function($scope, $ionicNavBarDelegate, $ionicHistory, $ionicPlatform, $ionicPopup, $rootScope, apiConnection, $ionicLoading) {
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
});

app.controller('VentasEstadoCtrl', function ($scope, $ionicPopup, $ionicNavBarDelegate, $ionicModal, apiConnection, $ionicLoading, $rootScope) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.filtro = {
    meses: ''
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

  $scope.chooseModal = function (index, venta){
    venta = venta || null;
    if (venta !== null){
      $scope.venta = venta;
    }else{
      $scope.venta = venta;
    }
    $scope.openModal(index);
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

  $scope.chooseModal = function (index, venta){
    venta = venta || null;
    if (venta !== null){
      $scope.venta = venta;
    }else{
      $scope.venta = venta;
    }
    $scope.openModal(index);
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

app.controller('MiCuadernoCtrl', function($scope, $rootScope, $ionicNavBarDelegate, $ionicHistory, $ionicPlatform, $ionicPopup, apiConnection, $ionicLoading) {
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
});

app.controller('MiCuadernoDireccionesAsignadasCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal, $rootScope) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.filtro = {
    comunas: 'Todos',
    nodos: 'Todos',
    cuadrantes: 'Todos',
    deudas: 'Todos'
  };

  $rootScope.prospectosDirAsig = $rootScope.prospectos.filter(function (element) {
    return element.tipo_contacto !== 'Toca puerta y si hizo contacto'
  });

  $scope.step = 'inicio';

  $scope.stepForward = function(nextStep, id){
    $scope.step = nextStep;
    console.log($scope.step);
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
      $scope.step = 'inicio';
    }else{
      $scope.modal_2.hide();
    }
  };

  $scope.chooseModal = function (index, prospecto){
    prospecto = prospecto || null;
    if (prospecto !== null){
      $scope.prospecto = prospecto;
    }else{
      $scope.prospecto = prospecto;
    }
    $scope.openModal(index);
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

app.controller('MiCuadernoHistorialCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal, apiConnection, $ionicPopup, $ionicLoading) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.guardar = function (ac) {
    console.log($scope.prospecto.id);
    apiConnection.saveAC().save({token: sessionStorage.userToken, idProspecto: $scope.prospecto.id, accionComercial: ac.accion}).$promise.then(
      function (response) {
        $ionicLoading.hide();
        var alert = $ionicPopup.alert({
          title: 'Guardado',
          template: 'Accion añadida correctamente'
        });
        alert.then(function () {
          var fecha = Math.round((new Date()).getTime() / 1000);
          ac.timestamp = fecha;
          $scope.prospecto.accion_comercial.push(ac);
          $scope.closeModal(2);
          $scope.closeModal(3);
          $scope.ac = {
            accion: ''
          };
        });
      },
      function (err) {
        console.log("ERROR: ", err);
        $ionicLoading.hide();
        var alert = $ionicPopup.alert({
          title: 'Ups!',
          template: 'Algo ha pasado, intenta de nuevo más tarde.'
        });
      }
    );
  };

  $scope.cancel = function () {
    $scope.ac = {
      accion: ''
    };
    $scope.closeModal(2);
  };

  $ionicModal.fromTemplateUrl('templates/modal-acciones-comerciales.html',{
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal_1 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-nueva-ac.html',{
    id: 2,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal_2 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-edit-ac.html',{
    id: 3,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal_3 = modal;
  });

  $scope.openModal = function(index) {
    if (index === 1){
      $scope.modal_1.show();
    }else if(index === 2){
      $scope.modal_2.show();
    }else {
      $scope.modal_3.show();
    }
  };

  $scope.closeModal = function(index) {
    if (index === 1){
      $scope.modal_1.hide();
      $scope.step = 'inicio';
    }else if(index === 2){
      $scope.modal_2.hide();
    }else {
      $scope.modal_3.hide();
    }
  };

  $scope.chooseModal = function (index, prospecto){
    prospecto = prospecto || null;
    if (prospecto !== null){
      $scope.prospecto = prospecto;
    }else{
      $scope.prospecto = prospecto;
    }
    $scope.openModal(index);
  };
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

app.controller('LoadingProspectosCtrl', function ($state, apiConnection, $rootScope, $ionicPopup, $ionicNavBarDelegate) {
  console.log('LoadingProspectosCtrl');
  $ionicNavBarDelegate.showBackButton(false);
  apiConnection.getProspectos(sessionStorage.userToken).query().$promise.then(
    function (response) {
      $rootScope.prospectos = JSON.parse(JSON.stringify(response));
      console.log($rootScope.prospectos);
      $state.go('tabs.ventas');
    }, function (err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Ups!',
        template: 'Algo ha pasado, intente cargar prospectos de forma manual.'
      });
      $state.go('tabs.ventas');
    }
  );
});

app.controller('LoadingVentasCtrl', function ($state, apiConnection, $rootScope, $ionicPopup, $ionicNavBarDelegate) {
  console.log('LoadingVentasCtrl');
  $ionicNavBarDelegate.showBackButton(false);
  apiConnection.getVentas(sessionStorage.userToken).query().$promise.then(
    function (response) {
      $rootScope.ventas = JSON.parse(JSON.stringify(response));
      $state.go('loading.prospectos');
    }, function (err) {
      $ionicPopup.alert({
        title: 'Ups!',
        template: 'Algo ha pasado, intente cargar ventas de forma manual.'
      });
      $state.go('loading.prospectos');
    }
  );
});
