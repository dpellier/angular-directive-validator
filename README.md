Description
===========
This directives allow you to check if the value set in a control inside a form is correct.

Installation
============
You can add this directives as a dependency with bower :
```
"validator": "git://github.com/dpellier/angular-directive-validator"
```

Or you can just add directly the script in your application.

Include the script and add the dependency into your app.
```
angular.module('myModule', ['validator']);
```

Usage
=====

In your html, add the directive on an control you want to validate :
```
<input ng-model="model" integer />
```

The validation is done either when the user type some value or when the model value is updated directly.

If an error is detected, the $valid param of the input is set to false and an error is raised.


Current validator :
* integer : accept only digit. Will raise the error 'integer' ==> {{yourForm.yourControl.$error.integer}}.
* float : accept digit separated by a single dot or comma. Will raise the error 'float' ==> {{yourForm.yourControl.$error.float}}.

