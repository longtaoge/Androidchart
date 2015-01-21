var myModule = angular.module("MyModule", []);
myModule.controller('MyCtrl', ['$scope', function($scope,Bridge){
	$scope.loadData=function(){
		console.log("加载数据中...");
    }
}]);
myModule.controller('MyCtrl2', ['$scope', function($scope,Bridge){
    $scope.loadData2 =function(){

        bridge("myctrl2");
    }


}]);

myModule.directive("loader", function() {
    return {
    	restrict:"AE",
    	link:function(scope,element,attrs){
    		element.bind('click', function(event) {
    			//scope.loadData();
    			// scope.$apply("loadData()");
    			// 注意这里的坑，howToLoad会被转换成小写的howtoload
    			scope.$apply(attrs.howtoload);
    		});
        }
    } 
});