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

var _actions = require("./actions");

var _AbstractMenu2 = _interopRequireDefault(require("./AbstractMenu"));

var _helpers = require("./helpers");

var _globalEventListener = _interopRequireDefault(require("./globalEventListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var SubMenu = /*#__PURE__*/function (_AbstractMenu) {
  _inherits(SubMenu, _AbstractMenu);

  var _super = _createSuper(SubMenu);

  function SubMenu(props) {
    var _this;

    _classCallCheck(this, SubMenu);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getMenuPosition", function () {
      var _window = window,
          innerWidth = _window.innerWidth,
          innerHeight = _window.innerHeight;

      var rect = _this.subMenu.getBoundingClientRect();

      var position = {};

      if (rect.bottom > innerHeight) {
        position.bottom = 0;
      } else {
        position.top = 0;
      }

      if (rect.right < innerWidth) {
        position.left = '100%';
      } else {
        position.right = '100%';
      }

      return position;
    });

    _defineProperty(_assertThisInitialized(_this), "getRTLMenuPosition", function () {
      var _window2 = window,
          innerHeight = _window2.innerHeight;

      var rect = _this.subMenu.getBoundingClientRect();

      var position = {};

      if (rect.bottom > innerHeight) {
        position.bottom = 0;
      } else {
        position.top = 0;
      }

      if (rect.left < 0) {
        position.left = '100%';
      } else {
        position.right = '100%';
      }

      return position;
    });

    _defineProperty(_assertThisInitialized(_this), "hideMenu", function (e) {
      e.preventDefault();

      _this.hideSubMenu(e);
    });

    _defineProperty(_assertThisInitialized(_this), "hideSubMenu", function (e) {
      // avoid closing submenus of a different menu tree
      if (e.detail && e.detail.id && _this.menu && e.detail.id !== _this.menu.id) {
        return;
      }

      if (_this.props.forceOpen) {
        _this.props.forceClose();
      }

      _this.setState({
        visible: false,
        selectedItem: null
      });

      _this.unregisterHandlers();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      event.preventDefault();
      if (_this.props.disabled) return;
      (0, _helpers.callIfExists)(_this.props.onClick, event, (0, _objectAssign["default"])({}, _this.props.data, _helpers.store.data), _helpers.store.target);
      if (!_this.props.onClick || _this.props.preventCloseOnClick) return;
      (0, _actions.hideMenu)();
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function () {
      if (_this.closetimer) clearTimeout(_this.closetimer);
      if (_this.props.disabled || _this.state.visible) return;
      _this.opentimer = setTimeout(function () {
        return _this.setState({
          visible: true,
          selectedItem: null
        });
      }, _this.props.hoverDelay);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      if (_this.opentimer) clearTimeout(_this.opentimer);
      if (!_this.state.visible) return;
      _this.closetimer = setTimeout(function () {
        return _this.setState({
          visible: false,
          selectedItem: null
        });
      }, _this.props.hoverDelay);
    });

    _defineProperty(_assertThisInitialized(_this), "menuRef", function (c) {
      _this.menu = c;
    });

    _defineProperty(_assertThisInitialized(_this), "subMenuRef", function (c) {
      _this.subMenu = c;
    });

    _defineProperty(_assertThisInitialized(_this), "registerHandlers", function () {
      document.removeEventListener('keydown', _this.props.parentKeyNavigationHandler);
      document.addEventListener('keydown', _this.handleKeyNavigation);
    });

    _defineProperty(_assertThisInitialized(_this), "unregisterHandlers", function (dismounting) {
      document.removeEventListener('keydown', _this.handleKeyNavigation);

      if (!dismounting) {
        document.addEventListener('keydown', _this.props.parentKeyNavigationHandler);
      }
    });

    _this.state = (0, _objectAssign["default"])({}, _this.state, {
      visible: false
    });
    return _this;
  }

  _createClass(SubMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.listenId = _globalEventListener["default"].register(function () {}, this.hideSubMenu);
    }
  }, {
    key: "getSubMenuType",
    value: function getSubMenuType() {
      // eslint-disable-line class-methods-use-this
      return SubMenu;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      this.isVisibilityChange = (this.state.visible !== nextState.visible || this.props.forceOpen !== nextProps.forceOpen) && !(this.state.visible && nextProps.forceOpen) && !(this.props.forceOpen && nextState.visible);
      return true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      if (!this.isVisibilityChange) return;

      if (this.props.forceOpen || this.state.visible) {
        var wrapper = window.requestAnimationFrame || setTimeout;
        wrapper(function () {
          var styles = _this2.props.rtl ? _this2.getRTLMenuPosition() : _this2.getMenuPosition();

          _this2.subMenu.style.removeProperty('top');

          _this2.subMenu.style.removeProperty('bottom');

          _this2.subMenu.style.removeProperty('left');

          _this2.subMenu.style.removeProperty('right');

          if ((0, _helpers.hasOwnProp)(styles, 'top')) _this2.subMenu.style.top = styles.top;
          if ((0, _helpers.hasOwnProp)(styles, 'left')) _this2.subMenu.style.left = styles.left;
          if ((0, _helpers.hasOwnProp)(styles, 'bottom')) _this2.subMenu.style.bottom = styles.bottom;
          if ((0, _helpers.hasOwnProp)(styles, 'right')) _this2.subMenu.style.right = styles.right;

          _this2.subMenu.classList.add(_helpers.cssClasses.menuVisible);

          _this2.registerHandlers();

          _this2.setState({
            selectedItem: null
          });
        });
      } else {
        var cleanup = function cleanup() {
          _this2.subMenu.removeEventListener('transitionend', cleanup);

          _this2.subMenu.style.removeProperty('bottom');

          _this2.subMenu.style.removeProperty('right');

          _this2.subMenu.style.top = 0;
          _this2.subMenu.style.left = '100%';

          _this2.unregisterHandlers();
        };

        this.subMenu.addEventListener('transitionend', cleanup);
        this.subMenu.classList.remove(_helpers.cssClasses.menuVisible);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.listenId) {
        _globalEventListener["default"].unregister(this.listenId);
      }

      if (this.opentimer) clearTimeout(this.opentimer);
      if (this.closetimer) clearTimeout(this.closetimer);
      this.unregisterHandlers(true);
    }
  }, {
    key: "render",
    value: function render() {
      var _cx;

      var _this$props = this.props,
          children = _this$props.children,
          attributes = _this$props.attributes,
          disabled = _this$props.disabled,
          title = _this$props.title,
          selected = _this$props.selected;
      var visible = this.state.visible;
      var menuProps = {
        ref: this.menuRef,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        className: (0, _classnames["default"])(_helpers.cssClasses.menuItem, _helpers.cssClasses.subMenu, attributes.listClassName),
        style: {
          position: 'relative'
        }
      };
      var menuItemProps = {
        className: (0, _classnames["default"])(_helpers.cssClasses.menuItem, attributes.className, (_cx = {}, _defineProperty(_cx, (0, _classnames["default"])(_helpers.cssClasses.menuItemDisabled, attributes.disabledClassName), disabled), _defineProperty(_cx, (0, _classnames["default"])(_helpers.cssClasses.menuItemActive, attributes.visibleClassName), visible), _defineProperty(_cx, (0, _classnames["default"])(_helpers.cssClasses.menuItemSelected, attributes.selectedClassName), selected), _cx)),
        onMouseMove: this.props.onMouseMove,
        onMouseOut: this.props.onMouseOut,
        onClick: this.handleClick
      };
      var subMenuProps = {
        ref: this.subMenuRef,
        style: {
          position: 'absolute',
          transition: 'opacity 1ms',
          // trigger transitionend event
          top: 0,
          left: '100%'
        },
        className: (0, _classnames["default"])(_helpers.cssClasses.menu, this.props.className)
      };
      return /*#__PURE__*/_react["default"].createElement("nav", _extends({}, menuProps, {
        role: "menuitem",
        tabIndex: "-1",
        "aria-haspopup": "true"
      }), /*#__PURE__*/_react["default"].createElement("div", _extends({}, attributes, menuItemProps), title), /*#__PURE__*/_react["default"].createElement("nav", _extends({}, subMenuProps, {
        role: "menu",
        tabIndex: "-1"
      }), this.renderChildren(children)));
    }
  }]);

  return SubMenu;
}(_AbstractMenu2["default"]);

exports["default"] = SubMenu;

_defineProperty(SubMenu, "propTypes", {
  children: _propTypes["default"].node.isRequired,
  attributes: _propTypes["default"].object,
  title: _propTypes["default"].node.isRequired,
  className: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  hoverDelay: _propTypes["default"].number,
  rtl: _propTypes["default"].bool,
  selected: _propTypes["default"].bool,
  onMouseMove: _propTypes["default"].func,
  onMouseOut: _propTypes["default"].func,
  forceOpen: _propTypes["default"].bool,
  forceClose: _propTypes["default"].func,
  parentKeyNavigationHandler: _propTypes["default"].func
});

_defineProperty(SubMenu, "defaultProps", {
  disabled: false,
  hoverDelay: 500,
  attributes: {},
  className: '',
  rtl: false,
  selected: false,
  onMouseMove: function onMouseMove() {
    return null;
  },
  onMouseOut: function onMouseOut() {
    return null;
  },
  forceOpen: false,
  forceClose: function forceClose() {
    return null;
  },
  parentKeyNavigationHandler: function parentKeyNavigationHandler() {
    return null;
  }
});