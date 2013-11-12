(function() {
    Visma.Lookup.HTTPRequest = function(destination, success, error, contentType) {
        var STATUS_IDLE = 0;
        var STATUS_OPEN = 1;
        var STATUS_LOADED = 2;
        var STATUS_WORKING = 3;
        var STATUS_DONE = 4;

        var req = new XMLHttpRequest();
        req.open('GET', destination, true);

        if(contentType) {
            req.setRequestHeader("Content-Type", contentType);
        }
        else {
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }

        req.onreadystatechange = function(aEvt) {
            if(req.readyState == STATUS_DONE) {
                if(req.status == 200) {
                    if(success) {
                        success(req.responseText);
                    }
                }
                else {
                    if(error) {
                        error("Response returned with error code: " + req.status);
                    }
                }
            }
        };

        req.send(null);
    };

}) ();