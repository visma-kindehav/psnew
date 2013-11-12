(function() {
    /**
    *   Handles the settings screen */
    Visma.Screens.SettingsScreen = function() {
        /* Get all IDs on this page */
        var _containerId = "#settingsScreen";
        var _dropDownLanguage = "#dropdownBoxLanguageSelect";
        var _saveButton = "#saveAndBackToMainFromSettingsLink";
        var _backButton = "#backToMainFromSettingsLink";
        var _backButtonText = "#backToMainFromSettingsLinkText";
        var _titleSettingsScreen = "#titleSettingsScreen";
        var _selectLanguage = "#selectLanguage";
        var _selectLanguageForm = "#selectLanguageForm";

        /**
        *   Loads and registers all content
        **/
        var _load = function() {
            _unload();
            $(_dropDownLanguage).val(Localization.getLanguage());
            //_scale();

            /* Register teh click listener for the save button */
            $(_saveButton).click(function(e){
                var _language = $(_dropDownLanguage).val();
                LocalStorageManager.setItem("language",_language);
                Localization.setLanguage(_language);
                Localization.load(function(){
                    ScreenManager.back();
                });
                return true;
            });

            /* Click listener for the back button */
            $(_backButton).click(function(e){
                ScreenManager.back();
                return true;
            });

            /* Update localized strings */
            $(_titleSettingsScreen).text(Localization.getString("titleSettingsScreen"));
            $(_selectLanguage).text(Localization.getString("selectLanguage"));
            $(_saveButton).text(Localization.getString("save"));

            /* Display the content */
            $(_containerId).show();

            /* Adjust top margin of page content based on the height of the navigation bar */
            var marginHeight = $(_containerId).find('.navBar').outerHeight(true);
            $(_containerId).find('.pageContent').css('margin-top', marginHeight);
        };

        /**
        *   Unregister and unload everything
        **/
        var _unload = function() {
             $(_saveButton).unbind("click");
             $(_backButton).unbind("click");
        };

        /**
        *   Adjusts/scales UI elements
        **/
        var _scale =function(){
/*
            var _tempFontSize = (($(window).width()-6)/15);

            $(_selectLanguage).css('font-size',_tempFontSize);
            $(_selectLanguageForm).css('font-size',_tempFontSize);

            $(_selectLanguageForm).css('margin-top',(($(window).height())/7));

            $(_saveButton).css('margin-top',(($(window).height())/7));
            $(_saveButton).css('height',(($(window).height())/14));
            $(_saveButton).css('width',(($(window).height())/4));
            $(_saveButton).css('font-size',_tempFontSize);
            var _paddingTop = (($(_saveButton).height()/2)-(_tempFontSize/2));

            $(_saveButton).css('padding',_paddingTop+"px 0 0 0");



*/



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