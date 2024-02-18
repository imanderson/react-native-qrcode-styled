function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import SVGLinearGradient from './SVGLinearGradient';
import SVGRadialGradient from './SVGRadialGradient';
export default function SVGGradient({
  type,
  options,
  ...props
}) {
  if (type === 'radial') {
    return /*#__PURE__*/React.createElement(SVGRadialGradient, _extends({}, options, props));
  }
  return /*#__PURE__*/React.createElement(SVGLinearGradient, _extends({}, options, props));
}
//# sourceMappingURL=SVGGradient.js.map