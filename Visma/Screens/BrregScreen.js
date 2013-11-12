(function() {
    /**
    *   Handles all listing of the brreg list
    **/
    Visma.Screens.BrregScreen = function(jsonObj) {
        var _containerId = '#brreglist';
        var _backButton = "#brregBackButton";
        var _brregPageContent = "#brregPageContent";

        var _brregResult = null;

        var entries = jsonObj.getEntries();

        var _populate = function() {
            $(_brregPageContent).html("");

            /* Perform a lookup and populate the results */
                if(entries.length > 0) {
                    $(_brregPageContent).html('<div class="normalText spacerTop centerContent">' + Localization.getString("showing") + " " + entries.length + " " + Localization.getString("results") + "<br /><br /><br /></div>");
                    for(var i = 0; i < entries.length; i++) {
                        $(_brregPageContent).append(entries[i].getContainer());
                    }
                }
                else {
                    console.warn("No Brreg elements were found.");
                    $(_brregPageContent).html('<span class="errorText"> error </span>');
                }
        };

        /**
        *   Load function called by the ScreenManager
        **/
        var _load = function() {
            $('#brregHeaderTitle').text(Localization.getString("brregscreenTitle"));

            $(_backButton).click(function() {
                ScreenManager.back();
            });

            _populate();

            $(_containerId).show();
            $("body").scrollTop(0);


            var marginHeight = $(_containerId).find('.navBar').outerHeight(true);
            $(_containerId).find('.pageContent').css('margin-top', marginHeight);
        };

        /**
        *   Unload function called by the ScreenManager
        **/
        var _unload = function() {
            $(_backButton).unbind("click");
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
}) ();