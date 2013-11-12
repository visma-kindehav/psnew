( function() {
/**
*   USAGE:
*   var noridLookup = new Visma.Integration.Norid("coca cola norge", function() {
*       noridLookup.domainIsAvailable();
*   });
**/
    Visma.Integration.Norid = function(searchQuery, callback) {
        var _domain = "";
        var _isAvailable = "UNKNOWN";   // UNKNOWN, FREE, TAKEN


        /**
        *   Checks if a domain is available
        **/
        var _checkDomainAvailability = function(domain) {
            Visma.Lookup.HTTPRequest(Globals.API_PATENTSTYRET_WHOIS + '?format=json&request=' + domain, function(result) {
                var data = $.parseJSON(result);
                if(data.status == "OK") {
                    _isAvailable = data.result;
                }

                if(callback) {
                    callback();
                }
            },
            function(e) {
                console.warn("Error getting results from WHOIS.");
            },
            "application/json");
        };


        /**
        *   Constructor
        **/
        (function() {
            var tempDomain = "" + searchQuery;
            tempDomain = tempDomain.replace(/ /g, '-').toLowerCase();

            _domain = tempDomain + ".no";
            _checkDomainAvailability(_domain);
        }) ();


        return {
            getDomainName : function() {
                return _domain;
            },

            domainIsAvailable : function() {
                return _isAvailable;
            }
        };
    }
}) ();