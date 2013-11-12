(function() {
    /**
    *   Handles the splash screen
    **/
    Visma.Screens.SplashScreen = function() {
        /* Retrieve the IDs */
        var _containerId = "#splashScreen";
        var _splashImage = "#splashImage";

        /**
        *   Loads and registers all content
        **/
        var _load = function() {
            _unload();
            $(_splashImage).attr("src", Localization.getString("logoLocalization"));
            $(_containerId).show();
        };

        /**
        *   Unregister and unload everything
        **/
        var _unload = function() {

        };

        /**
        *   Constructor
        **/
        (function() {
            _load();
        }) ();


        return {
            dispose : function() {
                _unload();
            },

            init : function() {
                _load();
            },

            getContainerId : function() {
                return _containerId;
            }
        };
    };

})();