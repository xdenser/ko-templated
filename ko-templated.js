!function () {

    function definer($, ko) {
        var loading = {}, loaded = {};
        ko.bindingHandlers.templated = {
            init:function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var templated = valueAccessor();

                var templatePath = templated.templatePath ? ko.utils.unwrapObservable(templated.templatePath) : 'templates/',
                    templateName = templated.templateName ? ko.utils.unwrapObservable(templated.templateName) : (
                        templated.constructor ? templated.constructor.name : null
                        );
                if (!templateName) throw new Error('No template name for ' + templated);

                var url = templatePath + templateName + '.tmpl';

                function apply() {

                    var nodes = ko.utils.parseHtmlFragment(loaded[url]);
                    ko.virtualElements.setDomNodeChildren(element, nodes);
                    ko.applyBindingsToDescendants(bindingContext.createChildContext(templated), element);
                    if (templated.afterRender) templated.afterRender(element, nodes);

                }



                if (loading[url]) {
                    loading[url].then(apply)
                }
                else if (loaded[url]) {
                    apply();
                }
                else{

                    if (typeof $ == 'undefined') $ = jQuery;
                    if (typeof $ == 'undefined') throw new Error('No jQuery found');

                    loading[url] = $.get(url, function (res) {
                        loaded[url] = res;
                        apply();
                    }, 'text');
                }

                return { controlsDescendantBindings:true };
            }
        }
        ko.virtualElements.allowedBindings['templated'] = true;
    }


    if (typeof define === 'function' && define['amd']) define(['jquery','knockout'],definer);
    else definer(jQuery,ko);

}();