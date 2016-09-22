
(function () {
    'use strict'
    var $document = $(document),
        initModule = moduleInitializedPopup();

    $document.ready(function () {       
        initModule.init();
    });

    function moduleInitializedPopup() {
        var DEFAULT_CONFIG = {
            holder: this,
            event: 'click',
            interface: 'popupLoader',
            container: null
        },
            DOM_SELECTORS = {
                popup: '.outerContainerForPopup',
                container: '.contentContainer',
                whithDataPopup: '[data-popup]',
                closeBtn: '.closeBtn'
            },
            hendlers = {
                popupLoader: _popupLoader
            },
            defaultContext = document,
            $container,
            $popup;

        function initializeHandlers(context) {
            var $closeBtn,
                $allElement,
                context;

            if (context === undefined) {
                context = defaultContext;
            }

            $popup = $(DOM_SELECTORS.popup, context).dialog({
                autoOpen: false,                
                closeOnEscape: false,                              
                closeText: "",
                width: "auto",
                maxWidth: 400
            });
            $container = $(DOM_SELECTORS.container, context);
            $allElement = $(DOM_SELECTORS.whithDataPopup, context);
            $closeBtn = $(DOM_SELECTORS.closeBtn, context);

            $allElement.each(function (index, element) {
                var $element = $(element),
                    config = {};

                config = $.extend({}, DEFAULT_CONFIG, $element.data("popup"));
                _assignmentHandler($element, config, context);
            });

            $closeBtn.bind(
                'click', function (e) {
                    _closePopup();
                });
        }

        function _assignmentHandler($element, config, context) {
            var $content = $(config.container, context);

            $element.bind(
                config.event, function (e) {
                    hendlers[config.interface]($content)
                }
            );
        };

        function _closePopup() {
            $popup.dialog('close');
            $container.empty();
        }

        function _popupLoader($contant) {
            $popup.dialog('open');
            $container.append($contant);
            $contant.removeClass('hidden');
        }

        return {
            init: initializeHandlers
        }
    }
} ());