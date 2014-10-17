###ko-templated is a binding for [knockout](http://knockoutjs.com/).
##Install
npm install ko-templated

##Description

Allows asynchronous loading of templates.
Uses jQuery for template loading.
The main idea is to use view model's or sub model's constructor name as name of template.
Binding encourages using of `new` for constructing view models or sub models.  
So when you try to use it on plain javascript object it will load "Object.tmpl".
You may override naming convention by defining `templateName` property in object.
It may also be observable.

By default binding loads template from 'templates' sub directory.
You may override it with `templatePath` property, String or observable.


##Code

Here is sample code in viewModel.js:
```javascript
function SubModel(){
  this.anotherField = ko.observable('World !')
}

function ViewModel(){
  this.someField = ko.observable('Hello ');
  this.someSubModel = new SubModel();
}

ko.applyBindings(new ViewModel());
```

##Markup
Sample markup in main file:
```html
<!DOCTYPE HTML>
<html>
<head>
    <title>Sample ko-templated binding</title>
    <script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
    <script src='http://knockoutjs.com/downloads/knockout-2.3.0.js'></script>
    <script src='ko-templated.js'></script>
    <script src='viewModel.js'></script>
</head>
<body data-bind='templated: $data'>
</body>
</html>
```

Template for ViewModel in templates/ViewModel.tmpl:
```html
<span data-bind='text:someField'></span>
<!-- ko templated: someSubModel -->
<!-- /ko -->
```

Template for SubModel in templates/SubModel.tmpl:
```html
<span data-bind='text:anotherField'></span>
```


