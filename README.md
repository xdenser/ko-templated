ko-templated is binding for knockout.

Allows asynchronous loading of templates.

How to use.

Here is sample code:

function SubModel(){
  this.anotherField = ko.observable('Hello !')
}

function ViewModel(){
  this.someField = ko.observable();
  this.someSubModel = new SubModel();
}

ko.applyBindings(new ViewModel());



Sample markup in


