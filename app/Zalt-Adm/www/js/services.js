angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('UsuarioService', ['$http', function($http){
  var svc = {};

          svc.getUsuarios = function(succescallback, errorCalback) {
              // Simple GET request example:
              $http({
                  method: 'GET',
                  url: 'http://localhost:3000/usuarios'
              }).then(function successCallback(response) {
                  succescallback(response.data);
              }, function errorCallback(response) {
                  errorCalback(response);
              });
          }

          svc.getUsuario = function(cpf, succescallback, errorCalback) {
            console.log(cpf);
              // Simple GET request example:
              $http({
                  method: 'GET',
                  url: 'http://localhost:3000/usuarios?cpf='+cpf
              }).then(function successCallback(response) {
                  succescallback(response.data);
              }, function errorCallback(response) {
                  errorCalback(response);
              });
          }

          //função para cadastrar uma nova universidade
          svc.addUsuarios = function(nome, senha, cpf, email, id, limite, dependentes){
              servicos.push({
                nome: nome,
                senha: senha,
                cpf: cpf,
                email: email,
                id: id,
                limite: limite,
                dependentes: dependentes
              })

          }


          var usuarioSelecionado = {};
          //var usuarioSelecionado = usuarios[0];

          //função para selecionar uma universidade e ver seus alunos
          svc.selecionaUsuario = function(usuarioselecionado){
              //usuarioSelecionado = usuarioselecionado;
              usuarioSelecionado = usuarioselecionado;
              console.log(usuarioSelecionado);
              //console.log("Usuario: "+usuarioSelecionado.nome);
          }

          svc.getUsuarioSelecionado = function(){
              return usuarioSelecionado;

          }

          var dependenteSelecionado = {};

          svc.selecionaDependente = function(dependenteselecionado){
              dependenteSelecionado = dependenteselecionado;
              //console.log("Dependente: "+dependenteSelecionado.nome);
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
