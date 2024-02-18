"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeSvg = require("react-native-svg");
var _constants = require("../constants");
var _helpers = require("../helpers");
var _useQRCodeData = _interopRequireDefault(require("../hooks/useQRCodeData"));
var _SVGGradient = _interopRequireDefault(require("./SVGGradient"));
var _SVGPieces = _interopRequireWildcard(require("./SVGPieces"));
var _SVGQRLogo = _interopRequireDefault(require("./SVGQRLogo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function SVGQRCodeStyled({
  data = "I'm QR Code!",
  onChangeSize,
  pieceSize = _SVGPieces.DEFAULT_PIECE_SIZE,
  pieceScale,
  pieceRotation,
  pieceCornerType = 'rounded',
  pieceBorderRadius = 0,
  pieceStroke,
  pieceStrokeWidth,
  pieceLiquidRadius,
  isPiecesGlued = false,
  outerEyesOptions,
  innerEyesOptions,
  renderCustomPieceItem,
  padding,
  color = 'black',
  gradient,
  logo,
  backgroundImage,
  version,
  maskPattern,
  toSJISFunc,
  errorCorrectionLevel = 'M',
  children,
  renderBackground,
  fluidDimensions,
  ...props
}, ref) {
  const {
    hidePieces = true,
    onChange: onChangeLogo,
    ...logoProps
  } = logo || {};
  const [logoArea, setLogoArea] = (0, _react.useState)();
  const qrCodeOptions = (0, _react.useMemo)(() => ({
    version,
    errorCorrectionLevel,
    maskPattern,
    toSJISFunc
  }), [errorCorrectionLevel, maskPattern, toSJISFunc, version]);
  const {
    qrCodeSize,
    bitMatrix
  } = (0, _useQRCodeData.default)(data, qrCodeOptions);
  const svgSize = pieceSize * qrCodeSize;
  (0, _react.useEffect)(() => {
    onChangeSize?.(qrCodeSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodeSize]);
  const transformedOuterEyesOptions = (0, _helpers.transformEyeOptionsToCommonPattern)(outerEyesOptions);
  const transformedInnerEyesOptions = (0, _helpers.transformEyeOptionsToCommonPattern)(innerEyesOptions);
  const _props = {
    ...props
  };
  if (padding) {
    const _size = svgSize + 2 * padding;
    _props.width = _size;
    _props.height = _size;
    _props.viewBox = `-${padding} -${padding} ${_size} ${_size}`;
  }
  const startGradientOuterEyeCoords = {
    topLeft: [0, 0],
    topRight: [svgSize - pieceSize * _constants.OUTER_EYE_SIZE_IN_BITS, 0],
    bottomLeft: [0, svgSize - pieceSize * _constants.OUTER_EYE_SIZE_IN_BITS]
  };
  const startGradientInnerEyeCoords = {
    topLeft: [2 * pieceSize, 2 * pieceSize],
    topRight: [svgSize - pieceSize * _constants.INNER_EYE_SIZE_IN_BITS + 2 * pieceSize, 2 * pieceSize],
    bottomLeft: [2 * pieceSize, svgSize - pieceSize * _constants.OUTER_EYE_SIZE_IN_BITS + 2 * pieceSize]
  };
  const renderPieces = () => /*#__PURE__*/_react.default.createElement(_SVGPieces.default, {
    bitMatrix: bitMatrix,
    isPiecesGlued: isPiecesGlued,
    pieceLiquidRadius: pieceLiquidRadius,
    pieceBorderRadius: pieceBorderRadius,
    pieceCornerType: pieceCornerType,
    pieceRotation: pieceRotation,
    pieceScale: pieceScale,
    pieceSize: pieceSize,
    pieceStroke: pieceStroke,
    pieceStrokeWidth: pieceStrokeWidth,
    outerEyesOptions: transformedOuterEyesOptions,
    innerEyesOptions: transformedInnerEyesOptions,
    renderCustomPieceItem: renderCustomPieceItem,
    logoArea: hidePieces ? logoArea : undefined
  });
  const handleChangeLogo = area => {
    setLogoArea(area);
    onChangeLogo?.(area);
  };
  const renderLogo = () => logo ? /*#__PURE__*/_react.default.createElement(_SVGQRLogo.default, _extends({}, logoProps, {
    errorCorrectionLevel: errorCorrectionLevel,
    pieceSize: pieceSize,
    qrCodeSize: qrCodeSize,
    onChange: handleChangeLogo
  })) : null;
  if (backgroundImage) {
    return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Svg, _extends({
      ref: ref
    }, _props, {
      width: fluidDimensions ? '100%' : svgSize,
      height: fluidDimensions ? '100%' : svgSize
    }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Defs, null, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.ClipPath, {
      id: 'image'
    }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.G, null, renderPieces()))), renderBackground?.(pieceSize, bitMatrix), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Image, _extends({
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
      preserveAspectRatio: "xMaxYMax slice"
    }, backgroundImage, {
      clipPath: "url(#image)"
    })), renderLogo(), children?.(pieceSize, bitMatrix));
  }
  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Svg, _extends({
    ref: ref
  }, _props, {
    width: fluidDimensions ? '100%' : svgSize,
    height: fluidDimensions ? '100%' : svgSize
  }), (!!gradient || !!transformedOuterEyesOptions || !!transformedInnerEyesOptions) && /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Defs, null, !!gradient && /*#__PURE__*/_react.default.createElement(_SVGGradient.default, _extends({
    id: "gradient",
    size: svgSize
  }, gradient)), !!transformedOuterEyesOptions && Object.keys(transformedOuterEyesOptions).map(key => {
    return /*#__PURE__*/_react.default.createElement(_SVGGradient.default, _extends({
      id: `${key}CornerSquareGradient`,
      key: `${key}CornerSquareGradient`,
      size: pieceSize * _constants.OUTER_EYE_SIZE_IN_BITS,
      origin: startGradientOuterEyeCoords[key]
    }, transformedOuterEyesOptions?.[key]?.gradient));
  }), !!transformedInnerEyesOptions && Object.keys(transformedInnerEyesOptions).map(key => {
    return /*#__PURE__*/_react.default.createElement(_SVGGradient.default, _extends({
      id: `${key}CornerDotGradient`,
      key: `${key}CornerDotGradient`,
      size: pieceSize * _constants.INNER_EYE_SIZE_IN_BITS,
      origin: startGradientInnerEyeCoords[key]
    }, transformedInnerEyesOptions?.[key]?.gradient));
  })), renderBackground?.(pieceSize, bitMatrix), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.G, {
    fill: gradient ? 'url(#gradient)' : color
  }, renderPieces()), renderLogo(), children?.(pieceSize, bitMatrix));
}
const forwardedSVGQRCodeStyled = /*#__PURE__*/(0, _react.forwardRef)(SVGQRCodeStyled);
forwardedSVGQRCodeStyled.displayName = 'SVGQRCodeStyled';
var _default = exports.default = forwardedSVGQRCodeStyled;
//# sourceMappingURL=SVGQRCodeStyled.js.map