(function() {
    /** Handles all Contact info content **/
    Visma.Screens.ContactInfoScreen = function() {

        var _containerId = "#contactInfoScreen";
        var _backButtonContactInfo = "#backButtonContactInfo";

        /** Load and register everything **/
        var _load = function() {
            _unload();

            if(Localization.getLanguage() == "nb-NO") {
                $(_containerId).find('.pageContent').html(
                '<div class="textInformationContainer">' +
                     '<div class="informationTextTitle">  Telefon: </div>' +
                        '<div class="informationText"> <p> <a class="plainLink" href="tel:+4722387300"> +47 22 38 73 00</a> (sentralbord) </p> </div>' +
                        '<br>' +

                     '<div class="informationTextTitle"> Telefaks: </div>' +
                        '<div class="informationText"> <p>  +47 22 38 73 01 </p> </div>' +
                        '<br>' +

                     '<div class="informationTextTitle"> E-postadresse: </div>' +
                        '<div class="informationText"> <p> <a class="plainLink" href="mailto:mail@patentstyret.no">mail@patentstyret.no</a> (alle henvendelser) </p> </div>' +
                        '<br>' +

                     '<div class="informationTextTitle"> Postadresse: </div>' +
                         '<div class="informationText"> <p> Patentstyret <br> Postboks 8160 Dep. <br> N-0033 Oslo <br> </p> </div>' +
                         '<br>' +

                     '<div class="informationTextTitle"> Besøksadresse: </div>' +
                        '<div class="informationText"> <p> Sandakerveien 64 <br> 0484 Oslo </p> </div>'  +
               '</div>');
            }
            else {
                $(_containerId).find('.pageContent').html(

                '<div class="textInformationContainer">' +
                     '<div class="informationTextTitle">  Phone: </div>' +
                        '<div class="informationText"> <p> <a class="plainLink" href="tel:+4722387300"> +47 22 38 73 00</a> (switchboard) </p> </div>' +
                        '<br>' +

                     '<div class="informationTextTitle">  Fax: </div>' +
                        '<div class="informationText"> <p>  +47 22 38 73 01 </p> </div>' +
                        '<br>' +

                     '<div class="informationTextTitle"> E-mail: </div>' +
                        '<div class="informationText"> <p> <a class="plainLink" href="mailto:mail@patentstyret.no"> mail@patentstyret.no </a> (all enquiries) </p> </div>' +
                        '<br>' +

                     '<div class="informationTextTitle"> Postal address: </div>' +
                         '<div class="informationText"> <p> Patentstyret <br> PO Box 8160 Dep. <br> N-0033 Oslo <br> </p> </div>' +
                         '<br>' +

                     '<div class="informationTextTitle"> Street address: </div>' +
                        '<div class="informationText"> <p> Sandakerveien 64 <br> 0484 Oslo </p> </div>'  +
                '</div>');

            }

            /* Get localized strings */
            $('#contactInfoHeaderTitle').text(Localization.getString("contactUs"));

            /* Unregister listeners */
            $(_backButtonContactInfo).click(function() {
                ScreenManager.back();
            });

            /* Display content */
            $(_containerId).show();


            /* Adjust top margin of page content based on the height of the navigation bar */
            var marginHeight = $(_containerId).find('.navBar').outerHeight(true);
            $(_containerId).find('.pageContent').css('margin-top', marginHeight);
        }


        /** Unload and unregister everything **/
        var _unload = function() {
            $(_backButtonContactInfo).unbind("click");

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
