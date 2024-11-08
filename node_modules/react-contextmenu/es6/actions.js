"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MENU_SHOW = exports.MENU_HIDE = void 0;
exports.dispatchGlobalEvent = dispatchGlobalEvent;
exports.hideMenu = hideMenu;
exports.showMenu = showMenu;

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MENU_SHOW = 'REACT_CONTEXTMENU_SHOW';
exports.MENU_SHOW = MENU_SHOW;
var MENU_HIDE = 'REACT_CONTEXTMENU_HIDE';
exports.MENU_HIDE = MENU_HIDE;

function dispatchGlobalEvent(eventName, opts) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  // Compatibale with IE
  // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
  var event;

  if (typeof window.CustomEvent === 'function') {
    event = new window.CustomEvent(eventName, {
      detail: opts
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, true, opts);
  }

  if (target) {
    target.dispatchEvent(event);
    (0, _objectAssign["default"])(_helpers.store, opts);
  }
}

function showMenu() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var target = arguments.length > 1 ? arguments[1] : undefined;
  dispatchGlobalEvent(MENU_SHOW, (0, _objectAssign["default"])({}, opts, {
    type: MENU_SHOW
  }), target);
}

function hideMenu() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var target = arguments.length > 1 ? arguments[1] : undefined;
  dispatchGlobalEvent(MENU_HIDE, (0, _objectAssign["default"])({}, opts, {
    type: MENU_HIDE
  }), target);
}