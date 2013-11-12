/**
*   Data class containing the results from Brreg
*
*   resultCount: The total result count
*   page: The current page
*   pages: The total amount of pages
*   entries: An array of entry data
*
*   See: http://hotell.difi.no/api/json/brreg/enhetsregisteret?page=1&query=visma+consulting
**/
(function() {
    Visma.Integration.BrregData = function(resultCount, page, pages, entries) {
        var _resultCount = resultCount;
        var _page = page;
        var _pages = pages;
        var _entries = new Array();

        (function() {
          for(var i = 0; i < entries.length; i++) {
          _entries.push(new Visma.Lookup.BrregResult(entries[i]));
          }
        })()


        return {
            getResultCount : function() {
                return _resultCount;
            },

            getCurrentPage : function() {
                return _page;
            },

            getPageCount : function() {
                return _pages;
            },

            getEntries : function() {
                return _entries;
            }
        };
    };
}) ();