(function() {
    /**
    *   Handles the data for favourites
    **/
    Visma.Core.Favourites = function() {
        var _favouritesStorageId = "favourites";
        var _favourites = new Array();


        /**
        *   Returns the string used for requesting and saving favourites
        **/
        var _getRequestString = function() {
            var favString = "";
            for(var i = 0; i < _favourites.length; i++) {
                if(i > 0) {
                    favString += ',';
                }
                favString += _favourites[i];
            }
            return favString;
        };

        /**
        *   Loads the saved favourites from the local storage
        **/
        var _load = function() {
            var favString = LocalStorageManager.getItem(_favouritesStorageId);
            if(favString) {
                _favourites = favString.split(',');
            }
        };

        /**
        *   Saves the current favourite array to local storage
        **/
        var _save = function() {
            LocalStorageManager.setItem(_favouritesStorageId, _getRequestString());
        };

        /**
         * Checks if a trademarkID already is favourited.
         *
         * @param id The id to check
         * @returns {boolean} True if exists
         */
        var _isFavourite = function(id){
            for(var i = 0; i < _favourites.length; i++) {
                if(id == _favourites[i]) {
                    return true;
                }
            }
            return false;
        };

        /**
        *   Adds a favourite item if the item does not already exist
        */
        var _addFavourite = function(id) {
            if(!_isFavourite(id)) {
                _favourites.push(id);
            }
        }

        /**
        *   Removes the specified id from the favourite list
        */
        var _removeFavourite = function(id) {
            for(var i = 0; i < _favourites.length; i++) {
                if(id == _favourites[i]) {
                    _favourites.splice(i, 1);
                    return;
                }
            }
        };


        /**
        *   Default Constructor
        **/
        (function() {
            _load();
        }) ();


        return {
            getFavorites : function() {
                return _favourites;
            },

            addFavourite : function(id) {
               _addFavourite(id);
               _save();
            },

            removeFavourite : function(id) {
                _removeFavourite(id);
                _save();
            },

            isFavourite : function(id){
                return _isFavourite(id);
            },

            getRequestString : function() {
                return _getRequestString();
            }
        };
    };

})();