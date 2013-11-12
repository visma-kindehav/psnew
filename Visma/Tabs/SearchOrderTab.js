(function() {
    /**
    *   Handles the search order tab
    **/
    Visma.Tabs.SearchOrderTab = function() {
        var _content;

        /* Creates a sortable HTML element */
        var _createElement = function(description, firstSelector, secondSelector) {
            var container = $('<div></div>');
            var description = $('<div style="float:left;">' + description + '</div>');
            var selectors = $('<div style="float:right;">' + firstSelector + '&nbsp;&nbsp;&nbsp;' + secondSelector + '</div>');
            container.append(description);
            container.append(selectors);

            return container;
        };

        /**
        *   Constructor
        **/
        (function() {
            _content = $('<div></div>');
            _content.append(_createElement());
            _content.append('<div class="clear"></div>');
        }) ();

        return {
            create : function() {

            },

            dispose : function() {

            },

            getContent : function() {
                return _content;
            }
        };
    };
}) ();