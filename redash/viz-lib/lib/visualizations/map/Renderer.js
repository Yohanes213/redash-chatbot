"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Renderer;
var _lodash = require("lodash");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("../prop-types");
var _prepareData = _interopRequireDefault(require("./prepareData"));
var _initMap = _interopRequireDefault(require("./initMap"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function useMemoWithDeepCompare(create, inputs) {
  var valueRef = (0, _react.useRef)();
  var value = (0, _react.useMemo)(create, inputs);
  if (!(0, _lodash.isEqual)(value, valueRef.current)) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'undefine... Remove this comment to see the full error message
    valueRef.current = value;
  }
  return valueRef.current;
}
function Renderer(_ref) {
  var data = _ref.data,
    options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    container = _useState2[0],
    setContainer = _useState2[1];
  var optionsWithoutBounds = useMemoWithDeepCompare(() => (0, _lodash.omit)(options, ["bounds"]), [options]);
  var groups = (0, _react.useMemo)(() => (0, _prepareData.default)(data, optionsWithoutBounds), [data, optionsWithoutBounds]);
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    map = _useState4[0],
    setMap = _useState4[1];
  (0, _react.useEffect)(() => {
    if (container) {
      var _map = (0, _initMap.default)(container);
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ onBoundsChange: () => void; up... Remove this comment to see the full error message
      setMap(_map);
      return () => {
        _map.destroy();
      };
    }
  }, [container]);
  (0, _react.useEffect)(() => {
    if (map) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      map.updateLayers(groups, optionsWithoutBounds);
    }
  }, [map, groups, optionsWithoutBounds]);
  (0, _react.useEffect)(() => {
    if (map) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      map.updateBounds(options.bounds);
    }
  }, [map, options.bounds]);
  (0, _react.useEffect)(() => {
    if (map && onOptionsChange) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      map.onBoundsChange = bounds => {
        onOptionsChange((0, _lodash.merge)({}, options, {
          bounds
        }));
      };
    }
  }, [map, options, onOptionsChange]);

  // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "map-visualization-container",
    ref: setContainer
  });
}
Renderer.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=Renderer.js.map