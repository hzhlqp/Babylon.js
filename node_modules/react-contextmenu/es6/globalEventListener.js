"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = require("./actions");

var _helpers = require("./helpers");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GlobalEventListener = /*#__PURE__*/_createClass(function GlobalEventListener() {
  var _this = this;

  _classCallCheck(this, GlobalEventListener);

  _defineProperty(this, "handleShowEvent", function (event) {
    for (var id in _this.callbacks) {
      if ((0, _helpers.hasOwnProp)(_this.callbacks, id)) _this.callbacks[id].show(event);
    }
  });

  _defineProperty(this, "handleHideEvent", function (event) {
    for (var id in _this.callbacks) {
      if ((0, _helpers.hasOwnProp)(_this.callbacks, id)) _this.callbacks[id].hide(event);
    }
  });

  _defineProperty(this, "register", function (showCallback, hideCallback) {
    var id = (0, _helpers.uniqueId)();
    _this.callbacks[id] = {
      show: showCallback,
      hide: hideCallback
    };
    return id;
  });

  _defineProperty(this, "unregister", function (id) {
    if (id && _this.callbacks[id]) {
      delete _this.callbacks[id];
    }
  });

  this.callbacks = {};

  if (_helpers.canUseDOM) {
    window.addEventListener(_actions.MENU_SHOW, this.handleShowEvent);
    window.addEventListener(_actions.MENU_HIDE, this.handleHideEvent);
  }
});

var _default = new GlobalEventListener();

exports["default"] = _default;