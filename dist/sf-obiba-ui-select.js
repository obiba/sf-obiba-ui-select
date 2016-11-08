angular.module("sfObibaUiSelectTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("src/templates/sf-obiba-ui-select.html","<div class=\"form-group\"\n     ng-controller=\"sfObibaUiSelectController\"\n     ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }\"\n     schema-validate=\"form\" sf-field-model >\n  <!--<pre>{{form|json}}</pre>-->\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <ui-select multiple=\"multiple\" theme=\"bootstrap\" sf-field-model ng-model=\"$$value$$\" reset-search-input=\"true\">\n    <ui-select-match><span ng-bind-html=\"$item[form.autoComplete.label]\"></span></ui-select-match>\n    <ui-select-choices repeat=\"item[form.autoComplete.value] as item in form.items | filter: $select.search\">\n      {{formatList(item)}}\n    </ui-select-choices>\n  </ui-select>\n  <span class=\"help-block\" sf-message=\"form.description\"></span>\n</div>\n");}]);
angular.module('sfObibaUiSelect', [
  'schemaForm',
  'ui.select',
  'sfObibaUiSelectTemplates'
]).config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider, sfPathProvider) {

    var sfObibaUiSelect = function (name, schema, options) {
      if (schema.type === 'array' && schema.format == 'obibaUiSelect') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'obibaUiSelect';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.array.unshift(sfObibaUiSelect);

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',           // Name of the decorator you want to add to.
      'obibaUiSelect',                      // Form type that should render this add-on
      'src/templates/sf-obiba-ui-select.html',  // Template name in $templateCache
      sfBuilderProvider.stdBuilders   // List of builder functions to apply.
    );

  }])
  .controller('sfObibaUiSelectController', ['$scope', function ($scope) {
    $scope.$watch('ngModel.$modelValue', function () {
      if ($scope.ngModel.$validate) {
        // Make sure that allowInvalid is always true so that the model is preserved when validation fails
        $scope.ngModel.$options = $scope.ngModel.$options || {};
        $scope.ngModel.$options = {allowInvalid: true};
        $scope.ngModel.$validate();
        if ($scope.ngModel.$invalid) { // The field must be made dirty so the error message is displayed
          $scope.ngModel.$dirty = true;
          $scope.ngModel.$pristine = false;
        }
      }
      else {
        $scope.ngModel.$setViewValue(ngModel.$viewValue);
      }
    }, true);

    $scope.formatList = function(item) {
      return $scope.form.autoComplete.format
        .replace(':label', item[$scope.form.autoComplete.label])
        .replace(':value', item[$scope.form.autoComplete.value]);
    };

    $scope.$watch('form', function () {
      if ($scope.form) {
        $scope.form.autoComplete = $scope.form.autoComplete || {
            format: ':label (:value)',
            label: 'label',
            value: 'value'
          };
        $scope.form.disableErrorState = $scope.form.hasOwnProperty('readonly') && $scope.form.readonly;
      }
    });
  }]);
