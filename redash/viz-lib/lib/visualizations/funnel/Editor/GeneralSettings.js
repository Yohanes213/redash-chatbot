"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeneralSettings;
var _lodash = require("lodash");
var _react = _interopRequireWildcard(require("react"));
var _useDebounce = require("use-debounce");
var _editor = require("../../../components/visualizations/editor");
var _propTypes = require("../../prop-types");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function GeneralSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var columnNames = (0, _react.useMemo)(() => (0, _lodash.map)(data.columns, c => c.name), [data]);
  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onOptionsChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    onOptionsChangeDebounced = _useDebouncedCallback2[0];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Step Column",
    "data-test": "Funnel.StepColumn",
    placeholder: "Choose column...",
    defaultValue: options.stepCol.colName || undefined,
    onChange: colName => onOptionsChange({
      stepCol: {
        colName: colName || null
      }
    })
  }, (0, _lodash.map)(columnNames, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col,
    "data-test": "Funnel.StepColumn.".concat(col)
  }, col)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "Step Column Title",
    "data-test": "Funnel.StepColumnTitle",
    defaultValue: options.stepCol.displayAs,
    onChange: event => onOptionsChangeDebounced({
      stepCol: {
        displayAs: event.target.value
      }
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Value Column",
    "data-test": "Funnel.ValueColumn",
    placeholder: "Choose column...",
    defaultValue: options.valueCol.colName || undefined,
    onChange: colName => onOptionsChange({
      valueCol: {
        colName: colName || null
      }
    })
  }, (0, _lodash.map)(columnNames, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col,
    "data-test": "Funnel.ValueColumn.".concat(col)
  }, col)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "Value Column Title",
    "data-test": "Funnel.ValueColumnTitle",
    defaultValue: options.valueCol.displayAs,
    onChange: event => onOptionsChangeDebounced({
      valueCol: {
        displayAs: event.target.value
      }
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Funnel.CustomSort",
    checked: !options.autoSort,
    onChange: event => onOptionsChange({
      autoSort: !event.target.checked
    })
  }, "Custom Sorting")), !options.autoSort && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Sort Column",
    "data-test": "Funnel.SortColumn",
    allowClear: true,
    placeholder: "Choose column...",
    defaultValue: options.sortKeyCol.colName || undefined,
    onChange: colName => onOptionsChange({
      sortKeyCol: {
        colName: colName || null
      }
    })
  }, (0, _lodash.map)(columnNames, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col,
    "data-test": "Funnel.SortColumn.".concat(col)
  }, col)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Sort Order",
    "data-test": "Funnel.SortDirection",
    disabled: !options.sortKeyCol.colName,
    defaultValue: options.sortKeyCol.reverse ? "desc" : "asc",
    onChange: order => onOptionsChange({
      sortKeyCol: {
        reverse: order === "desc"
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "asc",
    "data-test": "Funnel.SortDirection.Ascending"
  }, "ascending"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "desc",
    "data-test": "Funnel.SortDirection.Descending"
  }, "descending")))));
}
GeneralSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map