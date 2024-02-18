"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SVGLinearGradient;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSvg = require("react-native-svg");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function SVGLinearGradient({
  id,
  size,
  origin = [0, 0],
  start = [0, 0],
  end = [1, 1],
  colors = ['black', 'white'],
  locations = [0, 1]
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.LinearGradient, {
    id: id,
    gradientUnits: "userSpaceOnUse",
    x1: start[0] * size + origin[0],
    y1: start[1] * size + origin[1],
    x2: end[0] * size + origin[0],
    y2: end[1] * size + origin[1]
  }, colors?.map((c, i) => /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Stop, {
    key: i,
    offset: locations?.[i],
    stopColor: c,
    stopOpacity: "1"
  })));
}
//# sourceMappingURL=SVGLinearGradient.js.map