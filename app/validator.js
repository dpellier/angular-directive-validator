'use strict';

angular.module('validator', []);

angular.module('validator').directive('integer', function(validationService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            var INTEGER_REGEXP = /^\-?\d*$/;

            ctrl.$parsers.unshift(function(value) {
                return validationService.parser(ctrl, value, INTEGER_REGEXP, 'integer');
            });

            ctrl.$formatters.unshift(function(value) {
                return validationService.formatter(ctrl, value, INTEGER_REGEXP, 'integer');
            });
        }
    };
});

angular.module('validator').directive('float', function(validationService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            var FLOAT_REGEXP = /^\-?\d+((\.|,)\d+)?$/;

            ctrl.$parsers.unshift(function(value) {
                return validationService.parser(ctrl, value, FLOAT_REGEXP, 'float');
            });

            ctrl.$formatters.unshift(function(value) {
                return validationService.formatter(ctrl, value, FLOAT_REGEXP, 'float');
            });
        }
    };
});

angular.module('validator').factory('validationService', function() {
    return {
        validate: function(value, regexp) {
            if (value == null || value === '') {
                return true
            }

            return regexp.test(value);
        },
        parser: function(ctrl, value, regexp, errorKey) {
            var valid = this.validate(value, regexp);
            ctrl.$setValidity(errorKey, valid);

            return valid ? value : undefined;
        },
        formatter: function(ctrl, value, regexp, errorKey) {
            ctrl.$setValidity(errorKey, this.validate(value, regexp));
            return value;
        }
    };
});