!function(t,e){function n(){var t=o.useWebComponents,n=e.Create.apply(e,arguments),a=n.prototype.constructor,c={restrict:"E"};return"string"==typeof a.templateUrl&&(c.templateUrl=a.templateUrl),c.controller=["$scope","$element","$attrs",function(t,e,n){var o=e[0];Object.setPrototypeOf(o,a.prototype),o.$scope=t,o.$element=e,o.$attrs=n,o.createdCallback(),o.attachedCallback(),t.$on("$destroy",function(){o.detachedCallback()}),"undefined"!=typeof a.attributes&&Array.isArray(a.attributes)&&a.attributes.forEach(function(t){r(o,n,t)})}],o.useWebComponents=t,function(){return c}}function r(t,e,n){e.$observe(n,function(e,r){t.attributeChangedCallback(n,r,e)})}if("undefined"==typeof e)throw console.warn("Cannot find DNA library."),"Cannot find DNA library.";var o=e.Config;e.ngCreate=n}(this,DNA);