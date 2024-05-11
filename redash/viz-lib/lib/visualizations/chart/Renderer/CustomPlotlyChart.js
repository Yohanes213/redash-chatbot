"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CustomPlotlyChart;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("../../prop-types");
var _resizeObserver = _interopRequireDefault(require("../../../services/resizeObserver"));
var _getChartData = _interopRequireDefault(require("../getChartData"));
var _plotly = require("../plotly");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function CustomPlotlyChart(_ref) {
  var options = _ref.options,
    data = _ref.data;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    container = _useState2[0],
    setContainer = _useState2[1];
  var renderCustomChart = (0, _react.useMemo)(() => (0, _plotly.createCustomChartRenderer)(options.customCode, options.enableConsoleLogs), [options.customCode, options.enableConsoleLogs]);
  var plotlyData = (0, _react.useMemo)(() => (0, _plotly.prepareCustomChartData)((0, _getChartData.default)(data.rows, options)), [options, data]);
  (0, _react.useEffect)(() => {
    if (container) {
      var unwatch = (0, _resizeObserver.default)(container, () => {
        // Clear existing data with blank data for succeeding codeCall adds data to existing plot.
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
        _plotly.Plotly.purge(container);
        renderCustomChart(plotlyData.x, plotlyData.ys, container, _plotly.Plotly);
      });
      return unwatch;
    }
  }, [container, plotlyData, renderCustomChart]);

  // Cleanup when component destroyed
  (0, _react.useEffect)(() => {
    if (container) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
      return () => _plotly.Plotly.purge(container);
    }
  }, [container]);

  // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "chart-visualization-container",
    ref: setContainer
  });
}
CustomPlotlyChart.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=CustomPlotlyChart.js.map