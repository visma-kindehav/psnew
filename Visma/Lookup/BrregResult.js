(function() {
    Visma.Lookup.BrregResult = function(brregObject) {
        var _name = "";
        var _ncode = "";
        var _orgnr = "";

        var _container = null;

        /**
        *   Constructor
        **/
        (function() {
            _name = brregObject.navn;
            _ncode = brregObject.nkode1;
            _orgnr = brregObject.orgnr;

            // Setup the item container
            _container = $('<div class="brregResultContainer normalText"></div>');
            _container.append('<div class="brregResultTitle subtitleText bold">'  + _name + '</div>');
            _container.append('<div class="brregOrgnr">'+Localization.getString("orgnr")+": "+_orgnr+'</div>');
            _container.append('<div class="brregCode">'+Localization.getString("industryCode")+": "+_ncode+'</div>');
            _container.append('<div class="clear"></div>');

            _container.click(function(){
                window.open('http://w2.brreg.no/enhet/sok/detalj.jsp?orgnr='+ _orgnr, '_system');
                return true;
            });


        }) ();

        return {
            /**
            *   Returns the item container for the search result list
            **/
            getContainer : function() {
                return _container;
            },
            getApplicationNumber : function()  {
                return _orgnr;
            }
        };
    };

})();