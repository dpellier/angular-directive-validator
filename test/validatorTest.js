'use strict';

describe('Directive: validator', function() {
    var scope;

    /**
     * Setup
     */

    beforeEach(module('validator'));

    beforeEach(inject(function($rootScope) {
        scope = $rootScope;
    }));

    /**
     * Factory Tests
     */

    describe('Factory : validationService', function() {
        var validationService;
        var integer = /^\-?\d*$/;
        var float = /^\-?\d+((\.|,)\d+)?$/;

        beforeEach(inject(function(_validationService_) {
            validationService = _validationService_;
        }));

        it('should validate null value', function() {
            expect(validationService.validate(null)).toBeTruthy();
        });

        it('should validate empty value', function() {
            expect(validationService.validate('')).toBeTruthy();
        });

        it('should validate matching value', function() {
            expect(validationService.validate(123, integer)).toBeTruthy();
            expect(validationService.validate('123', integer)).toBeTruthy();
            expect(validationService.validate(123.45, float)).toBeTruthy();
            expect(validationService.validate('123.45', float)).toBeTruthy();
            expect(validationService.validate('123,45', float)).toBeTruthy();
        });

        it('should invalidate non matching value', function() {
            expect(validationService.validate('abc', integer)).toBeFalsy();
            expect(validationService.validate('abc', float)).toBeFalsy();
            expect(validationService.validate('1.2.3.4.5', integer)).toBeFalsy();
            expect(validationService.validate('1.2.3.4.5', float)).toBeFalsy();
        });
    });

    /**
     * Integer Tests
     */

    describe('Integer validation', function() {
        var element;

        beforeEach(inject(function($compile) {
            element = angular.element('<ng-form name="form"><input ng-model="model" name="input" integer></ng-form> ');

            $compile(element)(scope);
            scope.$digest();
        }));

        it('should validate value on parse', function() {
            scope.form.input.$setViewValue('123');
            scope.$apply();
            expect(scope.form.input.$valid).toBeTruthy();

            scope.form.input.$setViewValue('');
            scope.$apply();
            expect(scope.form.input.$valid).toBeTruthy();
        });

        it('should invalidate value on parse', function() {
            scope.form.input.$setViewValue('abc');
            scope.$apply();
            expect(scope.form.input.$valid).toBeFalsy();

            scope.form.input.$setViewValue('1.23');
            scope.$apply();
            expect(scope.form.input.$valid).toBeFalsy();
        });

        it('should validate value on unshift', function() {
            scope.model = '123';
            scope.$apply();
            expect(scope.form.input.$valid).toBeTruthy();

            scope.model = '';
            scope.$apply();
            expect(scope.form.input.$valid).toBeTruthy();
        });

        it('should invalidate value on unshift', function() {
            scope.model = 'abc';
            scope.$apply();
            expect(scope.form.input.$valid).toBeFalsy();

            scope.model = '1.23';
            scope.$apply();
            expect(scope.form.input.$valid).toBeFalsy();
        });
    });

    /**
     * Float Tests
     */

    describe('Float validation', function() {
        var element;

        beforeEach(inject(function($compile) {
            element = angular.element('<ng-form name="form"><input ng-model="model" name="input" float></ng-form> ');

            $compile(element)(scope);
            scope.$digest();
        }));

        it('should validate value on parse', function() {
            scope.form.input.$setViewValue('1.23');
            scope.$apply();
            expect(scope.form.input.$valid).toBeTruthy();

            scope.form.input.$setViewValue('12,3');
            scope.$apply();
            expect(scope.form.input.$valid).toBeTruthy();

            scope.form.input.$setViewValue('');
            scope.$apply();
            expect(scope.form.input.$valid).toBeTruthy();
        });

        it('should invalidate value on parse', function() {
            scope.form.input.$setViewValue('abc');
            scope.$apply();
            expect(scope.form.input.$valid).toBeFalsy();

            scope.form.input.$setViewValue('1.2.3');
            scope.$apply();
            expect(scope.form.input.$valid).toBeFalsy();
        });

        it('should validate value on unshift', function() {
            scope.model = '1.23';
            scope.$apply();
            expect(scope.form.input.$valid).toBeTruthy();

            scope.model = '12,3';
            scope.$apply();
            expect(scope.form.input.$valid).toBeTruthy();

            scope.model = '';
            scope.$apply();
            expect(scope.form.input.$valid).toBeTruthy();
        });

        it('should invalidate value on unshift', function() {
            scope.model = 'abc';
            scope.$apply();
            expect(scope.form.input.$valid).toBeFalsy();

            scope.model = '1.2.3';
            scope.$apply();
            expect(scope.form.input.$valid).toBeFalsy();
        });
    });
});