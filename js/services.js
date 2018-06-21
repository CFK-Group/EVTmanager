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

.constant("apiURL","http://insert.xpass.cl/web/vendedors/")

.constant("apiGobURL","https://apis.modernizacion.cl/dpa/regiones/")

.factory('apiConnection', function($resource, apiURL) {
  var apiConnection = {

    loginUser: function(username, password, deviceId, deviceModel) {
     return $resource(apiURL + "login", {username: username, pass: password, deviceId: deviceId, deviceModel: deviceModel}, {'query': {isArray: false}});
    },

    getVentas: function (sessionToken) {
      return $resource(apiURL + "getVentas", {sessionToken: sessionToken}, {'query': {isArray: false}});
    },

    getProspectos: function (sessionToken) {
      return $resource(apiURL + "getProspectos", {sessionToken: sessionToken});
    },

    getVendedor: function (sessionToken) {
      return $resource(apiURL + "getVendedor", {sessionToken: sessionToken});
    },

    saveAC: function () {
      return $resource(apiURL + "addAccionComercial2");
    },

    newProspecto: function () {
      return $resource(apiURL + "createProspecto2");
    },

    updateProspecto: function () {
      return $resource(apiURL + "updateProspecto2");
    },

    changeAction: function () {
      return $resource(apiURL + "changeAction2");
    },

    sendGeoPos: function () {
      return $resource(apiURL + 'pingLoc2')
    }
  };
  return apiConnection
})

;
