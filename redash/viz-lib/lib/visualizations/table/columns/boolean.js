"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initBooleanColumn;
var _react = _interopRequireDefault(require("react"));
var _useDebounce = require("use-debounce");
var _editor = require("../../../components/visualizations/editor");
var _valueFormat = require("../../../lib/value-format");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function Editor(_ref) {
  var column = _ref.column,
    onChange = _ref.onChange;
  function handleChange(index, value) {
    // @ts-expect-error ts-migrate(2488) FIXME: Type 'string[] | undefined' must have a '[Symbol.i... Remove this comment to see the full error message
    var booleanValues = [...column.booleanValues];
    booleanValues.splice(index, 1, value);
    onChange({
      booleanValues
    });
  }
  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(handleChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    handleChangeDebounced = _useDebouncedCallback2[0];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Value for ", /*#__PURE__*/_react.default.createElement("code", null, "false")),
    "data-test": "Table.ColumnEditor.Boolean.False"
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    ,
    defaultValue: column.booleanValues[0],
    onChange: event => handleChangeDebounced(0, event.target.value)
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Value for ", /*#__PURE__*/_react.default.createElement("code", null, "true")),
    "data-test": "Table.ColumnEditor.Boolean.True"
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    ,
    defaultValue: column.booleanValues[1],
    onChange: event => handleChangeDebounced(1, event.target.value)
  })));
}
function initBooleanColumn(column) {
  var format = (0, _valueFormat.createBooleanFormatter)(column.booleanValues);
  function prepareData(row) {
    return {
      text: format(row[column.name])
    };
  }
  function BooleanColumn(_ref2) {
    var row = _ref2.row;
    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
      text = _prepareData.text;
    return text;
  }
  BooleanColumn.prepareData = prepareData;
  return BooleanColumn;
}
initBooleanColumn.friendlyName = "Boolean";
initBooleanColumn.Editor = Editor;
//# sourceMappingURL=boolean.js.map