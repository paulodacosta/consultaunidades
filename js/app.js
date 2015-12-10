var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {

	$scope.cidade =  [];
	$scope.unidade = [];	
	$scope.temp = [];
	$scope.tempKey;

  	$http.get("all.json")
    	.then(function (response) {
         $scope.cidade = response.data;
    });

   	$scope.getUnidade = function(){

   		$scope.unidade = [];
   		$scope.temp = [];   		
   		var key = this.data.id;

	    $http.get("unidade.json")
	    	.then(function (response){
	    		for (var i = 0; i < response.data.length; i++) {
	    			if(response.data[i].cidade_id == key){
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

   	};

});