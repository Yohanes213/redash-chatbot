"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plotly = void 0;
Object.defineProperty(exports, "createCustomChartRenderer", {
  enumerable: true,
  get: function get() {
    return _customChartUtils.createCustomChartRenderer;
  }
});
Object.defineProperty(exports, "prepareCustomChartData", {
  enumerable: true,
  get: function get() {
    return _customChartUtils.prepareCustomChartData;
  }
});
Object.defineProperty(exports, "prepareData", {
  enumerable: true,
  get: function get() {
    return _prepareData.default;
  }
});
Object.defineProperty(exports, "prepareLayout", {
  enumerable: true,
  get: function get() {
    return _prepareLayout.default;
  }
});
Object.defineProperty(exports, "updateAxes", {
  enumerable: true,
  get: function get() {
    return _updateAxes.default;
  }
});
Object.defineProperty(exports, "updateChartSize", {
  enumerable: true,
  get: function get() {
    return _updateChartSize.default;
  }
});
Object.defineProperty(exports, "updateData", {
  enumerable: true,
  get: function get() {
    return _updateData.default;
  }
});
var Plotly = _interopRequireWildcard(require("plotly.js"));
exports.Plotly = Plotly;
var _prepareData = _interopRequireDefault(require("./prepareData"));
var _prepareLayout = _interopRequireDefault(require("./prepareLayout"));
var _updateData = _interopRequireDefault(require("./updateData"));
var _updateAxes = _interopRequireDefault(require("./updateAxes"));
var _updateChartSize = _interopRequireDefault(require("./updateChartSize"));
var _customChartUtils = require("./customChartUtils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'setPlotConfig' does not exist on type 't... Remove this comment to see the full error message
Plotly.setPlotConfig({
  modeBarButtonsToRemove: ["sendDataToCloud"]
});
//# sourceMappingURL=index.js.map