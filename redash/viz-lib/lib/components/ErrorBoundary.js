"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorBoundaryContext = void 0;
exports.ErrorMessage = ErrorMessage;
exports.default = void 0;
var _lodash = require("lodash");
var _react = _interopRequireDefault(require("react"));
var _debug = _interopRequireDefault(require("debug"));
var _alert = _interopRequireDefault(require("antd/lib/alert"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var logger = (0, _debug.default)("redash:errors");
var ErrorBoundaryContext = _react.default.createContext({
  handleError: error => {
    // Allow calling chain to roll up, and then throw the error in global context
    setTimeout(() => {
      throw error;
    });
  },
  reset: () => {}
});
exports.ErrorBoundaryContext = ErrorBoundaryContext;
function ErrorMessage(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_alert.default, {
    message: children,
    type: "error",
    showIcon: true
  });
}
ErrorMessage.defaultProps = {
  children: "Something went wrong."
};
class ErrorBoundary extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      error: null
    });
    _defineProperty(this, "handleError", error => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDerivedStateFromError' does not exist... Remove this comment to see the full error message
      this.setState(this.constructor.getDerivedStateFromError(error));
      this.componentDidCatch(error, null);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleException' does not exist on type ... Remove this comment to see the full error message
      if ((0, _lodash.isFunction)(window.handleException)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleException' does not exist on type ... Remove this comment to see the full error message
        window.handleException(error);
      }
    });
    _defineProperty(this, "reset", () => {
      this.setState({
        error: null
      });
    });
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    logger(error, errorInfo);
  }
  render() {
    var _this$props = this.props,
      renderError = _this$props.renderError,
      children = _this$props.children;
    var error = this.state.error;
    if (error) {
      if ((0, _lodash.isFunction)(renderError)) {
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        return renderError(error);
      }
      return /*#__PURE__*/_react.default.createElement(ErrorMessage, null);
    }
    return /*#__PURE__*/_react.default.createElement(ErrorBoundaryContext.Provider, {
      value: this
    }, children);
  }
}
exports.default = ErrorBoundary;
_defineProperty(ErrorBoundary, "defaultProps", {
  children: null,
  renderError: null
});
//# sourceMappingURL=ErrorBoundary.js.map