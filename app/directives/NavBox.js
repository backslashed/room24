'use strict';

// Why oh why Gabriel must thy have this chunk of spaghetti? Because ngAnimate seems to misbehave when
// applied on a repeater with stagger in Angular version 1.2 so we'll have to take compiling matters into
// our own hands and animate using TweenMax.

R24.NavBox = ['$interpolate', '$animate', '$location', function($interpolate, $animate, $location) {

    var linkFn = function(scope, elem, attr) {
        var container    = angular.element(elem.children()[1]),
            header       = angular.element(elem.children()[0]).children(),
            itemTemplate = '<li><img src="{{thumbnail}}" alt="{{title}}" /><a href="#/category/{{category_id}}/{{id}}"><p>{{title}}<br />{{description}}<br /><span class="faded">{{agency}}</span></p></a><div class="overlay"></div></li>',
            boxTemplate  = '<li><img src="{{thumbnail}}" alt="{{title}}" /><a><p>{{title}}</p></a><div class="overlay"></div></li>',

            popOldItems = function(items) {
                TweenMax.staggerTo(items, 0.3, { opacity: 0, scale: 0.95 }, 0.35 / items.length);
            },

            pushNewItems = function(newItems) {
                var template = $interpolate(newItems.boxClass == 'boxes' ? boxTemplate : itemTemplate);

                container.html('');

                elem.removeClass('boxes boxes-items').addClass(newItems.boxClass);

                angular.forEach(newItems.items, function(item, key) {
                    var el = angular.element(template(item));

                    el.bind('click', function() {
                        if(newItems.boxClass === 'boxes') {
                            scope.activeSlide = key + 1;
                            scope.$apply();
                        } else {
                            $animate.addClass(header, 'getOut', function () {
                                $location.path('/category/' + item.category_id + '/' + item.id);
                                scope.$apply();
                            });

                            popOldItems(container.children());
                            event.preventDefault();
                        }
                    });

                    container.append(el);
                });

                TweenMax.staggerTo(container.children(), 0.35, { opacity: 1, scale: 1 }, 0.05);
            };

        scope.$watch('ngModel', function(newVal, oldVal) {
            if(angular.isDefined(newVal)) {
                if(angular.isDefined(oldVal) && oldVal !== newVal && oldVal.items.length > 0) {
                    $animate.addClass(header, 'getOut', function() {
                        header.html(newVal.body);
                        pushNewItems(newVal);
                        $animate.removeClass(header, 'getOut');
                    });

                    popOldItems(container.children());
                } else {
                    header.html(newVal.body);
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