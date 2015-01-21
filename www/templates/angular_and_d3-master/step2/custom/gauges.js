'use strict';

function MyController( $scope ) {
	$scope.values = { p: 10, o: 0, c: -10 };
	$scope.randomize = function() {
		$scope.values.p = ( Math.random() * 100 ) - 50;
		$scope.values.o = ( Math.random() * 100 ) - 50;
		$scope.values.c = ( Math.random() * 100 ) - 50;
	}
}
