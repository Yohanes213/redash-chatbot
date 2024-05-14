"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ColorPaletteArray = exports.BaseColors = exports.AdditionalColors = void 0;
var _lodash = require("lodash");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// The following colors will be used if you pick "Automatic" color
var BaseColors = {
  Blue: "#356AFF",
  Red: "#E92828",
  Green: "#3BD973",
  Purple: "#604FE9",
  Cyan: "#50F5ED",
  Orange: "#FB8D3D",
  "Light Blue": "#799CFF",
  Lilac: "#B554FF",
  "Light Green": "#8CFFB4",
  Brown: "#A55F2A",
  Black: "#000000",
  Gray: "#494949",
  Pink: "#FF7DE3",
  "Dark Blue": "#002FB4"
};

// Additional colors for the user to choose from
exports.BaseColors = BaseColors;
var AdditionalColors = {
  "Indian Red": "#981717",
  "Green 2": "#17BF51",
  "Green 3": "#049235",
  "Dark Turquoise": "#00B6EB",
  "Dark Violet": "#A58AFF",
  "Pink 2": "#C63FA9"
};
exports.AdditionalColors = AdditionalColors;
var ColorPaletteArray = (0, _lodash.values)(BaseColors);
exports.ColorPaletteArray = ColorPaletteArray;
var ColorPalette = _objectSpread(_objectSpread({}, BaseColors), AdditionalColors);
var _default = ColorPalette;
exports.default = _default;
//# sourceMappingURL=ColorPalette.js.map