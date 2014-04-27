
R24.NavBox = ['$interpolate', function($interpolate) {

    var linkFn = function(scope, elem, attr) {
        var container    = angular.element(elem.children()[1]),
            header       = angular.element(elem.children()[0]).children(),
            itemTemplate = '<li><img src="{{thumbnail}}" alt="{{title}}" /><a href="#/category/{{category_id}}/{{id}}"><p>{{title}}<br />{{description}}<br /><span class="faded">{{agency}}</span></p></a><div class="overlay"></div></li>',
            boxTemplate  = '<li><img src="{{thumbnail}}" alt="{{title}}" /><a href="#"><p>{{title}}</p></a><div class="overlay"></div></li>';

        var pushNewItems = function(newItems) {
            var template = $interpolate(newItems.boxClass == 'boxes' ? boxTemplate : itemTemplate),
                animationElements = [];

            container.html('');
            header.html(newItems.body);

            elem.removeClass('boxes boxes-items').addClass(newItems.boxClass);

            angular.forEach(newItems.items, function(item, key) {
                var el = angular.element(template(item));

                if(newItems.boxClass === 'boxes') {
                    el.bind('click', function() {
                        scope.activeSlide = key + 1;
                        scope.$apply();
                    });
                }

                animationElements.push(el);
                container.append(el);
            });

            TweenMax.staggerTo(container.children(), 0.5, { opacity: 1, scale: 1 }, 0.07);
        }

        scope.$watch('ngModel', function(newVal, oldVal) {
            if(angular.isDefined(newVal)) {
                if(angular.isDefined(oldVal) && oldVal !== newVal && oldVal.items.length > 0) {
                    TweenMax.staggerTo(container.children(), 0.5, { opacity: 0, scale: 0.8 }, 0.07, function() {
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
            'ngModel': '=',
            'activeSlide': '='
        },
        template: '<nav ng-class="boxClass"><section class="body"><h1></h1></section><ul></ul></nav>',

        link: linkFn
    }
}];