(function() {
    /**
    *   Class for requesting data on the list of favourites
    **/
    Visma.Lookup.FavouritesLookup = function(ids, callback) {
        var _backendPath = Globals.API_PATENTSTYRET_FAV;
        var _status = "";
        var _results = new Array();
        var _errorContainer="#serverError";
        var _favouritesPageContent = "#favouritesPageContent";
        var _noFavoritesFound = "#noFavoritesFound";

        /**
        *    Search for favourites to return data to populate the favorites list
        **/
        var _search = function(_ids, _callback) {
            $(_errorContainer).hide();
            $(_noFavoritesFound).hide();

            Visma.Lookup.HTTPRequest(_backendPath + "?format=json&Language=" + Localization.getLanguage() + "&ApplicationNumbers=" + _ids,
            function(result) {
                var data = $.parseJSON(result);

                $(_errorContainer).empty();
                _status = data.status;

                for(var i = 0; i < data.search_results.length; i++) {
                    _results.push(new Visma.Lookup.SearchResult(data.search_results[i]));
                }

                if(_callback) {
                    _callback(_results);
                }
            },
            function(e) {
                $(_favouritesPageContent).html("");
                $(_errorContainer).html(Localization.getString("serverNotResponding"));
                $(_errorContainer).text(Localization.getString("serverNotResponding")).show();
                console.warn("Failed to load favourites");

            }, "application/json");

        };

        /**
        *    Constructor
        **/
        (function() {
            _search(ids, callback);
        }) ();


        return {
            dispose : function() {
                delete _results;
            },

            getResults : function() {
                return _results;
            }
        };
    };

})();
