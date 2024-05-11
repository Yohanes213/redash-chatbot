"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AppearanceSettings;
var _react = _interopRequireDefault(require("react"));
var _useDebounce = require("use-debounce");
var _editor = require("../../../components/visualizations/editor");
var _propTypes = require("../../prop-types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function AppearanceSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onOptionsChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    onOptionsChangeDebounced = _useDebouncedCallback2[0];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Number Values Format", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp.NumberFormatSpecs, null)),
    "data-test": "Funnel.NumberFormat",
    defaultValue: options.numberFormat,
    onChange: event => onOptionsChangeDebounced({
      numberFormat: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Percent Values Format", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp.NumberFormatSpecs, null)),
    "data-test": "Funnel.PercentFormat",
    defaultValue: options.percentFormat,
    onChange: event => onOptionsChangeDebounced({
      percentFormat: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    layout: "horizontal",
    label: "Items Count Limit",
    "data-test": "Funnel.ItemsLimit",
    min: 2,
    defaultValue: options.itemsLimit,
    onChange: itemsLimit => onOptionsChangeDebounced({
      itemsLimit
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    layout: "horizontal",
    label: "Min Percent Value",
    "data-test": "Funnel.PercentRangeMin",
    min: 0,
    defaultValue: options.percentValuesRange.min,
    onChange: min => onOptionsChangeDebounced({
      percentValuesRange: {
        min
      }
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    layout: "horizontal",
    label: "Max Percent Value",
    "data-test": "Funnel.PercentRangeMax",
    min: 0,
    defaultValue: options.percentValuesRange.max,
    onChange: max => onOptionsChangeDebounced({
      percentValuesRange: {
        max
      }
    })
  })));
}
AppearanceSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=AppearanceSettings.js.map