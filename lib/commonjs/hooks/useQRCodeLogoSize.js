"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useQRCodeLogoSize;
var _react = require("react");
var _reactNative = require("react-native");
var _constants = require("../constants");
var _helpers = require("../helpers");
function useQRCodeLogoSize({
  errorCorrectionLevel,
  logoHref,
  logoScale,
  pieceSize,
  qrCodeSize
}) {
  const [transformedLogoSize, setTransformedLogoSize] = (0, _react.useState)({
    width: 0,
    height: 0
  });
  const transformLogoSize = (0, _react.useCallback)((width, height) => {
    const [widthPt, heightPt] = [width / _reactNative.PixelRatio.get(), height / _reactNative.PixelRatio.get()];
    const sLogo = widthPt * heightPt;
    const sQR = qrCodeSize ** 2 * pieceSize ** 2;
    const logoRatio = width / height;
    const maxS = sQR * _constants.QR_ECL_PERS[errorCorrectionLevel];
    let newWidth;
    let newHeight;
    if (sLogo > maxS) {
      const k = Math.sqrt(maxS / logoRatio);
      newWidth = Math.floor(k * logoRatio) * logoScale;
      newHeight = Math.floor(k) * logoScale;
    } else {
      newWidth = widthPt * logoScale;
      newHeight = heightPt * logoScale;
    }
    const roundedWidthInPiece = Math.round(newWidth / pieceSize);
    const roundedHeightInPiece = Math.round(newHeight / pieceSize);
    if (roundedWidthInPiece === roundedHeightInPiece) {
      newWidth = pieceSize * (roundedWidthInPiece % 2 === 0 ? roundedWidthInPiece - 1 : roundedWidthInPiece);
      newHeight = newWidth;
    } else if (roundedWidthInPiece > roundedHeightInPiece) {
      newWidth = pieceSize * (roundedWidthInPiece % 2 === 0 ? roundedWidthInPiece - 1 : roundedWidthInPiece);
      newHeight = pieceSize * (newWidth % pieceSize !== 0 ? roundedHeightInPiece - 1 : roundedHeightInPiece);
    } else {
      newHeight = pieceSize * (roundedHeightInPiece % 2 === 0 ? roundedHeightInPiece - 1 : roundedHeightInPiece);
      newWidth = pieceSize * (newHeight % pieceSize !== 0 ? roundedWidthInPiece - 1 : roundedWidthInPiece);
    }
    setTransformedLogoSize({
      width: newWidth,
      height: newHeight
    });
  }, [errorCorrectionLevel, logoScale, pieceSize, qrCodeSize]);
  (0, _react.useEffect)(() => {
    if (logoHref) {
      // if logo is static
      if (typeof logoHref === 'number') {
        const {
          width,
          height
        } = _reactNative.Image.resolveAssetSource(logoHref);
        transformLogoSize(width, height);
      }

      // if logo is string & remote
      if (typeof logoHref === 'string') {
        _reactNative.Image.getSize(logoHref, transformLogoSize, () => (0, _helpers.consoleWarn)('Something wrong with logo url: ' + logoHref));
      }

      // if logo is object & remote
      if (typeof logoHref !== 'string' && typeof logoHref !== 'number' && !Array.isArray(logoHref) && logoHref.uri) {
        _reactNative.Image.getSize(logoHref.uri, transformLogoSize, () => (0, _helpers.consoleWarn)('Something wrong with logo url: ' + logoHref.uri));
      }
    }
  }, [logoHref, transformLogoSize]);
  return transformedLogoSize;
}
//# sourceMappingURL=useQRCodeLogoSize.js.map