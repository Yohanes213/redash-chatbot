"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlotlyChart;
var _react = _interopRequireWildcard(require("react"));
var _useMedia = _interopRequireDefault(require("use-media"));
var _ErrorBoundary = require("../../../components/ErrorBoundary");
var _propTypes = require("../../prop-types");
var _visualizationsSettings = require("../../visualizationsSettings");
var _getChartData = _interopRequireDefault(require("../getChartData"));
var _initChart = _interopRequireDefault(require("./initChart"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function PlotlyChart(_ref) {
  var options = _ref.options,
    data = _ref.data;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    container = _useState2[0],
    setContainer = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    chart = _useState4[0],
    setChart = _useState4[1];
  var errorHandler = (0, _react.useContext)(_ErrorBoundary.ErrorBoundaryContext);
  var errorHandlerRef = (0, _react.useRef)();
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleError: (error: any) => void; reset: ... Remove this comment to see the full error message
  errorHandlerRef.current = errorHandler;
  var isMobile = (0, _useMedia.default)({
    maxWidth: 768
  });
  var isMobileRef = (0, _react.useRef)();
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'undefine... Remove this comment to see the full error message
  isMobileRef.current = isMobile;
  (0, _react.useEffect)(() => {
    if (container) {
      var isDestroyed = false;
      var chartData = (0, _getChartData.default)(data.rows, options);
      var _chart = (0, _initChart.default)(container, options, chartData, _visualizationsSettings.visualizationsSettings, error => {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        errorHandlerRef.current.handleError(error);
      });
      _chart.initialized.then(() => {
        if (!isDestroyed) {
          setChart(_chart);
        }
      });
      return () => {
        isDestroyed = true;
        _chart.destroy();
      };
    }
  }, [options, data, container]);
  (0, _react.useEffect)(() => {
    if (chart) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      chart.setZoomEnabled(!isMobile);
    }
  }, [chart, isMobile]);

  // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "chart-visualization-container",
    ref: setContainer
  });
}
PlotlyChart.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=PlotlyChart.js.map