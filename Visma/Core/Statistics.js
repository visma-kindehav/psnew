

(function() {
    /**
    *   Wrapper for Google Analytics
    **/
    Visma.Core.Statistics = function() {

        /* Initialize Google Analytics */
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','lib/analytics.js','ga');

        if(!device.uuid) {
            device.uuid = Math.random();
        }

        ga('create', Globals.GOOGLE_ANALYTICS_KEY, {
           'storage': 'none',
           'clientId': device.uuid + ""
        });

        return {
            logPageView : function(page) {
                ga('send', 'pageview', {
                    'page': page + "",
                    'title': page + ""
                });
            },

            logEvent : function(category, action, label) {
                ga('send', 'event', category, action, label);
            }
        };
    };
}) ();