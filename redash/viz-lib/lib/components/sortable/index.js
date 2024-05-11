"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragHandle = void 0;
exports.SortableContainer = SortableContainer;
exports.SortableElement = exports.SortableContainerWrapper = void 0;
var _lodash = require("lodash");
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactSortableHoc = require("react-sortable-hoc");
require("./style.less");
var _excluded = ["className"],
  _excluded2 = ["disabled", "containerComponent", "containerProps", "children"]; // @ts-expect-error ts-migrate(2724) FIXME: Module '"../../../node_modules/react-sortable-hoc/... Remove this comment to see the full error message
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var DragHandle = (0, _reactSortableHoc.sortableHandle)(_ref => {
  var className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)("drag-handle", className)
  }, restProps));
});
exports.DragHandle = DragHandle;
var SortableContainerWrapper = (0, _reactSortableHoc.sortableContainer)(_ref2 => {
  var children = _ref2.children;
  return children;
});
exports.SortableContainerWrapper = SortableContainerWrapper;
var SortableElement = (0, _reactSortableHoc.sortableElement)(_ref3 => {
  var children = _ref3.children;
  return children;
});
exports.SortableElement = SortableElement;
function SortableContainer(_ref4) {
  var disabled = _ref4.disabled,
    containerComponent = _ref4.containerComponent,
    containerProps = _ref4.containerProps,
    children = _ref4.children,
    wrapperProps = _objectWithoutProperties(_ref4, _excluded2);
  var containerRef = (0, _react.useRef)();
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDragging = _useState2[0],
    setIsDragging = _useState2[1];
  wrapperProps = _objectSpread({}, wrapperProps);
  containerProps = _objectSpread({}, containerProps);
  if (disabled) {
    // Disabled state:
    // - forbid drag'n'drop (and therefore no need to hook events
    // - don't override anything on container element
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldCancelStart' does not exist on typ... Remove this comment to see the full error message
    wrapperProps.shouldCancelStart = () => true;
  } else {
    // Enabled state:

    // - use container element as a default helper element
    // @ts-expect-error
    wrapperProps.helperContainer = (0, _lodash.wrap)(wrapperProps.helperContainer, helperContainer => (0, _lodash.isFunction)(helperContainer) ? helperContainer(containerRef.current) : containerRef.current);

    // - hook drag start/end events
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateBeforeSortStart' does not exist on... Remove this comment to see the full error message
    wrapperProps.updateBeforeSortStart = (0, _lodash.wrap)(wrapperProps.updateBeforeSortStart, function (updateBeforeSortStart) {
      setIsDragging(true);
      if ((0, _lodash.isFunction)(updateBeforeSortStart)) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        updateBeforeSortStart(...args);
      }
    });
    // @ts-expect-error
    wrapperProps.onSortStart = (0, _lodash.wrap)(wrapperProps.onSortStart, function (onSortStart) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      if ((0, _lodash.isFunction)(onSortStart)) {
        onSortStart(...args);
      } else {
        var event = args[1];
        event.preventDefault();
      }
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSortEnd' does not exist on type '{}'.
    wrapperProps.onSortEnd = (0, _lodash.wrap)(wrapperProps.onSortEnd, function (onSortEnd) {
      setIsDragging(false);
      if ((0, _lodash.isFunction)(onSortEnd)) {
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }
        onSortEnd(...args);
      }
    });

    // - update container element: add classes and take a ref
    containerProps.className = (0, _classnames.default)("sortable-container", {
      "sortable-container-dragging": isDragging
    }, containerProps.className);
    containerProps.ref = containerRef;
  }
  var ContainerComponent = containerComponent;
  return /*#__PURE__*/_react.default.createElement(SortableContainerWrapper, wrapperProps, /*#__PURE__*/_react.default.createElement(ContainerComponent, containerProps, children));
}
SortableContainer.defaultProps = {
  disabled: false,
  containerComponent: "div",
  containerProps: {},
  children: null
};
//# sourceMappingURL=index.js.map