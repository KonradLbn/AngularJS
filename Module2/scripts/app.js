(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var toBuyCtrl = this;
        toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

        toBuyCtrl.BuyItem = function (index) {
            ShoppingListCheckOffService.BuyItem(index);
        };
    };

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var alreadyBoughtCtrl = this;
        alreadyBoughtCtrl.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

    };

    function ShoppingListCheckOffService() {
        var service = this;
        service.toBuyList = getInitialDataToBuy();

        service.alreadyBoughtList = [];

        service.BuyItem = function (index) {
            var item = service.toBuyList.slice(index, index + 1);
            service.toBuyList.splice(index, 1);
            service.alreadyBoughtList.push(item[0]);
        }

        service.getToBuyItems = function () {
            return service.toBuyList;
        };

        service.getAlreadyBoughtItems = function () {
            return service.alreadyBoughtList;
        };

        function getInitialDataToBuy() {
        return [{ name: "cookiesA", quantity: 9 },
            { name: "cookiesB", quantity: 8 },
            { name: "cookiesC", quantity: 7 },
            { name: "cookiesD", quantity: 6 },
            { name: "cookiesE", quantity: 5 }];
    }
    };

})();