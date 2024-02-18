"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SVGRadialGradient;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSvg = require("react-native-svg");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function SVGRadialGradient({
  id,
  size,
  origin = [0, 0],
  center = [0.5, 0.5],
  radius = [1, 1],
  colors = ['black', 'white'],
  locations = [0, 1]
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.RadialGradient, {
    id: id,
    gradientUnits: "userSpaceOnUse",
    cx: center[0] * size + origin[0],
    cy: center[1] * size + origin[1],
    rx: radius[0] * size,
    ry: radius[1] * size
  }, colors?.map((c, i) => /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Stop, {
    key: i,
    offset: locations?.[i],
    stopColor: c,
    stopOpacity: "1"
  })));
}
//# sourceMappingURL=SVGRadialGradient.js.map