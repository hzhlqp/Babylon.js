"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _globalEventListener = _interopRequireDefault(require("./globalEventListener"));

var _AbstractMenu2 = _interopRequireDefault(require("./AbstractMenu"));

var _SubMenu = _interopRequireDefault(require("./SubMenu"));

var _actions = require("./actions");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var ContextMenu = /*#__PURE__*/function (_AbstractMenu) {
  _inherits(ContextMenu, _AbstractMenu);

  var _super = _createSuper(ContextMenu);

  function ContextMenu(props) {
    var _this;

    _classCallCheck(this, ContextMenu);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "registerHandlers", function () {
      document.addEventListener('mousedown', _this.handleOutsideClick);
      document.addEventListener('touchstart', _this.handleOutsideClick);
      if (!_this.props.preventHideOnScroll) document.addEventListener('scroll', _this.handleHide);
      if (!_this.props.preventHideOnContextMenu) document.addEventListener('contextmenu', _this.handleHide);
      document.addEventListener('keydown', _this.handleKeyNavigation);
      if (!_this.props.preventHideOnResize) window.addEventListener('resize', _this.handleHide);
    });

    _defineProperty(_assertThisInitialized(_this), "unregisterHandlers", function () {
      document.removeEventListener('mousedown', _this.handleOutsideClick);
      document.removeEventListener('touchstart', _this.handleOutsideClick);
      document.removeEventListener('scroll', _this.handleHide);
      document.removeEventListener('contextmenu', _this.handleHide);
      document.removeEventListener('keydown', _this.handleKeyNavigation);
      window.removeEventListener('resize', _this.handleHide);
    });

    _defineProperty(_assertThisInitialized(_this), "handleShow", function (e) {
      if (e.detail.id !== _this.props.id || _this.state.isVisible) return;
      var _e$detail$position = e.detail.position,
          x = _e$detail$position.x,
          y = _e$detail$position.y;

      _this.setState({
        isVisible: true,
        x: x,
        y: y
      });

      _this.registerHandlers();

      (0, _helpers.callIfExists)(_this.props.onShow, e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleHide", function (e) {
      if (_this.state.isVisible && (!e.detail || !e.detail.id || e.detail.id === _this.props.id)) {
        _this.unregisterHandlers();

        _this.setState({
          isVisible: false,
          selectedItem: null,
          forceSubMenuOpen: false
        });

        (0, _helpers.callIfExists)(_this.props.onHide, e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOutsideClick", function (e) {
      if (!_this.menu.contains(e.target)) (0, _actions.hideMenu)();
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function (event) {
      event.preventDefault();
      (0, _helpers.callIfExists)(_this.props.onMouseLeave, event, (0, _objectAssign["default"])({}, _this.props.data, _helpers.store.data), _helpers.store.target);
      if (_this.props.hideOnLeave) (0, _actions.hideMenu)();
    });

    _defineProperty(_assertThisInitialized(_this), "handleContextMenu", function (e) {
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }

      _this.handleHide(e);
    });

    _defineProperty(_assertThisInitialized(_this), "hideMenu", function (e) {
      if (e.keyCode === 27 || e.keyCode === 13) {
        // ECS or enter
        (0, _actions.hideMenu)();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getMenuPosition", function () {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var menuStyles = {
        top: y,
        left: x
      };
      if (!_this.menu) return menuStyles;
      var _window = window,
          innerWidth = _window.innerWidth,
          innerHeight = _window.innerHeight;

      var rect = _this.menu.getBoundingClientRect();

      if (y + rect.height > innerHeight) {
        menuStyles.top -= rect.height;
      }

      if (x + rect.width > innerWidth) {
        menuStyles.left -= rect.width;
      }

      if (menuStyles.top < 0) {
        menuStyles.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
      }

      if (menuStyles.left < 0) {
        menuStyles.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
      }

      return menuStyles;
    });

    _defineProperty(_assertThisInitialized(_this), "getRTLMenuPosition", function () {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var menuStyles = {
        top: y,
        left: x
      };
      if (!_this.menu) return menuStyles;
      var _window2 = window,
          innerWidth = _window2.innerWidth,
          innerHeight = _window2.innerHeight;

      var rect = _this.menu.getBoundingClientRect(); // Try to position the menu on the left side of the cursor


      menuStyles.left = x - rect.width;

      if (y + rect.height > innerHeight) {
        menuStyles.top -= rect.height;
      }

      if (menuStyles.left < 0) {
        menuStyles.left += rect.width;
      }

      if (menuStyles.top < 0) {
        menuStyles.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
      }

      if (menuStyles.left + rect.width > innerWidth) {
        menuStyles.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
      }

      return menuStyles;
    });

    _defineProperty(_assertThisInitialized(_this), "menuRef", function (c) {
      _this.menu = c;
    });

    _this.state = (0, _objectAssign["default"])({}, _this.state, {
      x: 0,
      y: 0,
      isVisible: false
    });
    return _this;
  }

  _createClass(ContextMenu, [{
    key: "getSubMenuType",
    value: function getSubMenuType() {
      // eslint-disable-line class-methods-use-this
      return _SubMenu["default"];
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.listenId = _globalEventListener["default"].register(this.handleShow, this.handleHide);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var wrapper = window.requestAnimationFrame || setTimeout;

      if (this.state.isVisible) {
        wrapper(function () {
          var _this2$state = _this2.state,
              x = _this2$state.x,
              y = _this2$state.y;

          var _ref = _this2.props.rtl ? _this2.getRTLMenuPosition(x, y) : _this2.getMenuPosition(x, y),
              top = _ref.top,
              left = _ref.left;

          wrapper(function () {
            if (!_this2.menu) return;
            _this2.menu.style.top = "".concat(top, "px");
            _this2.menu.style.left = "".concat(left, "px");
            _this2.menu.style.opacity = 1;
            _this2.menu.style.pointerEvents = 'auto';
          });
        });
      } else {
        wrapper(function () {
          if (!_this2.menu) return;
          _this2.menu.style.opacity = 0;
          _this2.menu.style.pointerEvents = 'none';
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.listenId) {
        _globalEventListener["default"].unregister(this.listenId);
      }

      this.unregisterHandlers();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          style = _this$props.style;
      var isVisible = this.state.isVisible;
      var inlineStyle = (0, _objectAssign["default"])({}, style, {
        position: 'fixed',
        opacity: 0,
        pointerEvents: 'none'
      });
      var menuClassnames = (0, _classnames["default"])(_helpers.cssClasses.menu, className, _defineProperty({}, _helpers.cssClasses.menuVisible, isVisible));
      return /*#__PURE__*/_react["default"].createElement("nav", {
        role: "menu",
        tabIndex: "-1",
        ref: this.menuRef,
        style: inlineStyle,
        className: menuClassnames,
        onContextMenu: this.handleContextMenu,
        onMouseLeave: this.handleMouseLeave
      }, this.renderChildren(children));
    }
  }]);

  return ContextMenu;
}(_AbstractMenu2["default"]);

exports["default"] = ContextMenu;

_defineProperty(ContextMenu, "propTypes", {
  id: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node.isRequired,
  data: _propTypes["default"].object,
  className: _propTypes["default"].string,
  hideOnLeave: _propTypes["default"].bool,
  rtl: _propTypes["default"].bool,
  onHide: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onShow: _propTypes["default"].func,
  preventHideOnContextMenu: _propTypes["default"].bool,
  preventHideOnResize: _propTypes["default"].bool,
  preventHideOnScroll: _propTypes["default"].bool,
  style: _propTypes["default"].object
});

_defineProperty(ContextMenu, "defaultProps", {
  className: '',
  data: {},
  hideOnLeave: false,
  rtl: false,
  onHide: function onHide() {
    return null;
  },
  onMouseLeave: function onMouseLeave() {
    return null;
  },
  onShow: function onShow() {
    return null;
  },
  preventHideOnContextMenu: false,
  preventHideOnResize: false,
  preventHideOnScroll: false,
  style: {}
});