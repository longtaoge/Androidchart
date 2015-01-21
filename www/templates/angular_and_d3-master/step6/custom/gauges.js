'use strict';
angular.module( 'components', [] ).directive( 'gauge', function () {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			label: '@',
			min: '=',
			max: '=',
			value: '=',
			click: '&'
		},
		link: function (scope, element, attrs, ngModelCtrl) {
			var config = {
				size: 250,
				label: attrs.label,
				min: undefined != scope.min ? scope.min : 0,
				max: undefined != scope.max ? scope.max : 100,
				minorTicks: 5,
				click: function( value ) {
					scope.value = value;
					scope.$digest();
					scope.click();
				}
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
	$scope.values = { p: 10, o: 0, c: -10 };
	$scope.set = function( val ) {
		console.log( $scope.values );
	}
}
