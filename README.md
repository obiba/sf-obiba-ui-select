Schema Form ui-select Add-on
============================
 
**sf-obiba-ui-select** add-on 

Installation
------------

```
$ bower install sf-obiba-ui-select --save
```

Alternatively:

```
$ bower install https://github.com/obiba/sf-obiba-ui-select.git#<release-number> --save
```


Make sure to include `sf-obiba-ui-select.min.js` in your index file and load the module in your application:

```
var myModule = angular.module('myModule', [
 ...
 'sfObibaUiSelect',
]);
```

Usage
-----

The Schema:

```
"countries": {
  "type": "object",
  "properties": {
    "name": {
      "type": "array",
      "format": "obibaUiSelect",
      "title": "Name",
      "description": "Name or alias"
    }
  }
}
```

The Definition:

```
{
  "type":"obibaUiSelect",
  "key":"countries"
}
```

The Options

To populate the ui-select auto complete list you need to pass them to the form default options:

```
$scope.sfOptions = {formDefaults: { items: [{value: value1, label: label1}, ...]}};
```

If your list uses different `value` and `label` names, you can customize them through the `form.autoComplete` option:

```
{
{
  "type":"obibaUiSelect",
  "key":"countries",
  "autoComplete: {
    "value": "code", 
    "label": "name"
  }
}
```

_The default names are `value` and `label`_.    

If you wish to format the auto complete list use the `form.autoComplete.format`:

```
{
  "type":"obibaUiSelect",
  "key":"countries",
  "autoComplete: {
    "value": "code", 
    "label": "name",
    "format": ":value - :label"
  }
}
```

The above format will list the auto complete as:

```
CAN - Canada
USA - United States of America
```

_The default format is `':label (:value)'`_.
