angular.module('evtManager.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.constant("apiURL","http://vendedores.xpass.cl/web/vendedors/")

.factory('apiConnection', function($resource, apiURL) {
  var apiConnection = {

    loginUser: function(username, password, deviceId, deviceModel) {
      var login = $resource(apiURL + "login", {username: username, pass: password, deviceId: deviceId, deviceModel: deviceModel}, {'query': {isArray: false}});
      return login;
    },

    getVentas: function (sessionToken) {
      return $resource(apiURL + "getVentas", {sessionToken: sessionToken});
    },

    getProspectos: function (sessionToken) {
      return $resource(apiURL + "getProspectos", {sessionToken: sessionToken});
    },

    getVendedor: function (sessionToken) {
      return $resource(apiURL + "getVendedor", {sessionToken: sessionToken});
    },

    saveAC: function (sessionToken, id_prospecto, accion_comercial) {
      return $resource(apiURL + "addAccionComercial", {api_token: sessionToken, id_prospecto :id_prospecto, accion_comercial: accion_comercial});
    },

    newProspecto: function (sessionToken, prospecto, accion_comercial) {
      return $resource(apiURL + "addAccionComercial", {api_token: sessionToken, prospecto :prospecto, accion_comercial: accion_comercial});
    },

    updateProspecto: function (sessionToken, prospecto, accion_comercial) {
      return $resource(apiURL + "addAccionComercial", {api_token: sessionToken, prospecto :prospecto, accion_comercial: accion_comercial});
    }



  };
  return apiConnection
});
