"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callIfExists = callIfExists;
exports.cssClasses = exports.canUseDOM = void 0;
exports.hasOwnProp = hasOwnProp;
exports.store = void 0;
exports.uniqueId = uniqueId;

function callIfExists(func) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return typeof func === 'function' && func.apply(void 0, args);
}

function hasOwnProp(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function uniqueId() {
  return Math.random().toString(36).substring(7);
}

var cssClasses = {
  menu: 'react-contextmenu',
  menuVisible: 'react-contextmenu--visible',
  menuWrapper: 'react-contextmenu-wrapper',
  menuItem: 'react-contextmenu-item',
  menuItemActive: 'react-contextmenu-item--active',
  menuItemDisabled: 'react-contextmenu-item--disabled',
  menuItemDivider: 'react-contextmenu-item--divider',
  menuItemSelected: 'react-contextmenu-item--selected',
  subMenu: 'react-contextmenu-submenu'
};
exports.cssClasses = cssClasses;
var store = {};
exports.store = store;
var canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;