angular.module('app.controllers', [])

.controller('menuCtrl', ['$scope', '$stateParams', 'DependenteService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, DependenteService, $state) {

  $scope.dependente = DependenteService.getDependenteSelecionado();
  console.log("Status Cartão: "+$scope.dependente.statusCartao);

  $scope.bloquearCartao = function(){
    //console.log("Status Cartao: "+$scope.dependente.statusCartao);
    $scope.dependente.statusCartao = !$scope.dependente.statusCartao;
    console.log($scope.dependente.statusCartao);

    //DependenteService.bloqueiaCartao($scope.dependente.statusCartao);

    var status;
    if($scope.dependente.statusCartao == false){
      status = "bloqueado";
    } else {
      status = "desbloqueado";
    }
    alert("O cartão foi "+status);
  }


}])

.controller('meuCartOCtrl', ['$scope', '$stateParams', 'DependenteService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, DependenteService, $state) {

  $scope.dependente = DependenteService.getDependenteSelecionado();
  console.log($scope.dependente.nome);

  $scope.controleSemanal = $scope.dependente.limite/4;
  $scope.controleDiario = $scope.dependente.limite/30;

  console.log("Estabelecimentos: "+$scope.dependente.estabelecimentos);
  $scope.estabelecimentos = $scope.dependente.estabelecimentos;

}])

.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {



}])

.controller('meusRecibosCtrl', ['$scope', '$stateParams', 'DependenteService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, DependenteService) {

  $scope.dependente = DependenteService.getDependenteSelecionado();
  console.log($scope.dependente.recibos);
  $scope.recibos = $scope.dependente.recibos;

}])

.controller('autenticacaoCtrl', ['$scope', '$stateParams', 'DependenteService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, DependenteService, $state) {
  $scope.login = function(cpf, cpfDep, senhaDep){

      DependenteService.getUsuario(cpf, function(dados) {

        var keys = Object.keys(dados);
        console.log(keys[0]);
        $scope.usuario = dados[keys[0]];
        console.log($scope.usuario.dependentes.length);

        for(var i=0; i<$scope.usuario.dependentes.length; i++){

              if (cpfDep==$scope.usuario.dependentes[i].cpf) {

                   if(senhaDep==$scope.usuario.dependentes[i].senha){

                     DependenteService.selecionaDependente($scope.usuario.dependentes[i]);
                     $state.go("tabsController.meusRecibos");
                   }

              } else{
                $scope.erro = true;
              }
        }





      });

      $scope.erro = false;
  }

}])
