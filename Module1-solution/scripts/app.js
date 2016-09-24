(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LaunchCheckController)

    LaunchCheckController.$inject = ['$scope'];
    function LaunchCheckController($scope) {
        $scope.dishesList = "";
        $scope.returnMessage = "";

        $scope.CheckIfTooMuch = function () {

            $scope.returnMessage = CreateMessage(CountDishes($scope.dishesList));
        }

        function CountDishes(msg) {
            var re = /\s*,\s*/;
            var lst = msg.split(re);
            lst = CleanArray(lst);
            return lst.length
        }

        function CleanArray(actual) {
            var newArray = new Array();
            for (var i = 0; i < actual.length; i++) {
                if (actual[i]) {
                    newArray.push(actual[i]);
                }
            }
            return newArray;
        }

        function CreateMessage(dishesCount) {
            if (dishesCount == 0) {
                return "Please enter data first";
            }
            else if (dishesCount <= 3) {
                return "Enjoy!";
            }
            else {
                return "Too much!";
            }
        }
    };


})();