"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _actions = require("./actions");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ContextMenuTrigger = /*#__PURE__*/function (_Component) {
  _inherits(ContextMenuTrigger, _Component);

  var _super = _createSuper(ContextMenuTrigger);

  function ContextMenuTrigger() {
    var _this;

    _classCallCheck(this, ContextMenuTrigger);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "touchHandled", false);

    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (event) {
      if (_this.props.holdToDisplay >= 0 && event.button === 0) {
        event.persist();
        event.stopPropagation();
        _this.mouseDownTimeoutId = setTimeout(function () {
          return _this.handleContextClick(event);
        }, _this.props.holdToDisplay);
      }

      (0, _helpers.callIfExists)(_this.props.attributes.onMouseDown, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function (event) {
      if (event.button === 0) {
        clearTimeout(_this.mouseDownTimeoutId);
      }

      (0, _helpers.callIfExists)(_this.props.attributes.onMouseUp, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseOut", function (event) {
      if (event.button === 0) {
        clearTimeout(_this.mouseDownTimeoutId);
      }

      (0, _helpers.callIfExists)(_this.props.attributes.onMouseOut, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchstart", function (event) {
      _this.touchHandled = false;

      if (_this.props.holdToDisplay >= 0) {
        event.persist();
        event.stopPropagation();
        _this.touchstartTimeoutId = setTimeout(function () {
          _this.handleContextClick(event);

          _this.touchHandled = true;
        }, _this.props.holdToDisplay);
      }

      (0, _helpers.callIfExists)(_this.props.attributes.onTouchStart, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchEnd", function (event) {
      if (_this.touchHandled) {
        event.preventDefault();
      }

      clearTimeout(_this.touchstartTimeoutId);
      (0, _helpers.callIfExists)(_this.props.attributes.onTouchEnd, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleContextMenu", function (event) {
      if (event.button === _this.props.mouseButton) {
        _this.handleContextClick(event);
      }

      (0, _helpers.callIfExists)(_this.props.attributes.onContextMenu, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseClick", function (event) {
      if (event.button === _this.props.mouseButton) {
        _this.handleContextClick(event);
      }

      (0, _helpers.callIfExists)(_this.props.attributes.onClick, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleContextClick", function (event) {
      if (_this.props.disable) return;
      if (_this.props.disableIfShiftIsPressed && event.shiftKey) return;
      event.preventDefault();
      event.stopPropagation();
      var x = event.clientX || event.touches && event.touches[0].pageX;
      var y = event.clientY || event.touches && event.touches[0].pageY;

      if (_this.props.posX) {
        x -= _this.props.posX;
      }

      if (_this.props.posY) {
        y -= _this.props.posY;
      }

      (0, _actions.hideMenu)();
      var data = (0, _helpers.callIfExists)(_this.props.collect, _this.props);
      var showMenuConfig = {
        position: {
          x: x,
          y: y
        },
        target: _this.elem,
        id: _this.props.id
      };

      if (data && typeof data.then === 'function') {
        // it's promise
        data.then(function (resp) {
          showMenuConfig.data = (0, _objectAssign["default"])({}, resp, {
            target: event.target
          });
          (0, _actions.showMenu)(showMenuConfig);
        });
      } else {
        showMenuConfig.data = (0, _objectAssign["default"])({}, data, {
          target: event.target
        });
        (0, _actions.showMenu)(showMenuConfig);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "elemRef", function (c) {
      _this.elem = c;
    });

    return _this;
  }

  _createClass(ContextMenuTrigger, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          renderTag = _this$props.renderTag,
          attributes = _this$props.attributes,
          children = _this$props.children;
      var newAttrs = (0, _objectAssign["default"])({}, attributes, {
        className: (0, _classnames["default"])(_helpers.cssClasses.menuWrapper, attributes.className),
        onContextMenu: this.handleContextMenu,
        onClick: this.handleMouseClick,
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onTouchStart: this.handleTouchstart,
        onTouchEnd: this.handleTouchEnd,
        onMouseOut: this.handleMouseOut,
        ref: this.elemRef
      });
      return /*#__PURE__*/_react["default"].createElement(renderTag, newAttrs, children);
    }
  }]);

  return ContextMenuTrigger;
}(_react.Component);

exports["default"] = ContextMenuTrigger;

_defineProperty(ContextMenuTrigger, "propTypes", {
  id: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node.isRequired,
  attributes: _propTypes["default"].object,
  collect: _propTypes["default"].func,
  disable: _propTypes["default"].bool,
  holdToDisplay: _propTypes["default"].number,
  posX: _propTypes["default"].number,
  posY: _propTypes["default"].number,
  renderTag: _propTypes["default"].elementType,
  mouseButton: _propTypes["default"].number,
  disableIfShiftIsPressed: _propTypes["default"].bool
});

_defineProperty(ContextMenuTrigger, "defaultProps", {
  attributes: {},
  collect: function collect() {
    return null;
  },
  disable: false,
  holdToDisplay: 1000,
  renderTag: 'div',
  posX: 0,
  posY: 0,
  mouseButton: 2,
  // 0 is left click, 2 is right click
  disableIfShiftIsPressed: false
});