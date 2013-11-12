/* Define namespaces */
var Visma = {
    Core: {},
    Screens: {},
    Tabs: {},
    Lookup: {},
    Integration: {},
    Dictionary: {}
};

/* Global variables */
var Localization = null;
var ScreenManager = null;
var Statistics = null;
var LocalStorageManager = null;
var Favourites = null;
var Globals = null;

(function() {
    /**
    *   The main class of the application
    **/
    Visma.App = function() {
        /**
        *   Initialize the application
        **/
        var _init = function() {
            var startTime = new Date().getTime();

            Globals = new Visma.Core.Globals();
            Statistics = new Visma.Core.Statistics();
            LocalStorageManager = new Visma.Core.LocalStorageManager();
            Favourites = new Visma.Core.Favourites();


            // Get stored language
            var lang = LocalStorageManager.getItem("language");
            if(!lang) {
                lang = "nb-NO";
                LocalStorageManager.setItem("language", lang);
            }

            // Check if the selected language is valid
            Localization = new Visma.Core.Localization(lang);
            if(!Localization.isValidLanguage(lang)) {
                lang = "nb-NO";
                LocalStorageManager.setItem("language", lang);
            }

            // Load teh current language file
            Localization.load(function() {
                ScreenManager = new Visma.Core.ScreenManager();
                ScreenManager.changeScreen(new Visma.Screens.SplashScreen());

                // Display the main page after 3 seconds
                var proposedSleepTime = 3000 - (new Date().getTime() - startTime);
                var sleepTime = (proposedSleepTime > 0) ? proposedSleepTime : 0;

                setTimeout(function() {
                    ScreenManager.setMainScreen(new Visma.Screens.MainScreen());
                }, sleepTime);
            });
        };

        /**
        *   Called when an event is received
        **/
        var _receivedEvent = function(id) {
            console.log('Received Event: ' + id);
        };

        /**
        *   Called when the back button is pressed
        **/
        var _backPressed = function() {
                ScreenManager.back();
        };


        /**
        *   Phonegap document.ready equivalent
        **/
        var _onDeviceReady = function() {
             _receivedEvent('deviceready');
             _init();
            _bindEvents();
        };

        /**
        *   Initial binding of event handlers
        **/
        var _bindEvents = function() {

            //document.addEventListener("backbutton",_backPressed , false);
        };


        return {
            /**
            *   Binds the events
            **/
            initialize : function() {
                document.addEventListener('deviceready', _onDeviceReady, false);
            }
        };
    };
}) ();

