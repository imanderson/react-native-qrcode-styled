"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SVGQRLogo;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeSvg = require("react-native-svg");
var _useQRCodeLogoSize = _interopRequireDefault(require("../hooks/useQRCodeLogoSize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function SVGQRLogo({
  errorCorrectionLevel,
  pieceSize,
  qrCodeSize,
  padding = 0,
  scale = 1,
  href,
  x,
  y,
  onChange,
  ...props
}) {
  const {
    width,
    height
  } = (0, _useQRCodeLogoSize.default)({
    errorCorrectionLevel,
    logoHref: href,
    logoScale: scale,
    pieceSize,
    qrCodeSize
  });
  const svgSize = pieceSize * qrCodeSize;
  const hasSize = width > 0 && height > 0;
  const logoX = Number(x ?? (width ? svgSize / 2 - width / 2 : 0));
  const logoY = Number(y ?? (height ? svgSize / 2 - height / 2 : 0));
  const logoArea = (0, _react.useMemo)(() => hasSize ? {
    x: logoX,
    y: logoY,
    width,
    height
  } : undefined, [hasSize, logoX, logoY, width, height]);
  (0, _react.useEffect)(() => {
    if (hasSize) {
      onChange?.(logoArea);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSize, logoArea]);

  // padding limitations
  let _padding = padding;
  if (_padding * 2 > width) {
    _padding = width / 2;
  }
  if (_padding * 2 > height) {
    _padding = height / 2;
  }
  if (!hasSize) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Image, _extends({
    href: href,
    x: logoX + _padding,
    y: logoY + _padding,
    preserveAspectRatio: "xMidYMid meet"
  }, props, {
    width: width - _padding * 2,
    height: height - _padding * 2
  }));
}
//# sourceMappingURL=SVGQRLogo.js.map