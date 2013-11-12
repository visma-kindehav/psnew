(function() {
    /**
    *   Handles all listing of favourites
    **/
    Visma.Screens.FavouritesScreen = function() {
        var _containerId = '#favourites';
        var _backButton = "#favouritesBackButton";
        var _favouritesPageContent = "#favouritesPageContent";
        var _errorContainer="#serverError";
        var _noFavoritesFound = "#noFavoritesFound";

        var _favResult = null;

        /**
        *  Calls functions to do a JSON request and populates the favourites list
        **/
        var _populate = function() {

            $(_errorContainer).empty();
            $(_favouritesPageContent).html("");
            $(_errorContainer).hide();
            $(_noFavoritesFound).hide();
			$(_favouritesPageContent).html('<div class="centerContent spacerTop"><img id="spinnerImage" src="img/spinner32.gif"/></div>');

            /* Perform a lookup and populate the results */
            _favResult = new Visma.Lookup.FavouritesLookup(Favourites.getRequestString(), function(result) {
                $(_favouritesPageContent).html("");
                if(result.length > 0) {

                    for(var i = 0; i < result.length; i++) {
                        $(_favouritesPageContent).append(result[i].getContainer());
                    }
                }
                else {
                    console.warn("No favourites were found.");
                    $(_noFavoritesFound).text(Localization.getString('favourite_list_error')).show();
                }
            });
        };

        /**
        *   Load function called by the ScreenManager
        **/
        var _load = function() {
            _unload();
            $('#favouritesHeaderTitle').text(Localization.getString("favourites"));


            $(_containerId).show();
            $('body').scrollTop(0);
            var marginHeight = $(_containerId).find('.navBar').outerHeight(true);
            $(_containerId).find('.pageContent').css('margin-top', marginHeight);

            $(_backButton).click(function() {
                ScreenManager.back();
            });

            _populate();
        };

        /**
        *   Unload function called by the ScreenManager
        **/
        var _unload = function() {
            $(_backButton).unbind("click");
            $(_favouritesPageContent).html("");
            $(_errorContainer).hide();
            $(_noFavoritesFound).hide();
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
