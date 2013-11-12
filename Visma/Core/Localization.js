
(function() {
    /**
    *   Loads and returns localized strings
    **/
    Visma.Core.Localization = function(language) {
        var _language = language ? language : "nb-NO";
        var _dataSet = {};

        /** Load language data from file **/
        var _loadDataSet = function(callback) {
            _dataSet = {};

            if(_language == "nb-NO") {
                var languageSet = Visma.Dictionary.nbNO();
                _dataSet = languageSet.getDictionary();
            }
            else if(_language == "en-GB") {
                var languageSet = new Visma.Dictionary.enGB();
                _dataSet = languageSet.getDictionary();
            }


            if(callback && typeof callback == "function") {
                callback();
            }
        };



        return {
            /** Returns the current language **/
            getLanguage : function() {
                return _language;
            },

            /** Sets the current language **/
            setLanguage : function(language) {
                _language = language;
            },

            /** Loads the current language from file **/
            load : function(callback) {
                _loadDataSet(callback);
            },

            /** Returns a localized string **/
            getString : function(string) {
                return _dataSet[string];
            },

            /** Checks if the specified language is valid **/
            isValidLanguage : function(lang) {
                if(lang == 'en-GB' || lang == 'nb-NO') {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
    };

})();