(function() {
    /**
    * Handles all content on the Information Screen
    **/
    Visma.Screens.InformationScreen = function() {
        /* Create variables for all items on the screen */
        var _containerId = "#informationScreen";
        var _backButton = "#backToMain";

        var _aboutPS = "#aboutPS";
        var _aboutText = "#aboutPSText";

        var _contactUs = "#contactUs";
        var _contactUsText = "#contactUsText";

        var _efiling = "#efiling";
        var _efilingText = "#efilingText";

        var _training = "#training";
        var _trainingText = "#trainingText";

        var _TMview = "#TMview";
        var _TMviewText = "#TMviewText";

        var _preliminarySearchService = '#preliminarySearchService';
        var _preliminarySearchServiceText = '#preliminarySearchServiceText';

        var _twitter = "#twitter";
        var _youTube = "#youTube";
        var _facebook = "#facebook";

        /* Get URLs */
        var _trainingURL = Localization.getString("trainingURL");
        var _TMviewURL = Localization.getString("TMviewURL");
        var _efilingURL = Localization.getString("efilingURL");
        var _preliminarySearchServiceURL = Localization.getString("preliminarySearchServiceURL");

        /* Get localized strings for facebook, twitter and youtube */
        var _twitterURL = Localization.getString("twitterURL");
        var _youTubeURL = Localization.getString("youTubeURL");
        var _facebookURL = Localization.getString("facebookURL");


        /**
        *   Loads and registers all content
        **/
        var _load = function() {
            _unload();

            /* Get localized strings */
            $('#informationHeaderTitle').text(Localization.getString("information"));
            $(_efilingText).text(Localization.getString("efiling"));
            $(_trainingText).text(Localization.getString("training"));
            $(_TMviewText).text(Localization.getString("TMview"));
            $(_preliminarySearchServiceText).text(Localization.getString("preliminarySearchServiceText"));
            $(_aboutText).text(Localization.getString("aboutPS"));
            $(_contactUsText).text(Localization.getString("contactUs"));
            $('#DevelopedByText').text(Localization.getString("DevelopedByText"));



            /* Register click listeners */
            $(_backButton).click(function() {
                ScreenManager.back();
            });

            $(_efiling).click(function(){
                window.open(_efilingURL, '_system');
            });

            $(_training).click(function(){
                window.open(_trainingURL, '_system');
            });

            $(_preliminarySearchService).click(function(){
                window.open(_preliminarySearchServiceURL, '_system');
            });

            $(_TMview).click(function(){
                window.open(_TMviewURL, '_system');
            });

            $(_aboutPS).click(function(){
                ScreenManager.changeScreen(new Visma.Screens.AboutNIPOScreen());
            });


            $(_contactUs).click(function(){
                ScreenManager.changeScreen(new Visma.Screens.ContactInfoScreen());
            });


            /* Register click listeners on external links */
            $(_twitter).click(function(){
                window.open(_twitterURL, '_system');
            });

            $(_youTube).click(function(){
                window.open(_youTubeURL, '_system');
            });

            $(_facebook).click(function(){
                window.open(_facebookURL, '_system');
            });


            /* Display the contents */
            $(_containerId).show();


            /* Adjust top margin of page content based on the height of the navigation bar. */
            var marginHeight = $(_containerId).find('.navBar').outerHeight(true);
            $(_containerId).find('.pageContent').css('margin-top', marginHeight);

            $("body").scrollTop(0);

        }


        /**
        *   Unregister and unload everything
        **/
        var _unload = function() {
            $(_backButton).unbind("click");
            $(_aboutPS).unbind("click");
            $(_contactUs).unbind("click");
            $(_efiling).unbind("click");
            $(_TMview).unbind("click");
            $(_training).unbind("click");
            $(_preliminarySearchService).unbind("click");

            $(_twitter).unbind("click");
            $(_youTube).unbind("click");
            $(_facebook).unbind("click");
        };



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
