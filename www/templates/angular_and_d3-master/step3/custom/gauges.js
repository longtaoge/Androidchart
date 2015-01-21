'use strict';

angular.module( 'components', [] ).directive( 'gauge', function () {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			label: "@",
			min: "=",
			max: "=",
			value: "="
		},
		template: "<div>{{label}}: {{min}} - {{value}} - {{max}}</div>"
	}
} );

function MyController( $scope ) {
	$scope.values = { p: 10, o: 0, c: -10 };
	$scope.randomize = function() {
		$scope.values.p = ( Math.random() * 100 ) - 50;
		$scope.values.o = ( Math.random() * 100 ) - 50;
		$scope.values.c = ( Math.random() * 100 ) - 50;
	}
}
