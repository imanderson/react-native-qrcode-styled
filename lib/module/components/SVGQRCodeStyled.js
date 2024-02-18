function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { ClipPath, Defs, G, Image as SVGImage, Svg } from 'react-native-svg';
import { INNER_EYE_SIZE_IN_BITS, OUTER_EYE_SIZE_IN_BITS } from '../constants';
import { transformEyeOptionsToCommonPattern } from '../helpers';
import useQRCodeData from '../hooks/useQRCodeData';
import SVGGradient from './SVGGradient';
import SVGPieces, { DEFAULT_PIECE_SIZE } from './SVGPieces';
import SVGQRLogo from './SVGQRLogo';
function SVGQRCodeStyled({
  data = "I'm QR Code!",
  onChangeSize,
  pieceSize = DEFAULT_PIECE_SIZE,
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
  const [logoArea, setLogoArea] = useState();
  const qrCodeOptions = useMemo(() => ({
    version,
    errorCorrectionLevel,
    maskPattern,
    toSJISFunc
  }), [errorCorrectionLevel, maskPattern, toSJISFunc, version]);
  const {
    qrCodeSize,
    bitMatrix
  } = useQRCodeData(data, qrCodeOptions);
  const svgSize = pieceSize * qrCodeSize;
  useEffect(() => {
    onChangeSize?.(qrCodeSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodeSize]);
  const transformedOuterEyesOptions = transformEyeOptionsToCommonPattern(outerEyesOptions);
  const transformedInnerEyesOptions = transformEyeOptionsToCommonPattern(innerEyesOptions);
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
    topRight: [svgSize - pieceSize * OUTER_EYE_SIZE_IN_BITS, 0],
    bottomLeft: [0, svgSize - pieceSize * OUTER_EYE_SIZE_IN_BITS]
  };
  const startGradientInnerEyeCoords = {
    topLeft: [2 * pieceSize, 2 * pieceSize],
    topRight: [svgSize - pieceSize * INNER_EYE_SIZE_IN_BITS + 2 * pieceSize, 2 * pieceSize],
    bottomLeft: [2 * pieceSize, svgSize - pieceSize * OUTER_EYE_SIZE_IN_BITS + 2 * pieceSize]
  };
  const renderPieces = () => /*#__PURE__*/React.createElement(SVGPieces, {
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
  const renderLogo = () => logo ? /*#__PURE__*/React.createElement(SVGQRLogo, _extends({}, logoProps, {
    errorCorrectionLevel: errorCorrectionLevel,
    pieceSize: pieceSize,
    qrCodeSize: qrCodeSize,
    onChange: handleChangeLogo
  })) : null;
  if (backgroundImage) {
    return /*#__PURE__*/React.createElement(Svg, _extends({
      ref: ref
    }, _props, {
      width: fluidDimensions ? '100%' : svgSize,
      height: fluidDimensions ? '100%' : svgSize
    }), /*#__PURE__*/React.createElement(Defs, null, /*#__PURE__*/React.createElement(ClipPath, {
      id: 'image'
    }, /*#__PURE__*/React.createElement(G, null, renderPieces()))), renderBackground?.(pieceSize, bitMatrix), /*#__PURE__*/React.createElement(SVGImage, _extends({
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
      preserveAspectRatio: "xMaxYMax slice"
    }, backgroundImage, {
      clipPath: "url(#image)"
    })), renderLogo(), children?.(pieceSize, bitMatrix));
  }
  return /*#__PURE__*/React.createElement(Svg, _extends({
    ref: ref
  }, _props, {
    width: fluidDimensions ? '100%' : svgSize,
    height: fluidDimensions ? '100%' : svgSize
  }), (!!gradient || !!transformedOuterEyesOptions || !!transformedInnerEyesOptions) && /*#__PURE__*/React.createElement(Defs, null, !!gradient && /*#__PURE__*/React.createElement(SVGGradient, _extends({
    id: "gradient",
    size: svgSize
  }, gradient)), !!transformedOuterEyesOptions && Object.keys(transformedOuterEyesOptions).map(key => {
    return /*#__PURE__*/React.createElement(SVGGradient, _extends({
      id: `${key}CornerSquareGradient`,
      key: `${key}CornerSquareGradient`,
      size: pieceSize * OUTER_EYE_SIZE_IN_BITS,
      origin: startGradientOuterEyeCoords[key]
    }, transformedOuterEyesOptions?.[key]?.gradient));
  }), !!transformedInnerEyesOptions && Object.keys(transformedInnerEyesOptions).map(key => {
    return /*#__PURE__*/React.createElement(SVGGradient, _extends({
      id: `${key}CornerDotGradient`,
      key: `${key}CornerDotGradient`,
      size: pieceSize * INNER_EYE_SIZE_IN_BITS,
      origin: startGradientInnerEyeCoords[key]
    }, transformedInnerEyesOptions?.[key]?.gradient));
  })), renderBackground?.(pieceSize, bitMatrix), /*#__PURE__*/React.createElement(G, {
    fill: gradient ? 'url(#gradient)' : color
  }, renderPieces()), renderLogo(), children?.(pieceSize, bitMatrix));
}
const forwardedSVGQRCodeStyled = /*#__PURE__*/forwardRef(SVGQRCodeStyled);
forwardedSVGQRCodeStyled.displayName = 'SVGQRCodeStyled';
export default forwardedSVGQRCodeStyled;
//# sourceMappingURL=SVGQRCodeStyled.js.map