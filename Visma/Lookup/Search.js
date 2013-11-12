(function() {
    Visma.Lookup.Search = function(query, callback) {
        var _api = "";
        var _backendPath = Globals.API_PATENTSTYRET_SEARCH;

        var _status = "";
        var _resultCount = 0;
        var _page = 0;
        var _pageCount = 0;
        var _totalResultCount = 0;
        var _results = new Array();
        var _errorContainer="#errorMessageSearchResult"
        var _errorEmptyText  = "#errorEmptyText";

        /**
        *   Sends an ajax request to the API, returning the information as a list of SearchResults
        **/
        var _search = function(query, callback) {
            $(_errorContainer).empty();
            $(_errorEmptyText).hide();

            Visma.Lookup.HTTPRequest(_backendPath + "?format=json&" + query, function(result) {
                $(_errorContainer).html("");

                //return;
                var data = $.parseJSON(result);

                _status = data.status;
                _resultCount = data.result_count;
                _page = data.page;
                _pageCount = data.page_count;
                _totalResultCount = data.total_result_count;

                for(var i = 0; i < _resultCount; i++) {
                   _results.push(new Visma.Lookup.SearchResult(data.search_results[i]));
                }

                if(callback) {
                   callback(_results);
                }
            },
            function(e) {
                console.warn("ERROR: " + e);
                $(_errorContainer).text(Localization.getString("serverNotResponding")).show();
            }, "application/json");


        };

        /**
        *   Constructor
        **/
        (function() {
            _search(query, callback);
        }) ();

        return {
            dispose : function() {
                delete _results;
            },

            getResults : function() {
                return _results;
            },
            getPageNumber : function() {
                return _page;
            },
            getTotalPageNumber : function() {
               return _pageCount;
           },
           getTotalResultCount: function() {
                return _totalResultCount;
           },
           getResultCount: function() {
                return _resultCount;
           }
        };
    };

})();
