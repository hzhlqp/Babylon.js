"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AbstractMenu = /*#__PURE__*/function (_Component) {
  _inherits(AbstractMenu, _Component);

  var _super = _createSuper(AbstractMenu);

  function AbstractMenu(_props) {
    var _this;

    _classCallCheck(this, AbstractMenu);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "handleKeyNavigation", function (e) {
      // check for isVisible strictly here as it might be undefined when this code executes in the context of SubMenu
      // but we only need to check when it runs in the ContextMenu context
      if (_this.state.isVisible === false) {
        return;
      }

      switch (e.keyCode) {
        case 37: // left arrow

        case 27:
          // escape
          e.preventDefault();

          _this.hideMenu(e);

          break;

        case 38:
          // up arrow
          e.preventDefault();

          _this.selectChildren(true);

          break;

        case 40:
          // down arrow
          e.preventDefault();

          _this.selectChildren(false);

          break;

        case 39:
          // right arrow
          _this.tryToOpenSubMenu(e);

          break;

        case 13:
          // enter
          e.preventDefault();

          _this.tryToOpenSubMenu(e);

          {
            // determine the selected item is disabled or not
            var disabled = _this.seletedItemRef && _this.seletedItemRef.props && _this.seletedItemRef.props.disabled;

            if (_this.seletedItemRef && _this.seletedItemRef.ref instanceof HTMLElement && !disabled) {
              _this.seletedItemRef.ref.click();
            } else {
              _this.hideMenu(e);
            }
          }
          break;

        default: // do nothing

      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleForceClose", function () {
      _this.setState({
        forceSubMenuOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "tryToOpenSubMenu", function (e) {
      if (_this.state.selectedItem && _this.state.selectedItem.type === _this.getSubMenuType()) {
        e.preventDefault();

        _this.setState({
          forceSubMenuOpen: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectChildren", function (forward) {
      var selectedItem = _this.state.selectedItem;
      var children = [];
      var disabledChildrenCount = 0;
      var disabledChildIndexes = {};

      var childCollector = function childCollector(child, index) {
        // child can be empty in case you do conditional rendering of components, in which
        // case it should not be accounted for as a real child
        if (!child) {
          return;
        }

        if ([_MenuItem["default"], _this.getSubMenuType()].indexOf(child.type) < 0) {
          // Maybe the MenuItem or SubMenu is capsuled in a wrapper div or something else
          _react["default"].Children.forEach(child.props.children, childCollector);
        } else if (!child.props.divider) {
          if (child.props.disabled) {
            ++disabledChildrenCount;
            disabledChildIndexes[index] = true;
          }

          children.push(child);
        }
      };

      _react["default"].Children.forEach(_this.props.children, childCollector);

      if (disabledChildrenCount === children.length) {
        // All menu items are disabled, so none can be selected, don't do anything
        return;
      }

      function findNextEnabledChildIndex(currentIndex) {
        var i = currentIndex;

        var incrementCounter = function incrementCounter() {
          if (forward) {
            --i;
          } else {
            ++i;
          }

          if (i < 0) {
            i = children.length - 1;
          } else if (i >= children.length) {
            i = 0;
          }
        };

        do {
          incrementCounter();
        } while (i !== currentIndex && disabledChildIndexes[i]);

        return i === currentIndex ? null : i;
      }

      var currentIndex = children.indexOf(selectedItem);
      var nextEnabledChildIndex = findNextEnabledChildIndex(currentIndex);

      if (nextEnabledChildIndex !== null) {
        _this.setState({
          selectedItem: children[nextEnabledChildIndex],
          forceSubMenuOpen: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChildMouseMove", function (child) {
      if (_this.state.selectedItem !== child) {
        _this.setState({
          selectedItem: child,
          forceSubMenuOpen: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChildMouseLeave", function () {
      _this.setState({
        selectedItem: null,
        forceSubMenuOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function (children) {
      return _react["default"].Children.map(children, function (child) {
        var props = {};
        if (! /*#__PURE__*/_react["default"].isValidElement(child)) return child;

        if ([_MenuItem["default"], _this.getSubMenuType()].indexOf(child.type) < 0) {
          // Maybe the MenuItem or SubMenu is capsuled in a wrapper div or something else
          props.children = _this.renderChildren(child.props.children);
          return /*#__PURE__*/_react["default"].cloneElement(child, props);
        }

        props.onMouseLeave = _this.onChildMouseLeave.bind(_assertThisInitialized(_this));

        if (child.type === _this.getSubMenuType()) {
          // special props for SubMenu only
          props.forceOpen = _this.state.forceSubMenuOpen && _this.state.selectedItem === child;
          props.forceClose = _this.handleForceClose;
          props.parentKeyNavigationHandler = _this.handleKeyNavigation;
        }

        if (!child.props.divider && _this.state.selectedItem === child) {
          // special props for selected item only
          props.selected = true;

          props.ref = function (ref) {
            _this.seletedItemRef = ref;
          };

          return /*#__PURE__*/_react["default"].cloneElement(child, props);
        } // onMouseMove is only needed for non selected items


        props.onMouseMove = function () {
          return _this.onChildMouseMove(child);
        };

        return /*#__PURE__*/_react["default"].cloneElement(child, props);
      });
    });

    _this.seletedItemRef = null;
    _this.state = {
      selectedItem: null,
      forceSubMenuOpen: false
    };
    return _this;
  }

  return _createClass(AbstractMenu);
}(_react.Component);

exports["default"] = AbstractMenu;

_defineProperty(AbstractMenu, "propTypes", {
  children: _propTypes["default"].node.isRequired
});