angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('DependenteService', ['$http', function($http){
  var svc = {};

      svc.getUsuario = function(cpfAdm, succescallback, errorCalback) {
        //console.log(cpf);
          // Simple GET request example:
          $http({
              method: 'GET',
              url: 'http://localhost:3000/dependente?cpf='+cpfAdm
          }).then(function successCallback(response) {
              succescallback(response.data);
          }, function errorCallback(response) {
              errorCalback(response);
          });
      }

      var dependenteSelecionado = {};

      svc.selecionaDependente = function(dependenteselecionado){
          dependenteSelecionado = dependenteselecionado;
          //console.log("Dependente Selecionado Service: "+dependenteSelecionado.nome);
      }

      svc.getDependenteSelecionado = function(){
            return dependenteSelecionado;

      }

      svc.bloqueiaCartao = function(statusCartao){

          $http({
              method: 'POST',
              url: 'http://localhost:3000/usuarios/bloqueiaCartao',
              data: {
                      status: statusCartao,
                      usuarioKey: Object.keys(usuarioSelecionado),
                      dependenteKey: Object.keys(dependenteSelecionado)
                    }

          }).then(function successCallback(response) {
              succescallback(response.data);
          }, function errorCallback(response) {
              errorCalback(response);
          });
      }

      return svc;

}])


.service('BlankService', [function(){

}]);
