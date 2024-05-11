"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeneralSettings;
var _lodash = require("lodash");
var _react = _interopRequireWildcard(require("react"));
var _editor = require("../../../components/visualizations/editor");
var _createTabbedEditor = require("../../../components/visualizations/editor/createTabbedEditor");
var _propTypes = require("../../prop-types");
var _ChartTypeSelect = _interopRequireDefault(require("./ChartTypeSelect"));
var _ColumnMappingSelect = _interopRequireDefault(require("./ColumnMappingSelect"));
var _lib = require("use-debounce/lib");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getAvailableColumnMappingTypes(options) {
  var result = ["x", "y"];
  if (!(0, _lodash.includes)(["custom", "heatmap"], options.globalSeriesType)) {
    result.push("series");
  }
  if (options.globalSeriesType === "bubble" || (0, _lodash.some)(options.seriesOptions, {
    type: "bubble"
  })) {
    result.push("size");
  }
  if (options.globalSeriesType === "heatmap") {
    result.push("zVal");
  }
  if (!(0, _lodash.includes)(["custom", "bubble", "heatmap"], options.globalSeriesType)) {
    result.push("yError");
  }
  return result;
}
function getMappedColumns(options, availableColumns) {
  var mappedColumns = {};
  var availableTypes = getAvailableColumnMappingTypes(options);
  (0, _lodash.each)(availableTypes, type => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    mappedColumns[type] = _ColumnMappingSelect.default.MappingTypes[type].multiple ? [] : null;
  });
  availableColumns = (0, _lodash.map)(availableColumns, c => c.name);
  var usedColumns = [];
  (0, _lodash.each)(options.columnMapping, (type, column) => {
    if ((0, _lodash.includes)(availableColumns, column) && (0, _lodash.includes)(availableTypes, type)) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      var multiple = _ColumnMappingSelect.default.MappingTypes[type].multiple;
      if (multiple) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        mappedColumns[type].push(column);
      } else {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        mappedColumns[type] = column;
      }
      usedColumns.push(column);
    }
  });
  return {
    mappedColumns,
    unusedColumns: (0, _lodash.difference)(availableColumns, usedColumns)
  };
}
function mappedColumnsToColumnMappings(mappedColumns) {
  var result = {};
  (0, _lodash.each)(mappedColumns, (value, type) => {
    if ((0, _lodash.isArray)(value)) {
      (0, _lodash.each)(value, v => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        result[v] = type;
      });
    } else {
      if (value) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        result[value] = type;
      }
    }
  });
  return result;
}
function GeneralSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var _useMemo = (0, _react.useMemo)(() => getMappedColumns(options, data.columns), [options, data.columns]),
    mappedColumns = _useMemo.mappedColumns,
    unusedColumns = _useMemo.unusedColumns;
  function handleGlobalSeriesTypeChange(globalSeriesType) {
    onOptionsChange({
      globalSeriesType,
      showDataLabels: globalSeriesType === "pie",
      swappedAxes: false,
      seriesOptions: (0, _lodash.mapValues)(options.seriesOptions, series => _objectSpread(_objectSpread({}, series), {}, {
        type: globalSeriesType
      }))
    });
  }
  function handleColumnMappingChange(column, type) {
    var columnMapping = mappedColumnsToColumnMappings(_objectSpread(_objectSpread({}, mappedColumns), {}, {
      [type]: column
    }));
    onOptionsChange({
      columnMapping
    }, _createTabbedEditor.UpdateOptionsStrategy.shallowMerge);
  }
  function handleLegendPlacementChange(value) {
    if (value === "hidden") {
      onOptionsChange({
        legend: {
          enabled: false
        }
      });
    } else {
      onOptionsChange({
        legend: {
          enabled: true,
          placement: value
        }
      });
    }
  }
  function handleAxesSwapping() {
    // moves any item in the right Y axis to the left one
    var seriesOptions = (0, _lodash.mapValues)(options.seriesOptions, series => _objectSpread(_objectSpread({}, series), {}, {
      yAxis: 0
    }));
    onOptionsChange({
      swappedAxes: !options.swappedAxes,
      seriesOptions
    });
  }
  var _useDebouncedCallback = (0, _lib.useDebouncedCallback)(onOptionsChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    debouncedOnOptionsChange = _useDebouncedCallback2[0];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_ChartTypeSelect.default
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; "data-test": string; defaul... Remove this comment to see the full error message
  , {
    label: "Chart Type",
    "data-test": "Chart.GlobalSeriesType",
    defaultValue: options.globalSeriesType,
    onChange: handleGlobalSeriesTypeChange
  })), (0, _lodash.includes)(["column", "line", "box"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Chart.SwappedAxes",
    defaultChecked: options.swappedAxes,
    checked: options.swappedAxes,
    onChange: handleAxesSwapping
  }, "Horizontal Chart")), (0, _lodash.map)(mappedColumns, (value, type) => /*#__PURE__*/_react.default.createElement(_ColumnMappingSelect.default
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    key: type
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    ,
    type: type,
    value: value
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    areAxesSwapped: options.swappedAxes
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown[]' is not assignable to type 'never'... Remove this comment to see the full error message
    ,
    availableColumns: unusedColumns
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(column: any, type: any) => void' is not ass... Remove this comment to see the full error message
    ,
    onChange: handleColumnMappingChange
  })), (0, _lodash.includes)(["bubble"], options.globalSeriesType) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    label: "Bubble Size Coefficient",
    "data-test": "Chart.BubbleCoefficient",
    defaultValue: options.coefficient,
    onChange: value => onOptionsChange({
      coefficient: (0, _lodash.toNumber)(value)
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Bubble Size Proportional To",
    "data-test": "Chart.SizeMode",
    defaultValue: options.sizemode,
    onChange: mode => onOptionsChange({
      sizemode: mode
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "area",
    "data-test": "Chart.SizeMode.Area"
  }, "Area"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "diameter",
    "data-test": "Chart.SizeMode.Diameter"
  }, "Diameter")))), (0, _lodash.includes)(["pie"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Direction",
    "data-test": "Chart.PieDirection",
    defaultValue: options.direction.type,
    onChange: type => onOptionsChange({
      direction: {
        type
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "counterclockwise",
    "data-test": "Chart.PieDirection.Counterclockwise"
  }, "Counterclockwise"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "clockwise",
    "data-test": "Chart.PieDirection.Clockwise"
  }, "Clockwise"))), !(0, _lodash.includes)(["custom", "heatmap"], options.globalSeriesType) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Legend Placement",
    "data-test": "Chart.LegendPlacement",
    value: options.legend.enabled ? options.legend.placement : "hidden",
    onChange: handleLegendPlacementChange
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "hidden",
    "data-test": "Chart.LegendPlacement.HideLegend"
  }, "Hide legend"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "auto",
    "data-test": "Chart.LegendPlacement.Auto"
  }, "Right"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "below",
    "data-test": "Chart.LegendPlacement.Below"
  }, "Bottom"))), options.legend.enabled &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Legend Items Order",
    "data-test": "Chart.LegendItemsOrder",
    value: options.legend.traceorder,
    onChange: traceorder => onOptionsChange({
      legend: {
        traceorder
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "normal",
    "data-test": "Chart.LegendItemsOrder.Normal"
  }, "Normal"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "reversed",
    "data-test": "Chart.LegendItemsOrder.Reversed"
  }, "Reversed")))), (0, _lodash.includes)(["box"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Chart.ShowPoints",
    defaultChecked: options.showpoints,
    onChange: event => onOptionsChange({
      showpoints: event.target.checked
    })
  }, "Show All Points")), !(0, _lodash.includes)(["custom", "heatmap"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Stacking",
    "data-test": "Chart.Stacking",
    defaultValue: options.series.stacking,
    disabled: !(0, _lodash.includes)(["line", "area", "column"], options.globalSeriesType),
    onChange: stacking => onOptionsChange({
      series: {
        stacking
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: null,
    "data-test": "Chart.Stacking.Disabled"
  }, "Disabled"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "stack",
    "data-test": "Chart.Stacking.Stack"
  }, "Stack"))), (0, _lodash.includes)(["line", "area", "column"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Chart.NormalizeValues",
    defaultChecked: options.series.percentValues,
    onChange: event => onOptionsChange({
      series: {
        percentValues: event.target.checked
      }
    })
  }, "Normalize values to percentage")), !(0, _lodash.includes)(["custom", "heatmap", "bubble", "scatter"], options.globalSeriesType) &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Missing and NULL values",
    "data-test": "Chart.MissingValues",
    defaultValue: options.missingValuesAsZero ? 1 : 0,
    onChange: value => onOptionsChange({
      missingValuesAsZero: !!value
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: 0,
    "data-test": "Chart.MissingValues.Keep"
  }, "Do not display in chart"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: 1,
    "data-test": "Chart.MissingValues.Zero"
  }, "Convert to 0 and display in chart"))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Chart.EnableClickEvents",
    defaultChecked: options.enableLink,
    onChange: event => onOptionsChange({
      enableLink: event.target.checked
    })
  }, "Enable click events")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Chart.EnableClickEvents.NewTab",
    defaultChecked: options.linkOpenNewTab,
    onChange: event => onOptionsChange({
      linkOpenNewTab: event.target.checked
    }),
    disabled: !(options.enableLink === true)
  }, "Open in new tab")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "URL template", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp, {
      placement: "topLeft",
      arrowPointAtCenter: true
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
      ,
      icon: _editor.ContextHelp.defaultIcon
    }, /*#__PURE__*/_react.default.createElement("div", null, "Every curve can be referenced using ", /*#__PURE__*/_react.default.createElement("code", null, "{{ @@x1 }} {{ @@y1 }} {{ @@x2 }} {{ @@y2 }} ..."), " syntax:", /*#__PURE__*/_react.default.createElement("br", null), "axis with any curve number according to the Series config."), /*#__PURE__*/_react.default.createElement("div", null, "The first met curve X and Y values can be referenced by just", /*#__PURE__*/_react.default.createElement("code", null, "{{ @@x }} {{ @@y }}"), " syntax."), /*#__PURE__*/_react.default.createElement("div", null, "Any unresolved reference would be replaced with an empty string."))),
    "data-test": "Chart.DataLabels.TextFormat",
    placeholder: "(nothing)",
    defaultValue: options.linkFormat,
    onChange: e => debouncedOnOptionsChange({
      linkFormat: e.target.value
    }),
    disabled: !(options.enableLink === true)
  })));
}
GeneralSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map