
(function() {
    /**
    *   Handles saving and loading to the local storage
    **/
    Visma.Core.LocalStorageManager = function() {

        /**
        *   Checks if HTML5 storage is supported
        **/
        var _supports_html5_storage = function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        }

        if(_supports_html5_storage()){
            return {
                getItem : function(key) {
                    return localStorage.getItem(key);
                },
                setItem : function(key,item) {
                    localStorage.setItem(key,item);
                }
            };
        }
        else{
            console.log("No HTML5 local storage support. Turn on HTML5 local storage to enable favorites.");
        }
    };

})();

