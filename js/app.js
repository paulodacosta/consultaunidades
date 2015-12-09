var app = angular.module('myApp', []);

// meu controller
app.controller('cidadeCtrl', function($scope, $http) {

	$scope.cidade =  [];
	$scope.unidade = [];	

  	$http.get("all.json")
    	.then(function (response) {
         $scope.cidade = response.data;
    });

   	$scope.getUnidade = function(){
   		// remove lista quando selecionar novo cidade
   		$scope.unidade = [];

   		var key = this.data.id;

	    $http.get("unidade.json")
	    	.then(function (response){
	    		for (var i = 0; i < response.data.length; i++) {
	    			if(response.data[i].cidade_id == key){
							$scope.unidade.push(response.data[i]);
	    			}
	    		}
	    		
	    		console.log($scope.unidade);
	    });

   	};

   	$scope.getDetails = function(){
   		console.log(this.data);
   	};

});