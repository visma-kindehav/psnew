(function() {
    /**
    *   Handles all content on the Details screen
    **/
    Visma.Screens.DetailsScreen = function(id) {
        /* ID lookups */
        var _containerId = "#detailsScreen";
        var _backButton = "#backDetails";
        var _backText = "#detailsBackButtonText";
        var _navTitle = "#detailsHeaderTitle";

        var _detailsContainer = "#detailsContainer";
        var _detailsExpander = "#detailsExpander";
        var _detailsReadMore = "#detailsReadMore";
        var _detailHeadline = ".detailHeadline";

        var _navBarRightImageContainer = "#navBarRightImageContainer";
        var _navBarRightImage = "#navBarRightImage";
        var _errorContainer = "#errorMessageDetails";

        /* Variables needed for JSON requests */
        var _backendPath = Globals.API_PATENTSTYRET_DETAILED;
        var _id = id;


        /**
        *   Returns a content row
        **/
        var _createRow = function(leftText, rightText, isLeftAligned) {
            var container = $('<div class="detailRowContainer"></div>');
            container.append('<div class="detailRowLeft">' + leftText +'</div>');
            if(isLeftAligned) {

                container.append('<div class="detailRowRightAlignLeft">' + rightText +'</div>');
            }
            else {
                container.append('<div class="detailRowRight">' + rightText +'</div>');
            }

            container.append('<div class="clear"></div>');

            return container;
        };

        /**
        *   Updates the favourite icon, based on if this item is favourited
        **/
        var _updateFavIcon = function() {
            $(_navBarRightImageContainer).unbind("click");

            var isFav = Favourites.isFavourite(_id);
            if(isFav) {
                $(_navBarRightImage).attr('src', "img/icons/fav_selected.png");
            }
            else {
                $(_navBarRightImage).attr('src', "img/icons/fav_deselected.png");
            }

            /* Register click listener on hte favourite image */
            $(_navBarRightImageContainer).click(function() {
                var img = $(_navBarRightImage);
                if(img.attr('src') == "img/icons/fav_deselected.png") {
                    img.attr('src', "img/icons/fav_selected.png");
                    Favourites.addFavourite(_id);
                }
                else {
                    img.attr('src', "img/icons/fav_deselected.png");
                    Favourites.removeFavourite(_id);
                }
            });
        };

        /**
        *   Returns an image container with the specified address
        **/
        var _createImage = function(address) {
            var container = $('<div class="detailImageContainer"></div>');
            var image = $('<img class="detailImage" src="' + address +'" />');
            container.append(image);

            return container;
        };

        /**
        *   Load and register everything
        **/
        var _load = function() {
            $(_errorContainer).empty();
            _unload();

            /* Update localized strings */
            $(_navTitle).text(Localization.getString("details"));

            $(_detailsExpander).hide();

            $(_backButton).click(function() {
                console.log("back");
                ScreenManager.back();
            });

            /* Register click listener for read more button */
            $(_detailsReadMore).click(function() {
                if($(_detailsExpander).is(':visible')) {
                    $(_detailsExpander).slideUp('fast');
                    $(_detailsReadMore).html('<img class="expandIcon" src="img/icons/arrow_down.png" />');
                }
                else {
                    $(_detailsExpander).slideDown('fast');
                    $(_detailsReadMore).html('<img class="expandIcon" src="img/icons/arrow_up.png" />');
                }
            });



            Visma.Lookup.HTTPRequest(_backendPath + '?format=json&ApplicationNumber=' + _id + '&language=' +  Localization.getLanguage(), function(result) {
                var data = $.parseJSON(result);

                _updateFavIcon();
                $(_detailsContainer).append(new _createImage(data.trademark_image));

                /* Print key information */
                $(_detailsContainer).append('<div class="detailHeadline">' + Localization.getString('key_info') + '</div>');
                for(var obj in data.key_info) {
                    if(data.key_info[obj].length > 1) {
                        $(_detailsContainer).append(new _createRow(Localization.getString(obj), data.key_info[obj]));
                    }
                }


                /* Print Goods and services */
                if(!$.isEmptyObject(data.goods_and_services_details)) {
                    $(_detailsExpander).append('<div class="detailHeadline">' + Localization.getString('goods_and_services') + '</div>');

                    for(var obj in data.goods_and_services_details) {
                        $(_detailsExpander).append(new _createRow(obj, data.goods_and_services_details[obj],true));
                    }
                }

                /* Print Alteration of mark */
                if(!$.isEmptyObject(data.alteration_details)) {
                    $(_detailsExpander).append('<div class="detailHeadline">' + Localization.getString('alteration_of_mark') + '</div>');


                    for(var obj in data.alteration_details) {
                        $(_detailsExpander).append(new _createRow(Localization.getString(obj), data.alteration_details[obj].replace(/(\r\n|\n|\r)/gm, "<br />")));
                    }
                }

                /* Print Board of appeal */
                if(!$.isEmptyObject(data.board_of_appeal_details)) {
                    $(_detailsExpander).append('<div class="detailHeadline">' + Localization.getString('board_of_appeal') + '</div>');

                    for(var obj in data.board_of_appeal_details) {
                        $(_detailsExpander).append(new _createRow(Localization.getString(obj), data.board_of_appeal_details[obj].replace(/(\r\n|\n|\r)/gm, "<br />")));
                    }
                }

                /* Print Administrative review */
                if(!$.isEmptyObject(data.administrative_review_details)) {
                    $(_detailsExpander).append('<div class="detailHeadline">' + Localization.getString('administrative_review') + '</div>');

                    for(var obj in data.administrative_review_details) {
                        $(_detailsExpander).append(new _createRow(Localization.getString(obj), data.administrative_review_details[obj].replace(/(\r\n|\n|\r)/gm, "<br />")));
                    }
                }

                /* Print Opposition */
                if(!$.isEmptyObject(data.opposition_details)) {
                    $(_detailsExpander).append('<div class="detailHeadline">' + Localization.getString('opposition') + '</div>');

                    for(var obj in data.opposition_details) {
                        $(_detailsExpander).append(new _createRow(Localization.getString(obj), data.opposition_details[obj].replace(/(\r\n|\n|\r)/gm, "<br />")));
                    }
                }

                /* Print Protest field */
                if(!$.isEmptyObject(data.protest_details)) {
                    $(_detailsExpander).append('<div class="detailHeadline">' + Localization.getString('protest') + '</div>');

                    for(var obj in data.protest_details) {
                        $(_detailsExpander).append(new _createRow(Localization.getString(obj), data.protest_details[obj].replace(/(\r\n|\n|\r)/gm, "<br />")));
                    }
                }

                /* Print last updated field */
                $(_detailsExpander).append('<div class="detailHeadline">' + Localization.getString('last_updated') + '</div>');
                $(_detailsExpander).append(new _createRow("", data.last_updated));


            }, function(e) {
                $(_errorContainer).empty();
                $(_errorContainer).append(Localization.getString("serverNotResponding"));
                console.warn("Error fetching detailed info: " + e);
            }, "application/json");

            /* Display the content */
            $(_containerId).show();

            /* Adjust top margin for the nav bar */
            var marginHeight = $(_containerId).find('.navBar').outerHeight(true);
            $(_containerId).find('.pageContent').css('margin-top', marginHeight);

        };

         /** Unload and unregister everything **/
        var _unload = function() {
            $(_backButton).unbind("click");
            $(_detailsReadMore).unbind('click');
            $(_navBarRightImageContainer).unbind('click');

            $(_detailsContainer).html("");
            $(_detailsExpander).html("");

            $(_detailsReadMore).html('<img class="expandIcon" src="img/icons/arrow_down.png" />');
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

})();