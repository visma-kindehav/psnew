
(function() {
    /**
    *   Handles data and interaction on the main screen
    **/
    Visma.Screens.MainScreen = function() {
        /* Store all IDs on the screen as variables */
        var _containerId = "#mainScreen";
        var _settingsButton = "#settingsButtonMainScreen";
        var _mainScreenLogo = "#mainScreenLogo";

        var _searchForm = "#searchFormMain";
        var _searchFieldContainer = "#searchFieldContainerMain";
        var _searchField = "#searchFieldMain";
        var _searchFieldClass = ".searchField";
        var _searchButton = "#searchButtonMain";
        var _thumbnail = "#thumbnail";

        var _advancedSearch = "#advancedSearchMainScreen";
        var _informationButton = "#informationMainScreen";
        var _favourites = "#favouritesMainScreen";

        var _navBar = ".navBar";
        var _navBackArrow = ".navBackArrow";
        var _navBackText = ".navBackText";
        var _navTitle = ".navTitle";

        var _newsFeedTitle = "#newsHeadline";
        var _newsFeed = '#newsfeed';
        var _newsTitle = "";
        var _newsDate = ".newsDate";
        var _newsContainer = null;
        var _newsURL = "";

        /* Calculate font size and prepare search input */
        var _newsFeedFontSize = (($(window).width() - 6) / 17);
        var _searchInput = new Visma.Lookup.SearchInput();

        var _clearedDefaultText = false;

        /**
        *   Populate the newsfeed container with the RSS soecified
        **/
        var getXMLFeed = function(address, count) {
            $(_mainScreenLogo).attr('src', Localization.getString("logoLocalization"));
            $(_newsFeed).html('<div class="newsFeedSpinnerContainer"><img class="newsFeedSpinner" src="img/spinner32.gif" /></div>');

            Visma.Lookup.HTTPRequest(address, function(data) {
                var i = 0;
                $(_newsFeed).html("");

                var $xml = $($.parseXML(data));
                var items = $xml.find("channel item").each(function() {
                    if(i >= count) {
                        return;
                    }

                    var _newsTitle = $(this).find('title').text();
                    var _newsURL = $(this).find('guid').text();
                    var _newsDateFromFeed = new Date($(this).find('pubDate').text());

                    _newsContainer =  '<div class="newsfeedContainer"><a class="newsTitle subtitleText" href="#" onclick="window.open(\'' + _newsURL + '\', \'_system\');">' +
                        _newsTitle + '</a>' + '<div class="newsDate metaText">' + _newsDateFromFeed.getDate() +
                        '.' + (_newsDateFromFeed.getMonth()+1) + '.' + _newsDateFromFeed.getFullYear() + '</div></div>';

                    $(_newsFeed).append(_newsContainer);
                    i++;
                });

            },
            function(e) {
                console.warn("ERROR: " + e);
            });
        };


        /**
        *   Loads and registers all content
        **/
        var _load = function() {
            _unload();

            /* Calculate sizes */
            var screenWidth = $(window).width();
            var searchFieldWidth = (screenWidth - 6) * 0.95;
            var searchFieldHeight = searchFieldWidth / 10;
            var navFontSize = ((screenWidth - 6) / 15);

            /* Update sizes */
            $(_searchFieldContainer).width(searchFieldWidth);
            $(_searchFieldContainer).height(searchFieldHeight);
            //$(_searchFieldClass).css("font-size", searchFieldHeight*0.8);
            //$(_newsFeedTitle).css("font-size", _newsFeedFontSize);
            //$(_navBar).css("font-size", navFontSize);
            //$(_navBackArrow).children().css("height", navFontSize*0.7);

            /* Register onClick listeners */
            $(_settingsButton).click(function(){
                var s = new Visma.Screens.SettingsScreen();
                ScreenManager.changeScreen(s);
            });

            $(_searchField).click(function(){
               $(_searchFieldContainer).css("box-shadow", "inset 0 0 1px 1px #1A6BA0");
               if(!_clearedDefaultText){
                    $(_searchField).val("");
                    _clearedDefaultText = true;
               }
            });

            $(_searchField).blur(function(){
                $(_searchFieldContainer).css("box-shadow", "inset 0 0 0px 0px");
            });

            $(_searchButton).click(function(){
                $(_searchForm).submit();
            });

            /* Register onSubmit listener for the search field */
            $(_searchForm).submit(function() {
                var _queryText = $(_searchField).val();
                var _s;
                if(_queryText == Localization.getString("searchHelpFieldText")){
                    _s = new Visma.Screens.SearchScreen(_searchInput);
                }else{
                    _searchInput.setTradeMarkText(_queryText);
                    _s = new Visma.Screens.SearchScreen(_searchInput);
                }
                _hideKeyboard();
                ScreenManager.changeScreen(_s);
                return false;
            });


            /* Opens the search screen and expands the "Advanced search"-field */
            $(_advancedSearch).click(function(){
                ScreenManager.changeScreen(new Visma.Screens.SearchScreen(new Visma.Lookup.SearchInput()));
                $("#searchAdvancedTab").click();
            });

            /* Opens the information screen */
            $(_informationButton).click(function(){
                ScreenManager.changeScreen(new Visma.Screens.InformationScreen());
            });

            /* Opens the favourites screen */
            $(_favourites).click(function(){
                 ScreenManager.changeScreen(new Visma.Screens.FavouritesScreen());
            });

            /* Update localized strings */
            $(_searchField).val(Localization.getString("searchHelpFieldText"));
            $(_thumbnail).attr( "src", Localization.getString("logoLocalization"));
            $(_newsFeedTitle).text(Localization.getString("newsfeed"));


            /* Pulls the RSS file from patentstyret.no and displays the title and date for each article in the newsfeed */
            var newsfeedURL = Localization.getString("newsfeedLink");
            getXMLFeed(newsfeedURL, 5);

            $("body").scrollTop(0);

            /* Displays the content */
            $(_containerId).show();

        };


        /**
        *   Unregister and unload everything
        **/
        var _unload = function() {
             $(_settingsButton).unbind("click");
             $(_searchField).unbind("click");
             $(_searchButton).unbind("click");
             $(_advancedSearch).unbind("click");
             $(_informationButton).unbind("click");
             $(_favourites).unbind("click");
             $(_searchForm).unbind("submit");
             $(_searchField).unbind("blur");
             $(_newsFeed).html("");
             $(_searchFieldContainer).css("box-shadow", "inset 0 0 0px 0px");
             _clearedDefaultText = false;
            _searchInput=new Visma.Lookup.SearchInput();

        };

        /* Hides the keyboard when called */
        var _hideKeyboard = function() {
            document.activeElement.blur();
            $("input").blur();
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

