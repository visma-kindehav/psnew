(function() {
    /**
    *   Handles everything on the search screen
    **/
    Visma.Screens.SearchScreen = function(query) {

        // Search field
        var _containerId = "#searchResults";
        var _searchFieldContainer = "#searchFieldContainer";
        var _backButton = "#backResults";
        var _searchMetaBar = "#searchMetaBar";
        var _searchField = "#searchField";
        var _searchButton = "#searchButton";
        var _searchForm = "#searchForm";
        var _searchTabClass = ".searchTab";
        var _searchTabDivider = ".searchTabDivider";
        var _searchTabExpander  = ".searchTabExpander";

        // Sort search
        var _searchTabOrderExpander = "#searchTabOrderExpander";
        var _sortSelectMenu = "#sortSearchFieldSelect";
        var _sortSelectOrder = "#sortSelectOrder";
        var _searchOrderTab = "#searchOrderTab";
        var _sortBySelector =".sortBySelector";
        var _sortAscending = "#sortAscending";
        var _sortDescending = "#sortDescending";
        var _tabOrder = new Visma.Tabs.SearchOrderTab();



        // Search results
        var _resultList = "#searchResultsList";
        var _searchResult = null;
        var _searchSpinner = "#spinnerImage";
        var _searchNumberOfHits = "#searchNumberOfHits";
        var _errorEmptyText = "#errorEmptyText";

        // Other services results
        var _otherServices = "#otherServicesSearchResults";
        var _furtherActions = "#furtherActionsContainer";
        var _norid = "#noridSearchResult";
        var _brreg = "#brregSearchResult";
        var _emptyTradeMarkResult = "#emptyTradeMarkResultButton"
        var _brregResult = null;
        var _noridLookup = null;

        // Advanced search
        var _searchAdvancedTab = "#searchAdvancedTab";
        var _searchTabAdvancedExpander = "#searchTabAdvancedExpander";
        var _tabAdvanced =  new Visma.Tabs.SearchAdvancedTab();
        var _searchInputFieldsClass='.inputFieldContainer';
        var _selectedTab = null;
        var _queryObject = query;
        var _advancedSearchForm = "#advancedSearchForm";

        // Page navigation
        var _bottomNavigationBar = ".bottomNavigationBar";
        var _bottomContainer = "";
        var _pageCount = null;
        var _currentPage = null;

        var _pageBackButton = "#pageBackButton";
        var _pageNextButton = "#pageNextButton";
        var _pageNumbers = "#pageNumbers";

        // Error text
        var _errorText = "#ErrorText";
        var _errorContainer="#errorMessageSearchResult";
        var _dateErrorContainer="#errorDateMessage";

        // Advanced search expander
        var _freeTextSearch = "#searchFieldFreeText";
        var _agent = "#searchFieldOwner";
        var _applicationStatus = "#applicationStatusSelect";
        var _dateFrom = "#datepickerFrom";
        var _dateTo = "#datepickerTo";
        var _sortOption= "#sortSearchFieldSelect";

        // Navbar and tabs
        var _navBar = ".navBar";
        var _sortAndAdvancedTabs = "#sortAndAdvancedContainer";
        /**
         *   Checks if the input string dtValue is of the form : yyyy-mm-dd,
         *   also accepts empty input
         *   returns true or false
         */

        function ValidateDate(dtValue){
            if(dtValue==""){
                return true;
            }
            var dtRegex = new RegExp(/\b\d{4}[\-]\d{1,2}[\-]\d{1,2}\b/);
            return dtRegex.test(dtValue);

        }

        /**
        *   Loads and registers all content
        **/

        var _load = function() {

            $(_searchSpinner).hide();
            $(document).ajaxStart(function(){
                $(_searchSpinner).show();
            });
            $(document).ajaxStop(function(){
                $(_searchSpinner).hide();
            });

            _unload();

            $(_navBar).css("padding", "5% 0 0 0");

            /* Gets sizes for the search area */
            var searchFieldWidth = ($(window).width() - 6) * 0.95;
            var searchFieldHeight = searchFieldWidth / 10;
            var screenWidth = $(window).width();

            /* Update search field sizes */
            $(_searchFieldContainer).width(searchFieldWidth);
            $(_searchFieldContainer).height(searchFieldHeight);
            $(_searchField).val(_queryObject.getSearchText());

            /* Initialize tabs */
            _tabOrder.create();
            _tabAdvanced.create();

            /* Register click listeners */
            $(_backButton).click(function() {
                ScreenManager.back();
            });


            $(_searchButton).click(function(){
                $(_searchForm).submit();
            });

            /* Register submit listener for the search field and advanced field */
            $(_searchForm).submit(function() {
                _fetchFormDataToQuery();
                _callSearch();
                _hideKeyboard();
                return false;
            });

            $(_advancedSearchForm).submit(function() {
                _fetchFormDataToQuery();
                _callSearch();
                _hideKeyboard();
                return false;
            });

            /* Checks if the "sort" or "advanced search"-tab is selected, and slides down the respectively field */
            $(_searchField).click(function(){
               $(_searchFieldContainer).css("box-shadow", "inset 0 0 1px 1px #1A6BA0");
            });

            $(_searchField).blur(function(){
                $(_searchFieldContainer).css("box-shadow", "inset 0 0 0px 0px");
            });


            /* Registers listener for the tab elements */
            $(_searchTabClass).click(function() {
                if(_selectedTab == null) {
                    /* No current tab selected, just expand the clicked one */
                    $(this).addClass("searchTabSelected");
                    $(_searchTabDivider).removeClass("searchTabDivider");
                    _selectedTab = this.id;

                    if("#" + _selectedTab == _searchOrderTab) {
                        $(_searchTabOrderExpander).slideDown('fast');
                    }
                    else if("#" + _selectedTab == _searchAdvancedTab) {
                        $(_searchTabAdvancedExpander).slideDown('fast');
                    }
                }
                else if(_selectedTab == this.id) {
                    /* Clicked same tab, close this */
                    $(this).removeClass("searchTabSelected");
                    $(_searchAdvancedTab).addClass("searchTabDivider");

                    if("#" + _selectedTab == _searchOrderTab) {
                        $(_searchTabOrderExpander).slideUp('fast');
                    }
                    else if("#" + _selectedTab == _searchAdvancedTab) {
                        $(_searchTabAdvancedExpander).slideUp('fast');
                    }

                    _selectedTab = null;
                }
                else {
                    /* Clicked different tab, close this and open the clicked one */
                    $(_searchTabClass).removeClass("searchTabSelected");
                    $(this).addClass("searchTabSelected");
                    _selectedTab = this.id;

                    if("#" + _selectedTab == _searchOrderTab) {
                        $(_searchTabAdvancedExpander).slideUp('fast', function() {
                            $(_searchTabOrderExpander).slideDown('fast');
                        });
                    }
                    else if("#" + _selectedTab == _searchAdvancedTab) {
                        $(_searchTabOrderExpander).slideUp('fast', function() {
                            $(_searchTabAdvancedExpander).slideDown('fast');
                        });
                    }
                }
            });

            $(_sortSelectMenu).change(function(e){
                _queryObject.setOrderBy($(_sortOption).val());
                _callSearch();
            });


            $(_sortBySelector).click(function() {
                $(_sortBySelector).removeClass("sortBySelectorSelected");

                if("#" + this.id == _sortAscending) {
                    $(this).addClass("sortBySelectorSelected");
                    _queryObject.setOrderDir("asc");
                    _callSearch();
                } else {
                    $(this).addClass("sortBySelectorSelected");
                    _queryObject.setOrderDir("desc");
                    _callSearch();
                }
            });

            /*
            * Click function for the other search services performed in the searchscreen
            */

            $(_norid).click(function(){

                var url_norid = "";

                if(_noridLookup.domainIsAvailable() == "FREE"){
                    url_norid = "http://www.norid.no/domeneregistrering/registrere.html";
                }else{
                    var _tempUrl = _queryObject.getSearchText().split(' ').join('-');
                    url_norid = 'http://www.norid.no/domenenavnbaser/whois/?query=' +_tempUrl+'.no&charset=UTF-8'
                }

                window.open(url_norid, '_system');

            });

            $(_emptyTradeMarkResult).click(function(){
                window.open('https://www.altinn.no/no/Skjema-og-tjenester/Etater/Patentstyret/Soknad-om-varemerkeregistrering', '_system');
            });


            /* Customization drop-down */
            $('.styleselectedDropDown').css('Height',$('#searchFieldOwner').css("Height"));

			/* Get localized strings */
			$('#searchHeaderResults').text(Localization.getString("search"));
            $('#searchAdvancedTab').text(Localization.getString("searchAdvancedTab"));
            $('#searchOrderTab').text(Localization.getString("searchOrderTab"));

            /* Advanced search */
            $('#freeTextSearch').text(Localization.getString("freeTextSearch"));
            $('#owner').text(Localization.getString("applicant"));
            $('#applicationStatus').text(Localization.getString("applicationStatus"));
            $('#chooseLegalStatus').text(Localization.getString("chooseLegalStatus"));
            $('#cancelled').text(Localization.getString("cancelled"));
            $('#granted').text(Localization.getString("granted"));
            $('#ceased').text(Localization.getString("ceased"));
            $('#refused').text(Localization.getString("refused"));
            $('#pending').text(Localization.getString("pending"));
            $('#annulment').text(Localization.getString("annulment"));
            $('#shelved').text(Localization.getString("shelved"));
            $('#withdrawn').text(Localization.getString("withdrawn"));
            $('#finallyShelved').text(Localization.getString("finallyShelved"));
            $('#registered').text(Localization.getString("registered"));
            $('#applicationFiled').text(Localization.getString("applicationFiled"));
            $('#fromDate').text(Localization.getString("fromDate"));
            $('#toDate').text(Localization.getString("toDate"));

            /* Sort */
            $('#sortBy').text(Localization.getString("sortBy"));
            $('#choose').text(Localization.getString("choose"));
            $('#sortAscending').text(Localization.getString("ascending"));
            $('#sortDescending').text(Localization.getString("descending"));
            $('#date').text(Localization.getString("date"));
            $('#status').text(Localization.getString("status"));
            $('#title').text(Localization.getString("title"));
            $('#applicant').text(Localization.getString("applicant"));

            /* Calls the backend for search results */
            _callSearch();

            /* Displays the content */
            $(_containerId).show();

            /* Adjust the page content based on the nav bar */
            var marginHeight = $(_containerId).find(_navBar).outerHeight(false);
            $(_containerId).find('.pageContent').css('margin-top', marginHeight);

        };

        /**
        *   Unregister and unload everything
        **/
        var _unload = function() {
            $(_searchSpinner).hide();
            $(_otherServices).hide();
            $(_errorContainer).empty();
            $(_dateErrorContainer).empty();
            $(_errorEmptyText).empty();
            $(_backButton).unbind("click");
            $(_searchField).unbind("click");
            $(_searchField).unbind("blur");
            $(_searchButton).unbind("click");
            $(_otherServices).unbind("click");
            $(_brreg).unbind("click");
            $(_norid).unbind("click");
            $(_emptyTradeMarkResult).unbind("click");
            $(_searchForm).unbind("submit");
            $(_advancedSearchForm).unbind("submit");
            $(_sortSelectMenu).unbind("change");
            $(_sortSelectOrder).unbind("change");
            $(_searchTabClass).unbind("click");
            $(_sortBySelector).unbind("click");

            $(_navBar).css("padding", "5% 0 5% 0");

            $(_resultList).html("");
            $(_bottomNavigationBar).html("");
            $(_searchNumberOfHits).html("");

            _bottomContainer = "";

            _tabOrder.dispose();
            _tabAdvanced.dispose();

            $(_searchTabExpander).hide();
            $(_searchTabClass).removeClass("searchTabSelected");

            $(_searchInputFieldsClass).each(function(){$(this).val("");});
            $(_applicationStatus).val("1");
            $(_sortSelectMenu).val("date");

        };

        /**
        *  Callback function for populating the result list.
        **/
        var _populate = function(result) {
            $(_searchSpinner).hide();
            $(_resultList).html("");
            $(_errorEmptyText).hide();
            $(_errorContainer).hide();
            _errorText = Localization.getString('errorText');

            _currentPage = _searchResult.getPageNumber();
            _pageCount = _searchResult.getTotalPageNumber();
            var _totalResultCount = _searchResult.getTotalResultCount();
            if(result.length !=  0) {
                for(var i = 0; i < result.length; i++) {
                    var container = result[i].getContainer();
                    $(_resultList).append(container);
                }
            }
            else {
                 $(_errorEmptyText).text(_errorText).show();
            }

            /* Page handling */
            /* Calculate the start and end page */
            var startPage = (_currentPage - 2 > 1) ? (_currentPage - 2) : 1;
            var endPage = (_currentPage + 2 < _pageCount) ? (_currentPage + 2) : _pageCount;
            $(_bottomNavigationBar).html("");

            /* Check if the back label should be shown */
            if(_currentPage > 1) {
                var pageBack = $('<span id="pageBack subtitleText"></span>').html('<img class="navigationArrow" src="img/icons/arrow_left_blue.png" /> ');
                $(_bottomNavigationBar).append(pageBack);
                pageBack.click(function() {
                    _queryObject.setPreviousPage();
                    $(this).unbind("click");
                    _callSearch();
                });
            }

            /* List the valid page numbers */
            for(var i = startPage; i <= endPage; i++) {
                if(i == _currentPage) {
                    $(_bottomNavigationBar).append('&nbsp;&nbsp;<b><span class="pageNav subtitleText">' + i + '</span></b>&nbsp;&nbsp;');
                } else {
                    $(_bottomNavigationBar).append('&nbsp;&nbsp;<span class="pageNav subtitleText">' + i + '</span></b>&nbsp;&nbsp;');
                }
            }

            /* Check if the next label should be shown */
            if(_currentPage < _pageCount) {
                var pageNext = $('<span id="pageNext subtitleText"></span>').html(' <img class="navigationArrow" src="img/icons/arrow_right_blue.png" />');
                $(_bottomNavigationBar).append(pageNext);
                pageNext.click(function() {
                    _queryObject.setNextPage();
                    $(this).unbind("click");
                    _callSearch();
                });
            }

            /* Registers click function for the page numbers */
            $('.pageNav').click(function() {
                 _queryObject.setPage($(this).text());
                $('.pageNav').unbind("click");
                _callSearch();
            });

            /*
            *   Setting text of further actions container. Norid container is left empty, because the backend have not been implemented
            */

            var _querySearchText = _queryObject.getSearchText();

            if(_querySearchText.length > 0){
            $(_brreg).text(Localization.getString("waitingForResponseNORID"));
               $(_otherServices).show();
               _noridLookup = new Visma.Integration.Norid(_querySearchText, function() {
                    if(_noridLookup.domainIsAvailable() == "FREE"){
                        $(_norid).text(Localization.getString("availableAtNorid"));
                    }else{
                        $(_norid).text(Localization.getString("takenAtNorid"));
                    }
               });

              $(_brreg).text(Localization.getString("waitingForResponseBRREG"));
               Visma.Integration.BrregFactory('"'+_querySearchText+'"', function(data) {
               _brregResult = data;
               if(data.getResultCount() == "0"){

                   $(_emptyTradeMarkResult).show();
                   $(_emptyTradeMarkResult).text(Localization.getString("emptyTradeMarkButtonText"));

                   $(_brreg).text(Localization.getString("uniqOpertunity"));
                   $(_brreg).unbind("click");
                   $(_brreg).click(function(){
                       window.open('http://www.brreg.no/registrering/', '_system');
                   });
               }else{
                   $(_emptyTradeMarkResult).hide();
                   $(_brreg).text(data.getResultCount()+" "+Localization.getString("atBrreg"));
                   $(_brreg).unbind("click");
                   $(_brreg).click(function(){
                       ScreenManager.changeScreen(new Visma.Screens.BrregScreen(_brregResult));
                   });
               }
               });

           }
            else{

                $(_brreg).text("");
                $(_norid).text("");
                $(_otherServices).hide();
            };

            if(_totalResultCount > 0) {
                var resultText = Localization.getString("pluralHits");
                if(_totalResultCount == 1) {
                    resultText = Localization.getString("hit");
                }
                $(_searchNumberOfHits).text(Localization.getString("yourSearchResulted")+" "+_totalResultCount+" "+resultText);
            }
           else{
               $(_searchNumberOfHits).html("")
            }
        };

        /**
        *   Creates new search, calls for the _populate function.
        *   The object is stored in _searchResult.
        **/
        var _callSearch = function() {
            _searchResult = new Visma.Lookup.Search(_queryObject.getQueryString(), _populate);
        };

        /**
        *   Fetches data from forms and storing the data in _queryObject.
        **/

        var _fetchFormDataToQuery = function() {
            var fromDate=$(_dateFrom).val();
            var toDate=$(_dateTo).val();
            if(ValidateDate(fromDate)&&ValidateDate(toDate)){
                $(_dateErrorContainer).empty();
            }else{
                $(_dateErrorContainer).empty();
                $(_dateErrorContainer).append(Localization.getString("NotValidDate"));
            };

            _queryObject.setTradeMarkText($(_searchField).val());
            _queryObject.setFreeSearchText($(_freeTextSearch).val());
            _queryObject.setAgent($(_agent).val());
            _queryObject.setStatus($(_applicationStatus).val());
            _queryObject.setDateFrom($(_dateFrom).val());
            _queryObject.setDateTo($(_dateTo).val());
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
