(function() {
    Visma.Lookup.SearchResult = function(jsonObj) {
        var _title = "";
        var _thumbnailURL = "";
        var _status = "";
        var _applicant = "";
        var _applicationNumber = 0;

        var _container = null;
        var _jqueryOnErrorScript="this.src='img/NOIMAGE.jpg'";


        /**
        *   Constructor
        **/
        (function() {
            _title = jsonObj.trademark_text;
            _thumbnailURL = jsonObj.thumbnail_url;
            _status = jsonObj.status;
            _applicant = jsonObj.applicant;
            _applicationNumber = jsonObj.application_number;

            // Setup the item container
            _container = $('<div class="searchResultContainer"></div>');
            _container.append('<div class="searchResultTitle subtitleText bold">' + _title + '</div>');
            //_container.append('<div class="searchThumbContainer"><img class="searchResultThumb" src="' + _thumbnailURL + '" onerror="'+_jqueryOnErrorScript+'" /></div>');

            _container.append('<div class="searchThumbContainer"><img class="searchResultThumb" src="' + _thumbnailURL + '" onerror="'+_jqueryOnErrorScript+'" /></div>');

            // Checks if the current item is in favourites and sets the image accordingly.
            if(Favourites.isFavourite(_applicationNumber)) {
                _container.append('<div class="searchResultFav"><img class="searchResultFavImg" src="img/icons/fav_selected.png" /></div>');
            }
            else {
                _container.append('<div class="searchResultFav"><img class="searchResultFavImg" src="img/icons/fav_deselected.png" /></div>');
            }

            _container.append('<div class="searchResultMeta normalText"><div class="searchResultApplicantInfo"><div class="searchResultApplicationNumber">' +_applicationNumber + '</div><div class="searchResultApplicant">' + _applicant + '</div></div><div class="searchResultStatus">'+_status+ '</div></div>');
            _container.append('<div class="clear"></div>');

            _container.find('.searchThumbContainer,.searchResultTitle,.searchResultMeta').click(function(){
                ScreenManager.changeScreen(new Visma.Screens.DetailsScreen(_applicationNumber));
                return true;
            });

            // Register onClick listener for the favourite element
            _container.find('.searchResultFav').click(function() {
                var thisImg = $(this).find('.searchResultFavImg');
                if(thisImg.attr('src') == "img/icons/fav_selected.png") {
                    Favourites.removeFavourite(_applicationNumber);
                    thisImg.attr('src', 'img/icons/fav_deselected.png');
                }
                else {
                    Favourites.addFavourite(_applicationNumber);
                    thisImg.attr('src', 'img/icons/fav_selected.png');
                }
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
                return _applicationNumber;
            }
        };
    };

})();
