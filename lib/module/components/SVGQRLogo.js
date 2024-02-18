function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, useMemo } from 'react';
import { Image as SVGImage } from 'react-native-svg';
import useQRCodeLogoSize from '../hooks/useQRCodeLogoSize';
export default function SVGQRLogo({
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
  } = useQRCodeLogoSize({
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
  const logoArea = useMemo(() => hasSize ? {
    x: logoX,
    y: logoY,
    width,
    height
  } : undefined, [hasSize, logoX, logoY, width, height]);
  useEffect(() => {
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
  return /*#__PURE__*/React.createElement(SVGImage, _extends({
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