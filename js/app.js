var app = angular.module('myApp', ['ngMap']);

app.controller('myCtrl', function($scope, $http, $sce) {

  // address of the host where webservice is hosted
	const HOST = "http://192.168.1.214:8081/";
  const SERVICE1 = "jrws/rest/cidade/all";
  const SERVICE2 = "jrws/rest/unidade/all"

	$scope.cidade =  [];
	$scope.unidade = [];	
	$scope.temp = [];
	$scope.tempKey = 0;

  // setting a default value for map
	$scope.url = "R. Álvaro Mendes, 2294, Teresina, PI";

  // this method makes a request that retorn a json file with all cities
  $http.get(HOST + SERVICE1)
  	.then(function (response) {
       $scope.cidade = response.data;
  }); 

	$scope.getUnidade = function(){
  		$scope.tempKey = 0;
  		$scope.unidade = [];
  		$scope.temp = [];

  		var key = this.data.id;

      // this method makes a request that retorn a json file with information about "unidade, member, address, etc.
      $http.get(HOST + SERVICE2).then(function (response){
      		for (var i = 0; i < response.data.length; i++) {
      			if(response.data[i].endereco.cidade.id == key){
    				$scope.unidade.push(response.data[i]);
      			}
      		}
      });
	};
    // this method changes information about current address of "unidade"
  	$scope.getDetails = function(){
  		$scope.temp = []; 
  		for (var i = 0; i < $scope.unidade.length; i++){
    	if($scope.unidade[i].id == $scope.tempKey){
    		$scope.temp.push($scope.unidade[i]);
    	}
   	}

  /* if you are using google maps with through iframe method you can use this line below  */
  // $scope.url = $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=' + $scope.temp[0].endereco.rua + ', ' + $scope.temp[0].endereco.numero + ', ' + $scope.temp[0].endereco.cidade.nome + ', ' + $scope.temp[0].endereco.cidade.estado + '&key=AIzaSyAN0om9mFmy1QN6Wf54tXAowK4eT0ZUPrU');
  $scope.url = $scope.temp[0].endereco.rua + ', ' + $scope.temp[0].endereco.numero + ', ' + $scope.temp[0].endereco.cidade.nome + ', ' + $scope.temp[0].endereco.cidade.estado;	   	
  	};

});



