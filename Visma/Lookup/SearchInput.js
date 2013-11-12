(function() {
    /**
    *   Class for further specifying teh search
    **/
    Visma.Lookup.SearchInput = function() {

        var _searchText = "";
        var _tradeMarkText = "";
        var _Agent = "";
        var _status = 1;
        var _dateFrom = "";
        var _dateTo = "";
        var _orderDir = "";
        var _orderBy = "";
        var _page = 1;

        /**
        *   Returns the query string
        **/
        function generateQuery(){
            var queryString="";
            if(_searchText!=""){
                queryString+="searchText="+_searchText+"&";

            }
            if(_tradeMarkText!=""){
                queryString+="trademarkText="+_tradeMarkText+"&";
            }
            if(_Agent!=""){
                queryString+="applicant="+_Agent+"&";
            }
            if(_status != "1"){
                queryString+="status="+_status+"&";
            }
            if(_dateFrom!=""){
                queryString+="dateFrom="+_dateFrom+"&";
            }
            if(_dateTo!=""){
                queryString+="dateTo="+_dateTo+"&";
            }
            if(_orderDir!=""){
                queryString+="orderDir="+_orderDir+"&";
            }
            if(_orderBy!=""){
                queryString+="orderBy="+_orderBy+"&";
            }
            if(_page!=1){
                queryString+="page="+_page+"&";
            }
            if(queryString!=""){
                queryString+="language="+ Localization.getLanguage();
            }
            return queryString;
        }

        return {
            getQueryString : function() {
                return generateQuery();
            },
            setPage : function(page) {
                _page = page;
            },
            setFreeSearchText : function(searchText) {
                _searchText = searchText;
                _page = 1;
            },
            setTradeMarkText : function(tradeMarkText) {
                _tradeMarkText = tradeMarkText;
                _page = 1;
            },
            setAgent : function(agent) {
                _Agent = agent;
                _page = 1;
            },
            setStatus : function(status) {
                _status = status;
                _page = 1;
            },
            setDateFrom: function(dateFrom) {
                _dateFrom = dateFrom;
                _page = 1;
            },
            setDateTo: function(dateTo) {
                _dateTo = dateTo;
                _page = 1;
            },
            setOrderDir: function(orderDir) {
                _orderDir = orderDir;
                _page = 1;
            },
            setOrderBy: function(orderBy) {
                _orderBy = orderBy;
                _page = 1;
            },
            getSearchText: function() {
                return _tradeMarkText;
            },
            setNextPage: function(){
                _page++;
            },
            setPreviousPage: function(){
                if(_page>1){
                    _page--;
                }
            }

        };
    };

})();