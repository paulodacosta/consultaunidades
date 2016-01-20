var app = angular.module('myApp', ['ngMap']);

app.controller('myCtrl', function($scope, $http, $sce) {
    this.doSth = function() {
      geocoder.geocode({'location': this.getPosition()}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            console.log(results[1]);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
      
    } 


	const HOST = "http://192.168.1.214:8081/";
	$scope.cidade =  [];
	$scope.unidade = [];	
	$scope.temp = [];
	$scope.tempKey = 0;
	$scope.url = "R. Álvaro Mendes, 2294, Teresina, PI";

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
      console.log($scope.temp);
    //$scope.url = $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=' + $scope.temp[0].endereco.rua + ', ' + $scope.temp[0].endereco.numero + ', ' + $scope.temp[0].endereco.cidade.nome + ', ' + $scope.temp[0].endereco.cidade.estado + '&key=AIzaSyAN0om9mFmy1QN6Wf54tXAowK4eT0ZUPrU');     
		$scope.url = $scope.temp[0].endereco.rua + ', ' + $scope.temp[0].endereco.numero + ', ' + $scope.temp[0].endereco.cidade.nome + ', ' + $scope.temp[0].endereco.cidade.estado;	   	
    console.log($scope.url);
   	};

});


