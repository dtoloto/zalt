angular.module('app.controllers', [])

.controller('side-menu21Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('meusCartEsCtrl', ['$scope', '$stateParams', 'UsuarioService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UsuarioService, $state) {

      $scope.usuario = UsuarioService.getUsuarioSelecionado();
      //console.log($scope.usuario);
      $scope.dependentes = $scope.usuario.dependentes;
      //console.log("Dependentes: "+$scope.dependentes);

      $scope.selecionaDependente = function(dependente){


            //armazena na variavel declarada no Service o objeto produto
            UsuarioService.selecionaDependente(dependente);

            var dependenteSelecionado = UsuarioService.getDependenteSelecionado();
            //console.log("Service: "+dependenteSelecionado);
            //redireciona para a pagina detalhes com as respectivas informacoes do produto
            $state.go("tabsController.meuCartO");
            //console.log("state");
        }

}])

.controller('meusRecibosCtrl', ['$scope', '$stateParams', 'UsuarioService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UsuarioService) {

  $scope.usuario = UsuarioService.getUsuarioSelecionado();
  $scope.dependentes = $scope.usuario.dependentes;
  console.log("dependentes: "+$scope.dependentes);

  $scope.recibos=[];

  for(var i=0; i < $scope.dependentes.length; i++){
      $scope.dependente = $scope.dependentes[i];
      $scope.recibosProv = $scope.dependente.recibos;
      console.log("dependente: "+$scope.dependentes[i].nome);
      console.log("Recibos: "+$scope.dependente.recibos);

      for(var j=0; j < $scope.recibosProv.length; j++){
        console.log($scope.recibosProv[j].categoria);
        $scope.recibos.push($scope.recibosProv[j]);
      }

  }

}])

.controller('minhasFaturasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('meuCartOCtrl', ['$scope', '$stateParams', 'UsuarioService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UsuarioService, $state) {

          $scope.usuario = UsuarioService.getUsuarioSelecionado();
          $scope.limiteUsuario = $scope.usuario.limite;
          $scope.vetorDependentes = $scope.usuario.dependentes;
          $scope.quantidadeDependentes = $scope.vetorDependentes.length;
          //console.log("Limite Usuario: "+$scope.limiteUsuario);
          //console.log("Qtd Dependentes: "+$scope.quantidadeDependentes);

          $scope.dependente = UsuarioService.getDependenteSelecionado();
          //console.log($scope.dependente.nome);
          $scope.controleSemanal = $scope.dependente.limite/4;
          $scope.controleDiario = $scope.dependente.limite/30;

          $scope.atualizaControle = function(){
            $scope.controleSemanal = $scope.dependente.limite/4;
            $scope.controleDiario = $scope.dependente.limite/30;
          }

          $scope.bloquearCartao = function(){
            //console.log("Status Cartao: "+$scope.dependente.statusCartao);
            $scope.dependente.statusCartao = !$scope.dependente.statusCartao;
            console.log($scope.dependente.statusCartao);

            UsuarioService.bloqueiaCartao($scope.dependente.statusCartao);


            var status;
            if($scope.dependente.statusCartao == false){
              status = "bloqueado";
            } else {
              status = "desbloqueado";
            }
            alert("O cartão foi "+status);
          }

}])

.controller('estabelecimentosCtrl', ['$scope', '$stateParams', 'UsuarioService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UsuarioService) {

      $scope.dependente = UsuarioService.getDependenteSelecionado();
      $scope.estabelecimentos = $scope.dependente.estabelecimentos;
      console.log($scope.estabelecimentos);
}])

.controller('faturaCtrl', ['$scope', '$stateParams', 'UsuarioService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UsuarioService) {



}])

.controller('autenticacaoCtrl', ['$scope', '$stateParams', 'UsuarioService', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UsuarioService, $state) {

  $scope.login = function(cpf, senha){

      // UsuarioService.getUsuarios(function(dados) {
      //     $scope.usuarios = dados;
      //     console.log($scope.usuarios);
      // });

      UsuarioService.getUsuario(cpf, function(dados) {
        //$scope.usuarios = dados;
        var keys = Object.keys(dados);
        console.log(keys[0]);
        $scope.usuario = dados[keys[0]];

            if (cpf==$scope.usuario.cpf && senha==$scope.usuario.senha) {
                console.log("Usuario Existente: "+ $scope.usuario);
                UsuarioService.selecionaUsuario($scope.usuario);
                $state.go("tabsController.meusRecibos");

            } else{
              $scope.erro = true;
            }



      });

      $scope.erro = false;
  }


}])

.controller('recibosCtrl', ['$scope', '$stateParams', 'UsuarioService',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, UsuarioService) {

      $scope.dependente = UsuarioService.getDependenteSelecionado();
      $scope.recibos = $scope.dependente.recibos;
}])
