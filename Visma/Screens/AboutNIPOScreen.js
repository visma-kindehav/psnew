(function() {
    /**
    *   Handles the About screen
    **/
    Visma.Screens.AboutNIPOScreen = function(query) {

        var _containerId = "#aboutScreen";
        var _backButton = "#backToInformationScreenFromAbout";
        var _aboutNIPOContainer = '#aboutPatentstyretContainer';

        /* About NIPO Info text */
        var _aboutPatentstyret_NO =
                                      '<div class="textInformationContainer">' +
                                        '<div class="informationTextTitle"> Et nasjonalt kompetansesenter for industrielt rettsvern </div>' +
                                            '<div class="informationText">' +
                                            '<img src="img/nipo_building.jpg" id="aboutNipoImg">' +
                                            '<p> Patentstyret er en statlig etat under Nærings- og handels-departementet. </p>' +
                                            '<p> Patentstyret hjelper norsk næringsliv å styrke virksomheten sin gjennom ' +
                                            'kunnskap om industrielle rettigheter - slik at bedriftene vil sikre sine ' +
                                            'investeringer, konkurranseposisjoner og skape økonomisk vekst i det norske ' +
                                            'samfunnet. Patentstyrets hovedoppgave er å behandle søknader om patenter, ' +
                                            'varemerke- og designregistreringer. </p>' +
                                            Localization.getString("for_more_info") +
                                            '<a class="newsTitle" href="#" onclick="window.open(\''+Localization.getString("URL_about_NIPO")+'\', \'_system\');">' +
                                            ' Patentstyret sine nettsider. </a>' +
                                        '</div>' +
                                     '</div>';



       var _aboutPatentstyret_GB =
                                     '<div class="textInformationContainer">' +
                                        '<div class="informationTextTitle"> A national centre of competence for industrial property rights  </div>' +
                                           '<div class="informationText">' +
                                           '<img src="img/nipo_building.jpg" id="aboutNipoImg">' +
                                           '<p> The Norwegian Industrial Property Office (NIPO) is a government authority ' +
                                           'organized under the Ministry of Trade and Industry. </p>' +
                                           '<p> NIPO\'s primary role is to support Norwegian industry ' +
                                           'and promote economic growth. Raising awareness and increasing understanding of industrial property rights ' +
                                           'is an essential element in enabling companies to secure their investments and develop a competitive edge in ' +
                                           'the global market. NIPO is responsible for processing applications for patent protection, and for trademark ' +
                                           'and design registration. </p>' +
                                           Localization.getString("for_more_info")+ '<a class="newsTitle" href="#" onclick="window.open(\''+ Localization.getString("URL_about_NIPO") +'\', \'_system\');">' +
                                           ' NIPO\'s website. </a>' +
                                       '</div>';
                                      '</div>'


        /**
        *   Loads and registers all content
        **/
        var _load = function() {
            _unload();

            /* Get localized strings */

            $('#aboutPatentstyretHeaderTitle').text(Localization.getString("aboutPS"));

            /* Set text information */
            if(Localization.getLanguage() == "nb-NO"){
                 $(_aboutNIPOContainer).html(_aboutPatentstyret_NO);
            }else{
                 $(_aboutNIPOContainer).html(_aboutPatentstyret_GB);
            }

            $(_backButton).click(function() {
                ScreenManager.back();
            });

            $(_containerId).show();


            /* Adjust top margin of page content based on the height of the navigation bar */
            var marginHeight = $(_containerId).find('.navBar').outerHeight(true);
            $(_containerId).find('.pageContent').css('margin-top', marginHeight);
        };


        /**
        *   Unregister and unload everything
        **/
        var _unload = function() {
            $(_backButton).unbind("click");
            $(_aboutNIPOContainer).html("");
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
