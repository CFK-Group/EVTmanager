'use.strict';

var app = angular.module('evtManager.controllers', []);

app.controller('LoginCtrl', function ($scope, $ionicPlatform, $cordovaDevice, $rootScope, $ionicPopup, $ionicLoading, $state, apiConnection) {
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

    //-------------------------------------------------------------------

    // $scope.checkAvailability = function(){
    //   cordova.plugins.diagnostic.isGpsLocationAvailable(function(available){
    //     console.log("GPS está " + (available ? "activado" : "desactivado"));
    //     if(!available){
    //       $scope.checkAuthorization();
    //     }else{
    //       console.log("GPS listo para usar");
    //       $scope.login();
    //     }
    //   }, function(error){
    //     console.error("Ocurrió el siguiente error: "+error);
    //   });
    // };
    //
    // $scope.checkAuthorization = function(){
    //   cordova.plugins.diagnostic.isLocationAuthorized(function(authorized){
    //     console.log("Localización está " + (authorized ? "autorizada" : "desautorizada"));
    //     if(authorized){
    //       $scope.checkDeviceSetting();
    //     }else{
    //       cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
    //         switch(status){
    //           case cordova.plugins.diagnostic.permissionStatus.GRANTED:
    //             console.log("Permiso garantizado");
    //             $scope.checkDeviceSetting();
    //             break;
    //           case cordova.plugins.diagnostic.permissionStatus.DENIED:
    //             console.log("Permiso denegado");
    //             // User denied permission
    //             break;
    //           case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
    //             console.log("Permiso permanentemente denegado");
    //             // User denied permission permanently
    //             break;
    //         }
    //       }, function(error){
    //         console.error(error);
    //       });
    //     }
    //   }, function(error){
    //     console.error("Ocurrió el siguiente error: "+error);
    //   });
    // };
    //
    // $scope.checkDeviceSetting = function(){
    //   cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
    //     console.log("GPS está " + (enabled ? "activado" : "desactivado"));
    //     if(!enabled){
    //       cordova.plugins.locationAccuracy.request(function (success){
    //         console.log("Se solicitó con éxito el modo de ubicación de alta precisión: "+success.message);
    //       }, function onRequestFailure(error){
    //         console.error("Error de solicitud de precisión: código de error="+error.code+"; mensaje de error="+error.message);
    //         if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
    //           if(confirm('Error al establecer automáticamente el Modo de ubicación en "Alta precisión". ¿Desea cambiar a la página Configuración de ubicación y hacer esto manualmente?')){
    //             cordova.plugins.diagnostic.switchToLocationSettings();
    //           }
    //         }
    //       }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    //     }
    //   }, function(error){
    //     console.error("Se produjo el siguiente error: "+error);
    //   });
    // };
    //
    // $scope.checkAvailability(); // start the check

    //-------------------------------------------------------------------

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

            $rootScope.updateGeoPos('login');

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
        function (err) {
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

  $rootScope.updateGeoPos('Consulta ventas por estado');

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

app.controller('VentasVisacionesCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal, $rootScope) {
  $ionicNavBarDelegate.showBackButton(true);

  $rootScope.updateGeoPos('Consulta ventas por visacion');

  $ionicModal.fromTemplateUrl('templates/modal-ventas-visaciones.html',{
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

app.controller('VentasPermanenciaCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal, $rootScope) {
  $ionicNavBarDelegate.showBackButton(true);

  $rootScope.updateGeoPos('Consulta ventas por permanencia');

  $ionicModal.fromTemplateUrl('templates/modal-ventas-permanencia.html',{
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

app.controller('VentasCobranzasCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal, $rootScope) {
  $ionicNavBarDelegate.showBackButton(true);

  $rootScope.updateGeoPos('Consulta ventas por cobranza');

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

app.controller('VentasPendientesCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal, $rootScope) {
  $ionicNavBarDelegate.showBackButton(true);

  $rootScope.updateGeoPos('Consulta ventas por pendiente comercial');

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

app.controller('MiCuadernoDireccionesAsignadasCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal, $rootScope, apiConnection, $ionicLoading, $ionicPopup) {
  $ionicNavBarDelegate.showBackButton(true);

  $rootScope.updateGeoPos('consulta direciones asignadas');

  $scope.prospecto = {
    tipo_tv: 'NINGUNO',
    tipo_fono: 'NINGUNO',
    tipo_inet: 'NINGUNO',
    empresaServicios: 'NINGUNO',
    productosContratados: 'NINGUNO',
    tienePromocion: 'No sabe/No contesta',
    accionComercial: '',
    email: '',
    nombre: '',
    nombre_comprador: '',
    calle: '',
    comuna:'',
    numero: '',
    accioncomercial: ''
  };

  $rootScope.prospectosDirAsig = $rootScope.prospectos.filter(function (element) {
    return element.tipo_contacto !== 'Toca puerta y si hizo contacto'
  });

  $rootScope.prospectosDirAsig = $rootScope.prospectosDirAsig.filter(function (element) {
    return element.tipo_contacto !== 'Toca puerta y SI hizo contacto'
  });

  $scope.step = 'inicio';

  $scope.stepForward = function(nextStep){
    $scope.step = nextStep;
  };

  $scope.stepForward = function(nextStep, tipo_contacto){
    $scope.cambiarTipoContacto(tipo_contacto);
    $scope.step = nextStep;
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
      $scope.prospecto.rut_comprador = ($scope.prospecto.rut_comprador !== null) ? $scope.prospecto.rut_comprador+$scope.prospecto.dv_comprador:'';
      if($scope.prospecto.nombre_comprador == null){
        $scope.prospecto.nombre_comprador = '';
      }else if($scope.prospecto.email == null){
        $scope.prospecto.email = '';
      }else if($scope.prospecto.accionComercial == null || $scope.prospecto.accionComercial == undefined){
        $scope.prospecto.accionComercial = '';
      }
    }else{
      $scope.modal_2.show();
    }
  };

  $scope.cancel = function () {
    $scope.closeModal(1);
  };

  $scope.closeModal = function(index) {
    if (index === 1){
      $scope.prospecto.rut_comprador = ($scope.prospecto.rut_comprador !== null) ? $scope.prospecto.rut_comprador.toString().slice(0, $scope.prospecto.rut_comprador.length-1):'';
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

  $scope.cambiarTipoContacto = function (tipo_contacto) {
    if(tipo_contacto === 'final'){
      $scope.prospecto.tipo_contacto = 'No toca puerta y deja volante'
    }else if(tipo_contacto === '2'){
      $scope.prospecto.tipo_contacto = 'No toca puerta y NO deja volante'
    }else if(tipo_contacto === '3'){
      $scope.prospecto.tipo_contacto = 'Toca puerta y NO hizo contacto'
    }else if(tipo_contacto === 'finalCompleto'){
      $scope.prospecto.tipo_contacto = 'Toca puerta y SI hizo contacto'
    }
    return $scope.prospecto.tipo_contacto
  };

  $scope.actualizarProspecto = function () {
    $ionicLoading.show({
      template: 'Actualizando datos...',
      animation: 'fade-in',
      showBackdrop: true
    });

    var rutProspecto = ($scope.prospecto.rut_prospecto !== undefined && $scope.prospecto.rut_prospecto !== null) ? $scope.prospecto.rut_prospecto.toString().slice(0, $scope.prospecto.rut_prospecto.length - 1):null;
    var rutComprador = ($scope.prospecto.rut_comprador !== undefined && $scope.prospecto.rut_comprador !== null) ? $scope.prospecto.rut_comprador.toString().slice(0, $scope.prospecto.rut_comprador.length - 1):null;
    var dvProspecto = (rutProspecto !== null) ? $scope.prospecto.rut_prospecto.toString().slice(-1):null;
    var dvComprador = (rutComprador !== null) ? $scope.prospecto.rut_comprador.toString().slice(-1):null;
    var prospectoActualizado = {
      'id' : $scope.prospecto.id,
      'nombre': $scope.prospecto.nombre,
      'rut_prospecto': rutProspecto,
      'dv_prospecto': dvProspecto,
      'rut_comprador': rutComprador,
      'dv_comprador': dvComprador,
      'calle': $scope.prospecto.calle,
      'numero': $scope.prospecto.numero,
      'comuna' : $scope.prospecto.comuna,
      'nodo': $scope.prospecto.nodo,
      'cuadrante': $scope.prospecto.cuadrante,
      'fono' : $scope.prospecto.fono,
      'cable': $scope.prospecto.cable,
      'inet': $scope.prospecto.inet,
      'premium': $scope.prospecto.premium,
      'deuda': $scope.prospecto.deuda,
      'nombre_comprador': $scope.prospecto.nombre_comprador,
      'fono_contacto_1': $scope.prospecto.fono_contacto_1,
      'fono_contacto_2': $scope.prospecto.fono_contacto_2,
      'email': $scope.prospecto.email,
      'tipo_tv': $scope.prospecto.tipo_tv,
      'tipo_fono': $scope.prospecto.tipo_fono,
      'tipo_inet': $scope.prospecto.tipo_inet,
      'accion_comercial': $scope.prospecto.accionComercial,
      'tipo_creacion': $scope.prospecto.tipo_creacion,
      'tipo_accion': $scope.prospecto.tipo_accion,
      'tipo_contacto': $scope.prospecto.tipo_contacto,
      'tienePromocion': $scope.prospecto.tienePromocion,
      'productosContratados': $scope.prospecto.productosContratados,
      'empresaServicios': $scope.prospecto.empresaServicios
    };
    var data = {
      token: sessionStorage.userToken,
      prospecto: prospectoActualizado,
      accionComercial: $scope.prospecto.accionComercial
    };
    console.table(data.prospecto);
    apiConnection.updateProspecto().save(data).$promise.then(
      function (response) {
      $rootScope.updateGeoPos('Actualiza prospecto ' + response.id);
      console.log($rootScope.prospectosDirAsig.indexOf($scope.prospecto));
      $rootScope.prospectosDirAsig.splice($rootScope.prospectosDirAsig.indexOf($scope.prospecto), 1);
      $ionicLoading.hide();
      var alert = $ionicPopup.alert({
        title: 'Actualizado',
        template: 'Prospecto actualizado correctamente'
      });
      alert.then(function () {
        $scope.closeModal(1);
      });
      console.table(response);
    }, function (err) {
      console.log("ERROR: ", err);
      $ionicLoading.hide();
      var alert = $ionicPopup.alert({
        title: 'Ups!',
        template: 'Algo ha pasado, intenta de nuevo más tarde.'
      });
    });
  };
});

app.controller('MiCuadernoNuevoProspectoCtrl', function ($rootScope, $state, $scope, $ionicNavBarDelegate, apiConnection, $ionicLoading, $ionicPopup) {
  $ionicNavBarDelegate.showBackButton(false);
  $scope.step = 'inicio';

  $scope.prospecto = {
    tipo_tv: 'NINGUNO',
    tipo_fono: 'NINGUNO',
    tipo_inet: 'NINGUNO',
    empresaServicios: 'NINGUNO',
    productosContratados: 'NINGUNO',
    tienePromocion: 'No sabe/No contesta',
    accionComercial: '',
    email: '',
    nombre: '',
    calle: '',
    comuna:'',
    numero: ''
  };

  $scope.stepForward = function(nextStep){
    $scope.cambiarTipoContacto(nextStep);
    $scope.step = nextStep;
  };

  $scope.cambiarTipoContacto = function (tipo_contacto) {
    if(tipo_contacto === 'final'){
      $scope.prospecto.tipo_contacto = 'No toca puerta y deja volante'
    }else if(tipo_contacto === '2'){
      $scope.prospecto.tipo_contacto = 'No toca puerta y NO deja volante'
    }else if(tipo_contacto === '3'){
      $scope.prospecto.tipo_contacto = 'Toca puerta y NO hizo contacto'
    }else if(tipo_contacto === 'finalCompleto'){
      $scope.prospecto.tipo_contacto = 'Toca puerta y SI hizo contacto'
    }
    return $scope.prospecto.tipo_contacto
  };

  $scope.enviarProspecto = function () {

    var rutProspecto = ($scope.prospecto.rut_prospecto !== undefined) ? $scope.prospecto.rut_prospecto.toString().slice(0, $scope.prospecto.rut_prospecto.length - 1):null;
    var rutComprador = ($scope.prospecto.rut_comprador !== undefined) ? $scope.prospecto.rut_comprador.toString().slice(0, $scope.prospecto.rut_comprador.length - 1):null;
    var dvProspecto = (rutProspecto !== null) ? $scope.prospecto.rut_prospecto.toString().slice(-1):null;
    var dvComprador = (rutComprador !== null) ? $scope.prospecto.rut_comprador.toString().slice(-1):null;
    var nuevoProspecto = {
      'id' : $scope.prospecto.id,
      'nombre': $scope.prospecto.nombre,
      'rut_prospecto': rutProspecto,
      'dv_prospecto': dvProspecto,
      'rut_comprador': rutComprador,
      'dv_comprador': dvComprador,
      'calle': $scope.prospecto.calle,
      'numero': $scope.prospecto.numero,
      'comuna' : $scope.prospecto.comuna,
      'nodo': $scope.prospecto.nodo,
      'cuadrante': $scope.prospecto.cuadrante,
      'fono' : $scope.prospecto.fono,
      'cable': $scope.prospecto.cable,
      'inet': $scope.prospecto.inet,
      'premium': $scope.prospecto.premium,
      'deuda': $scope.prospecto.deuda,
      'nombre_comprador': $scope.prospecto.nombre_comprador,
      'fono_contacto_1': $scope.prospecto.fono_contacto_1,
      'fono_contacto_2': $scope.prospecto.fono_contacto_2,
      'email': $scope.prospecto.email,
      'tipo_tv': $scope.prospecto.tipo_tv,
      'tipo_fono': $scope.prospecto.tipo_fono,
      'tipo_inet': $scope.prospecto.tipo_inet,
      'accion_comercial': $scope.prospecto.accionComercial,
      'tipo_creacion': $scope.prospecto.tipo_creacion,
      'tipo_accion': $scope.prospecto.tipo_accion,
      'tipo_contacto': $scope.prospecto.tipo_contacto,
      'tienePromocion': $scope.prospecto.tienePromocion,
      'productosContratados': $scope.prospecto.productosContratados,
      'empresaServicios': $scope.prospecto.empresaServicios
    };
    var data = {
      token: sessionStorage.userToken,
      prospecto: nuevoProspecto,
      accionComercial: $scope.prospecto.accionComercial
    };
    apiConnection.newProspecto().save(data).$promise.then(
      function (response) {
        $ionicLoading.hide();
        console.table(data.prospecto);
        $rootScope.updateGeoPos('Nuevo prospecto ' + response.id);
        console.log(response.id);
        var alert = $ionicPopup.alert({
          title: 'Guardado',
          template: 'Prospecto guardado correctamente'
        });
        alert.then(function () {
          apiConnection.getProspectos(sessionStorage.userToken).query().$promise.then(
            function (response) {
              $rootScope.prospectos = JSON.parse(JSON.stringify(response));
              $rootScope.updateGeoPos('nuevo prospecto');
            }, function (err) {
              $ionicLoading.hide();
              $ionicPopup.alert({
                title: 'Ups!',
                template: 'Algo ha pasado, intente cargar prospectos de forma manual.'
              });
            }
          );
        });
        console.table(response);
        $state.go('tabs.cuaderno');
      },
      function (err) {
        console.log("ERROR: ", err);
        $ionicLoading.hide();
        var alert = $ionicPopup.alert({
          title: 'Ups!',
          template: 'Algo ha pasado, intente de nuevo.'
        });
      }
    );
  };

  $scope.cancel = function () {
    console.log('cancelando');
    $scope.step = 'inicio';
    window.history.back();
    $scope.prospecto = {
      tipo_tv: 'NINGUNO',
      tipo_fono: 'NINGUNO',
      tipo_inet: 'NINGUNO',
      empresaServicios: 'NINGUNO',
      productosContratados: 'NINGUNO',
      tienePromocion: 'No sabe/No contesta',
      accionComercial: '',
      email: '',
      nombre: '',
      calle: '',
      comuna:'',
      numero: ''
    };
  };

  $scope.actualizarAccion = function() {
    $ionicLoading.show({
      template: 'Guardando acción...',
      animation: 'fade-in',
      showBackdrop: true
    });
    var data = {
      idProspecto: $scope.prospecto.id,
      token: sessionStorage.userToken,
      tipo_contacto: $scope.prospecto.tipo_contacto,
      tipo_accion: $scope.prospecto.tipo_accion
    };
    apiConnection.changeAction().save(data).$promise.then(
      function (response) {
        $ionicLoading.hide();
        var alert = $ionicPopup.alert({
          title: 'Guardado',
          template: 'Acción guardada correctamente'
        });
        alert.then(function () {
          $state.go('tabs.cuaderno');
        });
        console.log(response);
      },
      function (err) {
        console.log("ERROR: ", err);
        $ionicLoading.hide();
        var alert = $ionicPopup.alert({
          title: 'Ups!',
          template: 'Algo ha pasado, intenta de nuevo más tarde.'
        });
      }
    )
  }
});

app.controller('MiCuadernoHistorialCtrl', function ($scope, $ionicNavBarDelegate, $ionicModal, apiConnection, $ionicPopup, $ionicLoading, $rootScope) {
  $ionicNavBarDelegate.showBackButton(true);
  $scope.ac = {};
  $scope.guardarAC = function (ac) {
    console.log($scope.prospecto.id);
    var params = {
        accionComercial: ac.accion,
        idProspecto: $scope.prospecto.id,
        token: sessionStorage.userToken
    };
    console.log(params);
    apiConnection.saveAC().save(params).$promise.then(
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
          console.log('push de la accion comercial: ' + ac);
          $scope.closeModal(2);
          $scope.closeModal(3);
          $scope.ac = {};
          console.log('limpiando accion comercial');
        });
        console.log(response);
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

  $rootScope.updateGeoPos('consulta de historial');

  $scope.prospecto = {
    tipo_tv: 'NINGUNO',
    tipo_fono: 'NINGUNO',
    tipo_inet: 'NINGUNO',
    empresaServicios: 'NINGUNO',
    productosContratados: 'NINGUNO',
    tienePromocion: 'No sabe/No contesta',
    accionComercial: '',
    email: '',
    nombre: '',
    calle: '',
    comuna:'',
    numero: ''
  };

  $scope.actualizarProspecto = function () {
    $ionicLoading.show({
      template: 'Actualizando prospecto...',
      animation: 'fade-in',
      showBackdrop: true
    });
    let rutComprador = ($scope.prospecto.rut_comprador !== null) ? $scope.prospecto.rut_comprador.toString().slice(0, $scope.prospecto.rut_comprador.length - 1):'';
    let rutProspecto = ($scope.prospecto.rut_prospecto !== null) ? $scope.prospecto.rut_prospecto.toString().slice(0, $scope.prospecto.rut_prospecto.length - 1):'';
    let dvProspecto = ($scope.prospecto.dv_prospecto !== null && $scope.prospecto.rut_prospecto !== null) ? $scope.prospecto.rut_prospecto.toString().slice(-1):'';
    let dvComprador = ($scope.prospecto.dv_comprador !== null && $scope.prospecto.rut_comprador !== null) ? $scope.prospecto.rut_comprador.toString().slice(-1):'';
    dvComprador = (dvComprador === 'k') ? 'k':dvComprador;
    let prospectoActualizado = {
      'id' : $scope.prospecto.id,
      'nombre': $scope.prospecto.nombre,
      'rut_prospecto': rutProspecto,
      'dv_prospecto': dvProspecto,
      'rut_comprador': rutComprador,
      'dv_comprador': dvComprador,
      'calle': $scope.prospecto.calle,
      'numero': $scope.prospecto.numero,
      'comuna' : $scope.prospecto.comuna,
      'nodo': $scope.prospecto.nodo,
      'cuadrante': $scope.prospecto.cuadrante,
      'fono' : $scope.prospecto.fono,
      'cable': $scope.prospecto.cable,
      'inet': $scope.prospecto.inet,
      'premium': $scope.prospecto.premium,
      'deuda': $scope.prospecto.deuda,
      'nombre_comprador': $scope.prospecto.nombre_comprador,
      'fono_contacto_1': $scope.prospecto.fono_contacto_1,
      'fono_contacto_2': $scope.prospecto.fono_contacto_2,
      'email': $scope.prospecto.email,
      'tipo_tv': $scope.prospecto.tipo_tv,
      'tipo_fono': $scope.prospecto.tipo_fono,
      'tipo_inet': $scope.prospecto.tipo_inet,
      'accion_comercial': $scope.prospecto.accionComercial,
      'tipo_creacion': $scope.prospecto.tipo_creacion,
      'tipo_accion': $scope.prospecto.tipo_accion,
      'tipo_contacto': $scope.prospecto.tipo_contacto,
      'tienePromocion': $scope.prospecto.tienePromocion,
      'productosContratados': $scope.prospecto.productosContratados,
      'empresaServicios': $scope.prospecto.empresaServicios
    };
    let data = {
      token: sessionStorage.userToken,
      prospecto: prospectoActualizado,
      accionComercial: $scope.prospecto.accionComercial
    };
    console.log(data);
    apiConnection.updateProspecto().save(data).$promise.then(
      function (response) {
        $rootScope.updateGeoPos('Actualiza prospecto ' + response.id);
        $ionicLoading.hide();
        let alert = $ionicPopup.alert({
          title: 'Actualizado',
          template: 'Prospecto actualizado correctamente'
        });
        alert.then(function () {
          $scope.closeModal(4);
        });
        console.log(response);
      }, function (err) {
        console.log("ERROR: ", err);
        $ionicLoading.hide();
        let alert = $ionicPopup.alert({
          title: 'Ups!',
          template: 'Algo ha pasado, intenta de nuevo más tarde.'
        });
      });
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

  $ionicModal.fromTemplateUrl('templates/modal-detalle-historial.html',{
    id: 4,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal_4 = modal;
  });

  $scope.openModal = function(index) {
    if (index === 1){
      $scope.modal_1.show();
    }else if(index === 2){
      $scope.modal_2.show();
    }else if(index === 3){
      $scope.modal_3.show();
    }else {
      $scope.modal_4.show();
      $scope.prospecto.rut_comprador = ($scope.prospecto.rut_comprador !== null) ? $scope.prospecto.rut_comprador+$scope.prospecto.dv_comprador:'';
      $scope.prospecto.dv_comprador = ($scope.prospecto.dv_comprador !== null) ? $scope.prospecto.dv_comprador: '';
    }
  };

  $scope.closeModal = function(index) {
    if (index === 1){
      $scope.modal_1.hide();
      $scope.step = 'inicio';
    }else if(index === 2){
      $scope.modal_2.hide();
    }else if(index === 3){
      $scope.modal_3.hide();
    }else {
      $scope.modal_4.hide();
      $scope.prospecto.rut_comprador = ($scope.prospecto.rut_comprador !== null) ? $scope.prospecto.rut_comprador.toString().slice(0, $scope.prospecto.rut_comprador.length-1):null;
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

  $scope.actualizarAccion = function() {
    $ionicLoading.show({
      template: 'Guardando acción...',
      animation: 'fade-in',
      showBackdrop: true
    });
    var data = {
      idProspecto: $scope.prospecto.id,
      token: sessionStorage.userToken,
      tipo_contacto: $scope.prospecto.tipo_contacto,
      tipo_accion: $scope.prospecto.tipo_accion
    };
    apiConnection.changeAction().save(data).$promise.then(
      function (response) {
        $rootScope.updateGeoPos('Nueva acción ' + response.id);
        $ionicLoading.hide();
        var alert = $ionicPopup.alert({
          title: 'Guardado',
          template: 'Acción guardada correctamente'
        });
        alert.then(function () {
          $scope.closeModal(1);
        });
        console.log(response);
      },
      function (err) {
        console.log("ERROR: ", err);
        $ionicLoading.hide();
        var alert = $ionicPopup.alert({
          title: 'Ups!',
          template: 'Algo ha pasado, intenta de nuevo más tarde.'
        });
      }
    )
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

app.controller('LoadingProspectosCtrl', function ($state, apiConnection, $rootScope, $ionicPopup, $ionicNavBarDelegate) {
  $ionicNavBarDelegate.showBackButton(false);
  apiConnection.getProspectos(sessionStorage.userToken).query().$promise.then(
    function (response) {
      $rootScope.prospectos = JSON.parse(JSON.stringify(response));
      console.log($rootScope.prospectos);
      $state.go('tabs.cuaderno');
    }, function (err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Ups!',
        template: 'Algo ha pasado, intente cargar prospectos de forma manual.'
      });
      $state.go('tabs.cuaderno');
    }
  );
});

app.controller('LoadingVentasCtrl', function ($state, apiConnection, $rootScope, $ionicPopup, $ionicNavBarDelegate) {
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
