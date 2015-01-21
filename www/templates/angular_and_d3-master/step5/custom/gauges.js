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
		link: function (scope, element, attrs, ngModelCtrl) {
			var config = {
				size: 250,
				label: attrs.label,
				min: undefined != scope.min ? scope.min : 0,
				max: undefined != scope.max ? scope.max : 100,
				minorTicks: 5
			};

			var range = config.max - config.min;
			config.yellowZones = [ { from: config.min + range*0.75, to: config.min + range*0.9 } ];
			config.redZones = [ { from: config.min + range*0.9, to: config.max } ];

			scope.gauge = new Gauge( element[0], config );
			scope.gauge.render();
			scope.gauge.redraw( scope.value );

			scope.$watch( 'value', function() {
				if ( scope.gauge )
					scope.gauge.redraw( scope.value );
			} );
		}
	}
} );

function MyController( $scope ) {
	$scope.pval = 10;
	$scope.oval = 0;
	$scope.cval = -10;

	$scope.randomize = function() {
		$scope.pval = ( Math.random() * 100 ) - 50;
		$scope.oval = ( Math.random() * 100 ) - 50;
		$scope.cval = ( Math.random() * 100 ) - 50;
	}
}
