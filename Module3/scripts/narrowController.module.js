
function NarrowItDownController (menuSearchService){
    ctrl = this;

    ctrl.found = menuSearchService.getMatchedMenuItems();
};
