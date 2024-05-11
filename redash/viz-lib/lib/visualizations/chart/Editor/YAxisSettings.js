"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = YAxisSettings;
var _react = _interopRequireDefault(require("react"));
var _editor = require("../../../components/visualizations/editor");
var _propTypes = require("../../prop-types");
var _AxisSettings = _interopRequireDefault(require("./AxisSettings"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function YAxisSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  var _options$yAxis = _slicedToArray(options.yAxis, 2),
    leftYAxis = _options$yAxis[0],
    rightYAxis = _options$yAxis[1];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section.Title, null, !options.swappedAxes ? "Left Y Axis" : "X Axis"), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_AxisSettings.default, {
    id: "LeftYAxis",
    features: {
      range: true
    },
    options: leftYAxis
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(axis: any) => any' is not assignable to typ... Remove this comment to see the full error message
    ,
    onChange: axis => onOptionsChange({
      yAxis: [axis, rightYAxis]
    })
  })), options.globalSeriesType !== "heatmap" && !options.swappedAxes && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section.Title, null, "Right Y Axis"), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_AxisSettings.default, {
    id: "RightYAxis",
    features: {
      range: true
    },
    options: rightYAxis
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(axis: any) => any' is not assignable to typ... Remove this comment to see the full error message
    ,
    onChange: axis => onOptionsChange({
      yAxis: [leftYAxis, axis]
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    id: "chart-editor-y-axis-align-at-zero"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    ,
    "data-test": "Chart.YAxis.AlignAtZero"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.alignYAxesAtZero
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(alignYAxesAtZero: any) => any' is not assig... Remove this comment to see the full error message
    ,
    onChange: alignYAxesAtZero => onOptionsChange({
      alignYAxesAtZero
    })
  }, "Align Y Axes at Zero"))), options.globalSeriesType === "heatmap" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    id: "chart-editor-y-axis-sort"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    ,
    "data-test": "Chart.LeftYAxis.Sort"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.sortY
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(sortY: any) => any' is not assignable to ty... Remove this comment to see the full error message
    ,
    onChange: sortY => onOptionsChange({
      sortY
    })
  }, "Sort Values")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    id: "chart-editor-y-axis-reverse"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    ,
    "data-test": "Chart.LeftYAxis.Reverse"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.reverseY
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(reverseY: any) => any' is not assignable to... Remove this comment to see the full error message
    ,
    onChange: reverseY => onOptionsChange({
      reverseY
    })
  }, "Reverse Order"))));
}
YAxisSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=YAxisSettings.js.map