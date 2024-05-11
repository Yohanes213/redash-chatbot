"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initImageColumn;
var _lodash = require("lodash");
var _react = _interopRequireDefault(require("react"));
var _useDebounce = require("use-debounce");
var _editor = require("../../../components/visualizations/editor");
var _valueFormat = require("../../../lib/value-format");
var _excluded = ["text"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function Editor(_ref) {
  var column = _ref.column,
    onChange = _ref.onChange;
  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    onChangeDebounced = _useDebouncedCallback2[0];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "URL template",
    "data-test": "Table.ColumnEditor.Image.UrlTemplate",
    defaultValue: column.imageUrlTemplate,
    onChange: event => onChangeDebounced({
      imageUrlTemplate: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ControlLabel
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
  , {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Size", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp, {
      placement: "topLeft",
      arrowPointAtCenter: true
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        marginBottom: 5
      }
    }, "Any positive integer value that specifies size in pixels."), /*#__PURE__*/_react.default.createElement("div", null, "Leave empty to use default value.")))
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "image-dimension-selector"
  }, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    "data-test": "Table.ColumnEditor.Image.Width",
    placeholder: "Width",
    defaultValue: column.imageWidth,
    onChange: event => onChangeDebounced({
      imageWidth: event.target.value
    })
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "image-dimension-selector-spacer"
  }, "\xD7"), /*#__PURE__*/_react.default.createElement(_editor.Input, {
    "data-test": "Table.ColumnEditor.Image.Height",
    placeholder: "Height",
    defaultValue: column.imageHeight,
    onChange: event => onChangeDebounced({
      imageHeight: event.target.value
    })
  })))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "Title template",
    "data-test": "Table.ColumnEditor.Image.TitleTemplate",
    defaultValue: column.imageTitleTemplate,
    onChange: event => onChangeDebounced({
      imageTitleTemplate: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ContextHelp, {
    placement: "topLeft",
    arrowPointAtCenter: true
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
    ,
    icon: /*#__PURE__*/_react.default.createElement("span", {
      style: {
        cursor: "default"
      }
    }, "Format specs ", _editor.ContextHelp.defaultIcon)
  }, /*#__PURE__*/_react.default.createElement("div", null, "All columns can be referenced using ", /*#__PURE__*/_react.default.createElement("code", null, "{{ column_name }}"), " syntax."), /*#__PURE__*/_react.default.createElement("div", null, "Use ", /*#__PURE__*/_react.default.createElement("code", null, "{{ @ }}"), " to reference current (this) column."), /*#__PURE__*/_react.default.createElement("div", null, "This syntax is applicable to URL, Title and Size options."))));
}
function initImageColumn(column) {
  function prepareData(row) {
    row = (0, _lodash.extend)({
      "@": row[column.name]
    }, row);
    var src = (0, _lodash.trim)((0, _valueFormat.formatSimpleTemplate)(column.imageUrlTemplate, row));
    if (src === "") {
      return {};
    }
    var width = parseInt((0, _valueFormat.formatSimpleTemplate)(column.imageWidth, row), 10);
    var height = parseInt((0, _valueFormat.formatSimpleTemplate)(column.imageHeight, row), 10);
    var title = (0, _lodash.trim)((0, _valueFormat.formatSimpleTemplate)(column.imageTitleTemplate, row));
    var result = {
      src
    };
    if (Number.isFinite(width) && width > 0) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'width' does not exist on type '{ src: st... Remove this comment to see the full error message
      result.width = width;
    }
    if (Number.isFinite(height) && height > 0) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'height' does not exist on type '{ src: s... Remove this comment to see the full error message
      result.height = height;
    }
    if (title !== "") {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{ src: str... Remove this comment to see the full error message
      result.text = title; // `text` is used for search
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ src: st... Remove this comment to see the full error message
      result.title = title;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'alt' does not exist on type '{ src: stri... Remove this comment to see the full error message
      result.alt = title;
    }
    return result;
  }
  function ImageColumn(_ref2) {
    var row = _ref2.row;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{}'.
    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
      text = _prepareData.text,
      props = _objectWithoutProperties(_prepareData, _excluded);
    return /*#__PURE__*/_react.default.createElement("img", _extends({
      alt: ""
    }, props));
  }
  ImageColumn.prepareData = prepareData;
  return ImageColumn;
}
initImageColumn.friendlyName = "Image";
initImageColumn.Editor = Editor;
//# sourceMappingURL=image.js.map