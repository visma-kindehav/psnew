
(function() {
    /**
    *   Handles changing of screens and the back stack
    **/
    Visma.Core.ScreenManager = function() {
        var _screenHistory = new Array();

        /**
        *   Returns the screen on top of the stack
        **/
        var _getCurrentScreen = function() {
            return _screenHistory[_screenHistory.length - 1];
        };

        /**
        *   Pushes spe specified screen to the stack and displays it
        **/
        var _changeScreen = function(screen) {
            if(_screenHistory.length > 0) {
                var currentScreen = _getCurrentScreen();
                currentScreen.dispose();
            }

            _screenHistory.push(screen);
            _updateBackButton();

            Statistics.logPageView(screen.getContainerId());

            $(".page").hide();
            screen.init();
        };

        /**
        *   Pops the top element off the page stack and displays it.
        *   Exits the application if it is the top page
        **/
        var _back = function() {
            if(_screenHistory.length > 1) {
                var currentScreen = _getCurrentScreen();

                currentScreen = _getCurrentScreen();
                currentScreen.dispose();
                _screenHistory.pop();
                $(".page").hide();

                currentScreen = _getCurrentScreen();
                currentScreen.init();

                Statistics.logPageView(currentScreen.getContainerId());

            }

            _updateBackButton();
        };

        /**
        *   Updates the back button to to the correct action
        **/
        var _updateBackButton = function() {
            if(_screenHistory.length > 1) {
                document.addEventListener("backbutton", _back , false);
            }
            else {
                document.removeEventListener("backbutton", _back , false);
            }
        };


        return {
            changeScreen : function(screen) {
                _changeScreen(screen);
            },


            back : function() {
                _back();
            },

            /**
            *   Sets hte top level screen, clearing the screen stack
            **/
            setMainScreen : function(screen) {
                while (_screenHistory.length > 0) {
                    var tempScreen = _screenHistory.pop();
                    tempScreen.dispose();
                }

                _changeScreen(screen);
            }
        };
    };

})();