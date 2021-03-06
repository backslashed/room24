'use strict';

R24.NavBox = ['$interpolate', '$animate', '$location', '$q', function($interpolate, $animate, $location, $q) {

    var directiveConfig = {
        restrict: 'E',
        replace: true,
        require: 'ngModel',
        scope: {
            'ngModel': '=',
            'activeSlide': '='
        },
        template: '<nav ng-class="boxClass"><section class="body"><h1></h1></section><ul></ul></nav>',
        link: constructor
    }

   function constructor(scope, elem) {
        var container    = angular.element(elem.children()[1]),
            header       = angular.element(elem.children()[0]).children(),
            itemTemplate = '<li><img src="{{thumbnail}}" alt="{{title}}" /><div class="hover-wrapper"><a href="#"><p>{{title}}<br /><span class="sep"> - </span>{{description}}<br /><span class="faded">{{agency}}</span></p></a></div><div class="overlay"></div></li>',
            boxTemplate  = '<li><img src="{{thumbnail}}" alt="{{title}}" /><div class="hover-wrapper"><a href="#"><p>{{title}}</p></a></div><div class="overlay"></div></li>',

            hideSlideFor = function(newSlide, oldSlide) {
                var all_     = $q.defer(),
                    header_  = $q.defer(),
                    boxes_  = $q.defer();

                $animate.addClass(header, 'getOut', function() {
                    $animate.removeClass(header, 'getIn', function() { header_.resolve(); });
                });

                TweenMax.staggerTo(container.children(), 0.3, { opacity: 0, scale: 0.95 }, 0.3 / oldSlide.items.length,
                    function() { boxes_.resolve(); });

                $q.all([ header_.promise, boxes_.promise ]).
                    then(function() { all_.resolve(newSlide); });

                return all_.promise;
            },

            showSlide = function(newItems) {
                var template = $interpolate(newItems.boxClass == 'boxes' ? boxTemplate : itemTemplate);

                header.html(newItems.body);

                $animate.removeClass(header, 'getOut', function() {
                    $animate.addClass(header, 'getIn');
                });

                container.html('');
                elem.removeClass('boxes boxes-items').addClass(newItems.boxClass);

                angular.forEach(newItems.items, function(item, key) {
                    var el = angular.element(template(item));

                    el.bind('click', function() {
                        TweenMax.to(window, 0.35, {scrollTo: {y: 0}});

                        if(newItems.boxClass === 'boxes') {
                            scope.activeSlide = key + 1;
                            scope.$apply();
                        } else {
                            hideSlideFor(void 0, newItems).then(function() {
                                $location.path('/category/' + newItems.category_id + '/' + item.id);
                            });
                            event.preventDefault();
                        }
                    });

                    container.append(el);
                });

                TweenMax.staggerTo(container.children(), 0.35, { opacity: 1, scale: 1 }, 0.04);
            };

        scope.$watch('ngModel', function(newSlide, oldSlide) {
            if(angular.isDefined(newSlide)) {
                if(angular.isDefined(oldSlide) && oldSlide !== newSlide && oldSlide.items.length > 0) {
                    hideSlideFor(newSlide, oldSlide).then(showSlide);
                } else {
                    showSlide(newSlide);
                }
            }
        });
    }

    return directiveConfig;
}];