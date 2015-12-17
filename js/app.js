var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http, $sce) {
	const HOST = "http://192.168.1.214:8081/";
	$scope.cidade =  [];
	$scope.unidade = [];	
	$scope.temp = [];
	$scope.tempKey = 0;
	$scope.url = 0;
 
  	$http.get(HOST + "jrws/rest/cidade/all")
    	.then(function (response) {
         $scope.cidade = response.data;
    }); 

   	$scope.getUnidade = function(){
   		$scope.tempKey = 0;
   		$scope.unidade = [];
   		$scope.temp = [];   		
   		var key = this.data.id;

	    $http.get(HOST + "jrws/rest/unidade/all")
	    	.then(function (response){
	    		for (var i = 0; i < response.data.length; i++) {
	    			if(response.data[i].endereco.cidade.id == key){
						$scope.unidade.push(response.data[i]);
	    			}
	    		}
	    });
   	};

   	$scope.getDetails = function(){
   		$scope.temp = [];
   		for (var i = 0; i < $scope.unidade.length; i++){
	    	if($scope.unidade[i].id == $scope.tempKey){
	    		$scope.temp.push($scope.unidade[i]);
	    	}
	   	}
		$scope.url = $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=' + $scope.temp[0].endereco.rua + ', ' + $scope.temp[0].endereco.numero + ', ' + $scope.temp[0].endereco.cidade.nome + ', ' + $scope.temp[0].endereco.cidade.estado + '&key=AIzaSyAN0om9mFmy1QN6Wf54tXAowK4eT0ZUPrU');	   	
		console.log('https://www.google.com/maps/embed/v1/place?q=' + $scope.temp[0].endereco.rua + ', ' + $scope.temp[0].endereco.numero + ', ' + $scope.temp[0].endereco.cidade.nome + ', ' + $scope.temp[0].endereco.cidade.estado + '&key=AIzaSyAN0om9mFmy1QN6Wf54tXAowK4eT0ZUPrU');
   	};

});
