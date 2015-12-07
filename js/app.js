var app = angular.module('myApp', []);

// meu controller
app.controller('cidadeCtrl', function($scope, $http) {

	$scope.cidade =  [];
	$scope.temp = [];

  	$http.get("all.json")
    	.then(function (response) {
      	//console.log(response.data[0]);
         $scope.cidade = response.data;
          //console.log($scope.cidade);
        //$scope.names = response.data.records
    });

   	$scope.getUnidade = function(){
   		var key = this.data.id;
		$scope.unidade = [];

	    $http.get("unidade.json")
	    	.then(function (response){
	    		for (var i = 0; i < response.data.length; i++) {
	    			console.log(response.data[i].nome);
	    			console.log(key);
	    			console.log(response.data[i].cidade_id);
	    			if(response.data[i].cidade_id === key){
							console.log(response.data[i].nome);
	    			}else{
	    				console.log("error");
	    			}
	    				
	    		}
	    		console.log($scope.unidade);
	    });

   	}

});