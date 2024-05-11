"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preparePieData;
exports.getPieDimensions = getPieDimensions;
var _lodash = require("lodash");
var _d = _interopRequireDefault(require("d3"));
var _chooseTextColorForBackground = _interopRequireDefault(require("../../../lib/chooseTextColorForBackground"));
var _ColorPalette = require("../../ColorPalette");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getPieDimensions(series) {
  var rows = series.length > 2 ? 2 : 1;
  var cellsInRow = Math.ceil(series.length / rows);
  var cellWidth = 1 / cellsInRow;
  var cellHeight = 1 / rows;
  var xPadding = 0.02;
  var yPadding = 0.1;
  return {
    rows,
    cellsInRow,
    cellWidth,
    cellHeight,
    xPadding,
    yPadding
  };
}
function getPieHoverInfoPattern(options) {
  var hasX = /{{\s*@@x\s*}}/.test(options.textFormat);
  var result = "text";
  if (!hasX) result += "+label";
  return result;
}
function prepareSeries(series, options, additionalOptions) {
  var cellWidth = additionalOptions.cellWidth,
    cellHeight = additionalOptions.cellHeight,
    xPadding = additionalOptions.xPadding,
    yPadding = additionalOptions.yPadding,
    cellsInRow = additionalOptions.cellsInRow,
    hasX = additionalOptions.hasX,
    index = additionalOptions.index,
    hoverInfoPattern = additionalOptions.hoverInfoPattern,
    getValueColor = additionalOptions.getValueColor;
  var seriesOptions = (0, _lodash.extend)({
    type: options.globalSeriesType,
    yAxis: 0
  }, options.seriesOptions[series.name]);
  var xPosition = index % cellsInRow * cellWidth;
  var yPosition = Math.floor(index / cellsInRow) * cellHeight;

  //we hold the labels and values in a dictionary so that we can aggregate multiple values for a single label
  //once we reach the end of the data, we'll convert the dictionary to separate arrays for labels and values
  var labelsValuesDict = {};
  var sourceData = new Map();
  var seriesTotal = (0, _lodash.reduce)(series.data, (result, row) => {
    var y = (0, _utils.cleanNumber)(row.y);
    return result + Math.abs(y);
  }, 0);
  (0, _lodash.each)(series.data, row => {
    var x = hasX ? (0, _utils.normalizeValue)(row.x, options.xAxis.type) : "Slice ".concat(index);
    var y = (0, _utils.cleanNumber)(row.y);
    if (x in labelsValuesDict) {
      labelsValuesDict[x] += y;
    } else {
      labelsValuesDict[x] = y;
    }
    var aggregatedY = labelsValuesDict[x];
    sourceData.set(x, {
      x,
      y: aggregatedY,
      yPercent: aggregatedY / seriesTotal * 100,
      row
    });
  });
  var markerColors = (0, _lodash.map)(Array.from(sourceData.values()), data => getValueColor(data.row.x));
  var textColors = (0, _lodash.map)(markerColors, c => (0, _chooseTextColorForBackground.default)(c));
  var labels = Object.keys(labelsValuesDict);
  var values = Object.values(labelsValuesDict);
  return {
    visible: true,
    values,
    labels,
    type: "pie",
    hole: 0.4,
    marker: {
      colors: markerColors
    },
    hoverinfo: hoverInfoPattern,
    text: [],
    textinfo: options.showDataLabels ? "percent" : "none",
    textposition: "inside",
    textfont: {
      color: textColors
    },
    name: seriesOptions.name || series.name,
    direction: options.direction.type,
    domain: {
      x: [xPosition, xPosition + cellWidth - xPadding],
      y: [yPosition, yPosition + cellHeight - yPadding]
    },
    sourceData
  };
}
function preparePieData(seriesList, options) {
  // we will use this to assign colors for values that have no explicitly set color
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
  var getDefaultColor = _d.default.scale.ordinal().domain([]).range(_ColorPalette.ColorPaletteArray);
  var valuesColors = {};
  (0, _lodash.each)(options.valuesOptions, (item, key) => {
    if ((0, _lodash.isString)(item.color) && item.color !== "") {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      valuesColors[key] = item.color;
    }
  });
  var additionalOptions = _objectSpread(_objectSpread({}, getPieDimensions(seriesList)), {}, {
    hasX: (0, _lodash.includes)(options.columnMapping, "x"),
    hoverInfoPattern: getPieHoverInfoPattern(options),
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    getValueColor: v => valuesColors[v] || getDefaultColor(v)
  });
  return (0, _lodash.map)(seriesList, (series, index) => prepareSeries(series, options, _objectSpread(_objectSpread({}, additionalOptions), {}, {
    index
  })));
}
//# sourceMappingURL=preparePieData.js.map