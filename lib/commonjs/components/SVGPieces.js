"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PIECE_SIZE = void 0;
exports.default = SVGPieces;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSvg = require("react-native-svg");
var _constants = require("../constants");
var _helpers = require("../helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DEFAULT_PIECE_SIZE = exports.DEFAULT_PIECE_SIZE = 5;
function SVGPieces({
  bitMatrix,
  pieceLiquidRadius = 0,
  pieceBorderRadius,
  pieceSize = DEFAULT_PIECE_SIZE,
  pieceCornerType,
  pieceScale,
  pieceRotation,
  pieceStroke,
  pieceStrokeWidth,
  outerEyesOptions,
  innerEyesOptions,
  isPiecesGlued = false,
  renderCustomPieceItem,
  logoArea
}) {
  if (!bitMatrix || !bitMatrix[0]) {
    return null;
  }
  const qrSize = bitMatrix.length * pieceSize;
  const svgPiecesMatrix = [];
  if (renderCustomPieceItem) {
    for (let y = 0; y < bitMatrix.length; y++) {
      for (let x = 0; x < bitMatrix.length; x++) {
        const PieceElement = renderCustomPieceItem({
          x,
          y,
          pieceSize,
          qrSize,
          bitMatrix
        });
        if (PieceElement) {
          svgPiecesMatrix.push(PieceElement);
        }
      }
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, svgPiecesMatrix);
  }
  const transformedPieceBorderRadius = (0, _helpers.transformBorderRadiusToArray)(pieceBorderRadius);
  for (let y = 0; y < bitMatrix.length; y++) {
    for (let x = 0; x < bitMatrix.length; x++) {
      // Not showing any shapes overlapping with logo if QR has it
      if (logoArea) {
        const _x = x * pieceSize;
        const _y = y * pieceSize;
        if (logoArea.x < _x + pieceSize && logoArea.x + logoArea.width > _x && logoArea.y < _y + pieceSize && logoArea.y + logoArea.height > _y) {
          continue;
        }
      }
      if (bitMatrix[y]?.[x] === 1) {
        const origin = `
          ${x * pieceSize + pieceSize / 2},
          ${y * pieceSize + pieceSize / 2}`;
        let d = (0, _helpers.getPieceSquarePathData)(x, y, pieceSize);
        if (transformedPieceBorderRadius) {
          d = (0, _helpers.getPieceRoundedSquarePathData)({
            x,
            y,
            size: pieceSize,
            cornerType: pieceCornerType,
            borderRadius: transformedPieceBorderRadius,
            isGlued: isPiecesGlued,
            isLiquid: !!pieceLiquidRadius,
            bitMatrix
          });
        }
        let PathComponent = /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
          scale: pieceScale,
          rotation: pieceRotation,
          origin: origin,
          stroke: pieceStroke,
          strokeWidth: pieceStrokeWidth,
          key: `${x}_${y}`,
          d: d
        });

        // not showing pieces if cornerSquaresOptions | cornerDotsOptions exist
        if (outerEyesOptions || innerEyesOptions) {
          if (outerEyesOptions && !innerEyesOptions && !(0, _helpers.isCoordsOfOuterEyes)(x, y, bitMatrix.length) || !outerEyesOptions && innerEyesOptions && !(0, _helpers.isCoordsOfInnerEyes)(x, y, bitMatrix.length) || innerEyesOptions && !(0, _helpers.isCoordsOfInnerEyes)(x, y, bitMatrix.length) && outerEyesOptions && !(0, _helpers.isCoordsOfOuterEyes)(x, y, bitMatrix.length)) {
            svgPiecesMatrix.push(PathComponent);
          }
        } else {
          svgPiecesMatrix.push(PathComponent);
        }
      } else {
        // adding liquid between bits in empty places
        if (pieceLiquidRadius) {
          if (outerEyesOptions && !(0, _helpers.isLiquidPieceInEyes)(x, y, bitMatrix.length) || !outerEyesOptions) {
            const d = (0, _helpers.getPieceLiquidPathData)(x, y, pieceSize, pieceLiquidRadius);
            const origin = `
            ${x * pieceSize + pieceSize / 2},
            ${y * pieceSize + pieceSize / 2}`;
            if (bitMatrix[y]?.[x - 1] === 1 && bitMatrix[y - 1]?.[x] === 1) {
              svgPiecesMatrix.push( /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
                key: `${x}_${y}_topLeft`,
                d: d
              }));
            }
            if (bitMatrix[y]?.[x - 1] === 1 && bitMatrix[y + 1]?.[x] === 1) {
              svgPiecesMatrix.push( /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
                rotation: -90,
                origin: origin,
                key: `${x}_${y}_topRight`,
                d: d
              }));
            }
            if (bitMatrix[y]?.[x + 1] === 1 && bitMatrix[y - 1]?.[x] === 1) {
              svgPiecesMatrix.push( /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
                rotation: 90,
                origin: origin,
                key: `${x}_${y}_bottomRight`,
                d: d
              }));
            }
            if (bitMatrix[y]?.[x + 1] === 1 && bitMatrix[y + 1]?.[x] === 1) {
              svgPiecesMatrix.push( /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
                rotation: 180,
                origin: origin,
                key: `${x}_${y}_bottomLeft`,
                d: d
              }));
            }
          }
        }
      }
    }
  }

  // adding custom corner squares if options is exist
  if (outerEyesOptions) {
    const listPositions = ['topLeft', 'topRight', 'bottomLeft'];
    const origins = {
      topLeft: `${pieceSize * _constants.OUTER_EYE_SIZE_IN_BITS / 2}, ${pieceSize * _constants.OUTER_EYE_SIZE_IN_BITS / 2}`,
      topRight: `${qrSize - pieceSize * _constants.OUTER_EYE_SIZE_IN_BITS / 2}, ${pieceSize * _constants.OUTER_EYE_SIZE_IN_BITS / 2}`,
      bottomLeft: `${pieceSize * _constants.OUTER_EYE_SIZE_IN_BITS / 2}, ${qrSize - pieceSize * _constants.OUTER_EYE_SIZE_IN_BITS / 2}`
    };
    listPositions.forEach(position => {
      let d = (0, _helpers.getOuterEyePathData)(position, pieceSize, qrSize);
      if (Object.keys(outerEyesOptions).includes(position)) {
        const transformedOuterEyeBorderRadius = (0, _helpers.transformBorderRadiusToArray)(outerEyesOptions[position]?.borderRadius);
        if (transformedOuterEyeBorderRadius) {
          d = (0, _helpers.getRoundedOuterEyePathData)(position, transformedOuterEyeBorderRadius, pieceSize, bitMatrix.length * pieceSize);
        }
      }
      svgPiecesMatrix.push( /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
        fill: outerEyesOptions?.[position]?.gradient ? `url(#${position}OuterEyeGradient)` : outerEyesOptions?.[position]?.color || undefined,
        fillRule: "evenodd",
        stroke: outerEyesOptions?.[position]?.stroke,
        strokeWidth: outerEyesOptions?.[position]?.strokeWidth,
        scale: outerEyesOptions?.[position]?.scale,
        rotation: outerEyesOptions?.[position]?.rotation,
        origin: origins[position],
        key: `${position}OuterEye`,
        d: d
      }));
    });
  }

  // adding custom corner dots if options is exist
  if (innerEyesOptions) {
    const listPositions = ['topLeft', 'topRight', 'bottomLeft'];
    const origins = {
      topLeft: `${pieceSize * 2 + pieceSize * _constants.INNER_EYE_SIZE_IN_BITS / 2}, ${pieceSize * 2 + pieceSize * _constants.INNER_EYE_SIZE_IN_BITS / 2}`,
      topRight: `${qrSize - pieceSize * 2 - pieceSize * _constants.INNER_EYE_SIZE_IN_BITS / 2}, ${pieceSize * 2 + pieceSize * _constants.INNER_EYE_SIZE_IN_BITS / 2}`,
      bottomLeft: `${pieceSize * 2 + pieceSize * _constants.INNER_EYE_SIZE_IN_BITS / 2}, ${qrSize - pieceSize * 2 - pieceSize * _constants.INNER_EYE_SIZE_IN_BITS / 2}`
    };
    listPositions.forEach(position => {
      let d = (0, _helpers.getInnerEyePathData)(position, pieceSize, bitMatrix.length * pieceSize);
      if (Object.keys(innerEyesOptions).includes(position)) {
        const transformedInnerEyeBorderRadius = (0, _helpers.transformBorderRadiusToArray)(innerEyesOptions[position]?.borderRadius);
        if (transformedInnerEyeBorderRadius) {
          d = (0, _helpers.getRoundedInnerEyePathData)(position, transformedInnerEyeBorderRadius, pieceSize, bitMatrix.length * pieceSize);
        }
      }
      svgPiecesMatrix.push( /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
        fill: innerEyesOptions?.[position]?.gradient ? `url(#${position}InnerEyeGradient)` : innerEyesOptions?.[position]?.color || undefined,
        stroke: innerEyesOptions?.[position]?.stroke,
        strokeWidth: innerEyesOptions?.[position]?.strokeWidth,
        scale: innerEyesOptions?.[position]?.scale,
        rotation: innerEyesOptions?.[position]?.rotation,
        origin: origins[position],
        key: `${position}InnerEye`,
        d: d
      }));
    });
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, svgPiecesMatrix);
}
//# sourceMappingURL=SVGPieces.js.map