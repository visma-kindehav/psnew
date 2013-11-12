/**
*   Brreg factory class. Does a lookup at
*   http://hotell.difi.no/api/json/brreg/enhetsregisteret
*
*   query: The specified search query
*   callback: The callback function with the BrregData returned as an argument (not required)
*
*   Usage:
*   Visma.Integration.BrregFactory("visma", function(data) {
*       console.log(data.getResultCount());
*   });
**/
(function() {
    Visma.Integration.BrregFactory = function(query, callback) {
        var _apiPath = Globals.API_BRREG;
        var _result = null;
        var _brreg = "#brregSearchResult";

        /**
        *   Queries the API and returns the callback if specified
        **/
        var _doQuery = function() {
            Visma.Lookup.HTTPRequest(_apiPath + '?query=' + query, function(result) {
                var data = $.parseJSON(result);
                _result = new Visma.Integration.BrregData(data.posts, data.page, data.pages, data.entries);

                if(callback) {
                    callback(_result);
                }
            },
            function(e) {
                console.warn("Error getting results from BRREG.");
            },
            "application/json");
        };

        (function() {
            _doQuery();
        }) ();

        return {
            getResult : function() {
                return _result;
            }
        };
    };

}) ();