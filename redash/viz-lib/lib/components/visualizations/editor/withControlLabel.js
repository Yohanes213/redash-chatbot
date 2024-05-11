"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlLabel = ControlLabel;
exports.default = withControlLabel;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));
var Grid = _interopRequireWildcard(require("antd/lib/grid"));
var _typography = _interopRequireDefault(require("antd/lib/typography"));
require("./control-label.less");
var _excluded = ["className", "id", "layout", "label", "labelProps", "disabled"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ControlLabel(_ref) {
  var layout = _ref.layout,
    label = _ref.label,
    labelProps = _ref.labelProps,
    disabled = _ref.disabled,
    children = _ref.children;
  if (layout === "vertical" && label) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "visualization-editor-control-label visualization-editor-control-label-vertical"
    }, /*#__PURE__*/_react.default.createElement("label", labelProps, /*#__PURE__*/_react.default.createElement(_typography.default.Text, {
      disabled: disabled
    }, label)), children);
  }
  if (layout === "horizontal" && label) {
    return /*#__PURE__*/_react.default.createElement(Grid.Row, {
      className: "visualization-editor-control-label visualization-editor-control-label-horizontal"
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element[]; className: string; ty... Remove this comment to see the full error message
      ,
      type: "flex",
      align: "middle",
      gutter: 15
    }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
      span: 12
    }, /*#__PURE__*/_react.default.createElement("label", labelProps, /*#__PURE__*/_react.default.createElement(_typography.default.Text, {
      disabled: disabled
    }, label))), /*#__PURE__*/_react.default.createElement(Grid.Col, {
      span: 12
    }, children));
  }
  return children;
}
ControlLabel.defaultProps = {
  layout: "vertical",
  label: null,
  disabled: false,
  children: null
};
function withControlLabel(WrappedControl) {
  // eslint-disable-next-line react/prop-types
  function ControlWrapper(_ref2) {
    var className = _ref2.className,
      id = _ref2.id,
      layout = _ref2.layout,
      label = _ref2.label,
      labelProps = _ref2.labelProps,
      disabled = _ref2.disabled,
      props = _objectWithoutProperties(_ref2, _excluded);
    var fallbackId = (0, _react.useMemo)(() => "visualization-editor-control-".concat(Math.random().toString(36).substr(2, 10)), []);
    labelProps = _objectSpread(_objectSpread({}, labelProps), {}, {
      htmlFor: id || fallbackId
    });
    return /*#__PURE__*/_react.default.createElement(ControlLabel, {
      layout: layout,
      label: label,
      labelProps: labelProps,
      disabled: disabled
    }, /*#__PURE__*/_react.default.createElement(WrappedControl, _extends({
      className: (0, _classnames.default)("visualization-editor-input", className),
      id: labelProps.htmlFor,
      disabled: disabled
    }, props)));
  }

  // Copy static methods from `WrappedComponent`
  (0, _hoistNonReactStatics.default)(ControlWrapper, WrappedControl);
  return ControlWrapper;
}
//# sourceMappingURL=withControlLabel.js.map