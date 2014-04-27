
R24.NavBox = ['$interpolate', function($interpolate) {

    var linkFn = function(scope, elem, attr) {
        var container    = elem.children(),
            itemTemplate = '<li><img src="{{thumbnail}}" alt="{{title}}" /><a><p>{{title}}<br />{{description}}<br /><span class="faded">{{agency}}</span></p></a><div class="overlay"></div></li>',
            boxTemplate  = '<li><img src="{{thumbnail}}" alt="{{title}}" /><a><p>{{title}}</p></a><div class="overlay"></div></li>';

        var pushNewItems = function(newItems) {
            var template = $interpolate(newItems.boxClass == 'boxes' ? boxTemplate : itemTemplate),
                animationElements = [];

            container.html('');

            elem.removeClass('boxes boxes-items').addClass(newItems.boxClass);

            angular.forEach(newItems.items, function(item, key) {
                var el = template(item);
                animationElements.push(el);
                container.append(el);
            });

            TweenMax.staggerTo(container.children(), 0.5, { opacity: 1, scale: 1 }, 0.1);
        }

        scope.$watch('ngModel', function(newVal, oldVal) {
            if(angular.isDefined(newVal)) {
                if(angular.isDefined(oldVal)) {
                    TweenMax.staggerTo(container.children(), 0.5, { opacity: 0, scale: 0.8 }, 0.1, function() {
                        pushNewItems(newVal);
                    });
                } else {
                    pushNewItems(newVal);
                }
            }
        });
    }

    return {
        restrict: 'E',
        replace: true,
        require: 'ngModel',
        scope: {
            'ngModel': '='
        },
        template: '<nav ng-class="boxClass"><ul></ul></nav>',

        link: linkFn
    }
}];