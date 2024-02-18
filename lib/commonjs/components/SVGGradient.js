"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SVGGradient;
var _react = _interopRequireDefault(require("react"));
var _SVGLinearGradient = _interopRequireDefault(require("./SVGLinearGradient"));
var _SVGRadialGradient = _interopRequireDefault(require("./SVGRadialGradient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function SVGGradient({
  type,
  options,
  ...props
}) {
  if (type === 'radial') {
    return /*#__PURE__*/_react.default.createElement(_SVGRadialGradient.default, _extends({}, options, props));
  }
  return /*#__PURE__*/_react.default.createElement(_SVGLinearGradient.default, _extends({}, options, props));
}
//# sourceMappingURL=SVGGradient.js.map