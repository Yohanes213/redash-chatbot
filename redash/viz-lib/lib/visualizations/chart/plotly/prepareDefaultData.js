"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareDefaultData;
var _lodash = require("lodash");
var _chooseTextColorForBackground = _interopRequireDefault(require("../../../lib/chooseTextColorForBackground"));
var _ColorPalette = require("../../ColorPalette");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getSeriesColor(seriesOptions, seriesIndex) {
  return seriesOptions.color || _ColorPalette.ColorPaletteArray[seriesIndex % _ColorPalette.ColorPaletteArray.length];
}
function getHoverInfoPattern(options) {
  var hasX = /{{\s*@@x\s*}}/.test(options.textFormat);
  var hasName = /{{\s*@@name\s*}}/.test(options.textFormat);
  var result = "text";
  if (!hasX) result += "+x";
  if (!hasName) result += "+name";
  return result;
}
function prepareBarSeries(series, options, additionalOptions) {
  series.type = "bar";
  series.offsetgroup = (0, _lodash.toString)(additionalOptions.index);
  if (options.showDataLabels) {
    series.textposition = "inside";
  }
  return series;
}
function prepareLineSeries(series, options) {
  series.mode = "lines" + (options.showDataLabels ? "+text" : "");
  return series;
}
function prepareAreaSeries(series, options) {
  series.mode = "lines" + (options.showDataLabels ? "+text" : "");
  series.fill = options.series.stacking ? "tonexty" : "tozeroy";
  return series;
}
function prepareScatterSeries(series, options) {
  series.type = "scatter";
  series.mode = "markers" + (options.showDataLabels ? "+text" : "");
  return series;
}
function prepareBubbleSeries(series, options, _ref) {
  var seriesColor = _ref.seriesColor,
    data = _ref.data;
  var coefficient = options.coefficient || 1;
  series.mode = "markers";
  series.marker = {
    color: seriesColor,
    size: (0, _lodash.map)(data, i => i.size * coefficient),
    sizemode: options.sizemode || "diameter"
  };
  return series;
}
function prepareBoxSeries(series, options, _ref2) {
  var seriesColor = _ref2.seriesColor;
  series.type = "box";
  series.mode = "markers";
  series.boxpoints = "outliers";
  series.hoverinfo = false;
  series.marker = {
    color: seriesColor,
    size: 3
  };
  if (options.showpoints) {
    series.boxpoints = "all";
    series.jitter = 0.3;
    series.pointpos = -1.8;
  }
  return series;
}
function prepareSeries(series, options, additionalOptions) {
  var _additionalOptions = additionalOptions,
    hoverInfoPattern = _additionalOptions.hoverInfoPattern,
    index = _additionalOptions.index;
  var seriesOptions = (0, _lodash.extend)({
    type: options.globalSeriesType,
    yAxis: 0
  }, options.seriesOptions[series.name]);
  var seriesColor = getSeriesColor(seriesOptions, index);
  var seriesYAxis = (0, _utils.getSeriesAxis)(series, options);

  // Sort by x - `Map` preserves order of items
  var data = options.sortX ? (0, _lodash.sortBy)(series.data, d => (0, _utils.normalizeValue)(d.x, options.xAxis.type)) : series.data;

  // For bubble/scatter charts `y` may be any (similar to `x`) - numeric is only bubble size;
  // for other types `y` is always number
  var cleanYValue = (0, _lodash.includes)(["bubble", "scatter"], seriesOptions.type) ? _utils.normalizeValue : v => {
    v = (0, _utils.cleanNumber)(v);
    return options.missingValuesAsZero && (0, _lodash.isNil)(v) ? 0.0 : v;
  };
  var sourceData = new Map();

  //we hold the labels and values in a dictionary so that we can aggregate multiple values for a single label
  //once we reach the end of the data, we'll convert the dictionary to separate arrays for labels and values
  var labelsValuesDict = {};
  var yErrorValues = [];
  (0, _lodash.each)(data, row => {
    var x = (0, _utils.normalizeValue)(row.x, options.xAxis.type); // number/datetime/category
    var y = cleanYValue(row.y, seriesYAxis === "y2" ? options.yAxis[1].type : options.yAxis[0].type); // depends on series type!
    var yError = (0, _utils.cleanNumber)(row.yError); // always number
    var size = (0, _utils.cleanNumber)(row.size); // always number
    if (x in labelsValuesDict) {
      labelsValuesDict[x] += y;
    } else {
      labelsValuesDict[x] = y;
    }
    var aggregatedY = labelsValuesDict[x];
    sourceData.set(x, {
      x,
      y: aggregatedY,
      yError,
      size,
      yPercent: null,
      // will be updated later
      row
    });
    yErrorValues.push(yError);
  });
  var xValues = Object.keys(labelsValuesDict);
  var yValues = Object.values(labelsValuesDict);
  var plotlySeries = {
    visible: true,
    hoverinfo: hoverInfoPattern,
    x: xValues,
    y: yValues,
    error_y: {
      array: yErrorValues,
      color: seriesColor
    },
    name: seriesOptions.name || series.name,
    marker: {
      color: seriesColor
    },
    insidetextfont: {
      color: (0, _chooseTextColorForBackground.default)(seriesColor)
    },
    yaxis: seriesYAxis,
    sourceData
  };
  additionalOptions = _objectSpread(_objectSpread({}, additionalOptions), {}, {
    seriesColor,
    data
  });
  switch (seriesOptions.type) {
    case "column":
      return prepareBarSeries(plotlySeries, options, additionalOptions);
    case "line":
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
      return prepareLineSeries(plotlySeries, options, additionalOptions);
    case "area":
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
      return prepareAreaSeries(plotlySeries, options, additionalOptions);
    case "scatter":
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
      return prepareScatterSeries(plotlySeries, options, additionalOptions);
    case "bubble":
      return prepareBubbleSeries(plotlySeries, options, additionalOptions);
    case "box":
      return prepareBoxSeries(plotlySeries, options, additionalOptions);
    default:
      return plotlySeries;
  }
}
function prepareDefaultData(seriesList, options) {
  var additionalOptions = {
    hoverInfoPattern: getHoverInfoPattern(options)
  };
  return (0, _lodash.map)(seriesList, (series, index) => prepareSeries(series, options, _objectSpread(_objectSpread({}, additionalOptions), {}, {
    index
  })));
}
//# sourceMappingURL=prepareDefaultData.js.map