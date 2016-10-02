(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json")
        .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            }
        };
        return ddo;
    }

    NarrowItDownController.$injected = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;

        ctrl.searchMenu = function (searchTerm) {
            ctrl.found = MenuSearchService.getMatchedMenuItems(searchTerm).then(function (data) {
                ctrl.found = data;
            });
        };

        ctrl.dontWantThisOne = function (index) {
            ctrl.found.splice(index, 1);
        }
    };

    MenuSearchService.$injected = ['$http', 'ApiPath'];
    function MenuSearchService($http, ApiPath) {
        var service = this;
        service.getMatchedMenuItems = function (searchTerm) {
            var response = $http({
                method: "GET",
                url: (ApiPath)
            })
                .then(function (response) {

                    var lst = [];
                    var data = response.data.menu_items;
                    if (searchTerm) {
                        searchTerm = searchTerm.toLowerCase();
                    }

                    data.forEach(function (item) {
                        if (item.name.toLowerCase().indexOf(searchTerm) !== -1) {
                            lst.push(item)
                        }
                    });

                    return lst;
                });

            return response;
        };
    };

})();