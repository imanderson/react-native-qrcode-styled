import React from 'react';
import { RadialGradient, Stop } from 'react-native-svg';
export default function SVGRadialGradient({
  id,
  size,
  origin = [0, 0],
  center = [0.5, 0.5],
  radius = [1, 1],
  colors = ['black', 'white'],
  locations = [0, 1]
}) {
  return /*#__PURE__*/React.createElement(RadialGradient, {
    id: id,
    gradientUnits: "userSpaceOnUse",
    cx: center[0] * size + origin[0],
    cy: center[1] * size + origin[1],
    rx: radius[0] * size,
    ry: radius[1] * size
  }, colors?.map((c, i) => /*#__PURE__*/React.createElement(Stop, {
    key: i,
    offset: locations?.[i],
    stopColor: c,
    stopOpacity: "1"
  })));
}
//# sourceMappingURL=SVGRadialGradient.js.map