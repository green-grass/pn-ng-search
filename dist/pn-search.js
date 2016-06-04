/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */
(function () {

    'use strict';

    var filters = angular.module('pnSearchFilter', []);

    filters.filter('search', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    if (typeof props === 'string') {
                        var text = props.toLowerCase();
                        var keys = Object.keys(item);
                        for (var i = 0; i < keys.length; i++) {
                            var prop = keys[i];
                            if (item[prop] && (item[prop].toString().toLowerCase().indexOf(text) !== -1)) {
                                itemMatches = true;
                                break;
                            }
                        }
                    } else {
                        var keys = Object.keys(props);
                        for (var i = 0; i < keys.length; i++) {
                            var prop = keys[i];
                            var text = props[prop].toLowerCase();
                            if (item[prop] && (item[prop].toString().toLowerCase().indexOf(text) !== -1)) {
                                itemMatches = true;
                                break;
                            }
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                out = items;
            }

            return out;
        };
    });

})();
