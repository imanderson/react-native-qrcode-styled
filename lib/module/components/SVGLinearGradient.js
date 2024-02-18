import React from 'react';
import { LinearGradient, Stop } from 'react-native-svg';
export default function SVGLinearGradient({
  id,
  size,
  origin = [0, 0],
  start = [0, 0],
  end = [1, 1],
  colors = ['black', 'white'],
  locations = [0, 1]
}) {
  return /*#__PURE__*/React.createElement(LinearGradient, {
    id: id,
    gradientUnits: "userSpaceOnUse",
    x1: start[0] * size + origin[0],
    y1: start[1] * size + origin[1],
    x2: end[0] * size + origin[0],
    y2: end[1] * size + origin[1]
  }, colors?.map((c, i) => /*#__PURE__*/React.createElement(Stop, {
    key: i,
    offset: locations?.[i],
    stopColor: c,
    stopOpacity: "1"
  })));
}
//# sourceMappingURL=SVGLinearGradient.js.map