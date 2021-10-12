/* eslint-disable no-extra-semi */
if (typeof Object.assign != 'function') {
  Object.assign = function (target) {
    'use strict'
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    target = Object(target)
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index]
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
    }
    return target
  }
}

// append IE 11
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// closest IE 11
;(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      let node = this
      while (node) {
        if (node.matches(css)) return node
        node = node.parentElement
      }
      return null
    }
  }
})()

// matches IE 11
;(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector
  }
})()

// Array.form IE 11
if (!Array.from) {
  Array.from = function (object) {
    'use strict'

    return [].slice.call(object)
  }
}

// forEach IE 11
if ('HTMLCollection' in window && !HTMLCollection.prototype.forEach) {
  HTMLCollection.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window
    for (let i = 0; i < this.length; i += 1) {
      callback.call(thisArg, this[i], i, this)
    }
  }
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

// remove IE 11
// Element.prototype.remove = function () {
//   this.parentElement.removeChild(this)
// }
// NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
//   for (let i = this.length - 1; i >= 0; i -= 1) {
//     if (this[i] && this[i].parentElement) {
//       this[i].parentElement.removeChild(this[i])
//     }
//   }
// }


if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
  };
}