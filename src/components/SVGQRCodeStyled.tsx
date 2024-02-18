import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ClipPath,
  Defs,
  G,
  Image as SVGImage,
  ImageProps as SVGImageProps,
  Svg,
  SvgProps,
} from 'react-native-svg';

import type { QRCodeMessage, QRCodeOptions } from '../adapters/qrcode';
import { INNER_EYE_SIZE_IN_BITS, OUTER_EYE_SIZE_IN_BITS } from '../constants';
import { transformEyeOptionsToCommonPattern } from '../helpers';
import useQRCodeData from '../hooks/useQRCodeData';
import type {
  AllEyesOptions,
  BitMatrix,
  EyeOptions,
  EyePosition,
  GradientOrigin,
  LogoArea,
  LogoOptions,
  PieceOptions,
  RenderCustomPieceItem,
} from '../types';
import SVGGradient from './SVGGradient';
import SVGPieces, { DEFAULT_PIECE_SIZE } from './SVGPieces';
import SVGQRLogo from './SVGQRLogo';

export interface SVGQRCodeStyledProps
  extends QRCodeOptions,
    PieceOptions,
    SvgProps {
  data?: QRCodeMessage;
  onChangeSize?: (size: number) => void;
  pieceLiquidRadius?: number;
  outerEyesOptions?: EyeOptions | AllEyesOptions;
  innerEyesOptions?: EyeOptions | AllEyesOptions;
  renderCustomPieceItem?: RenderCustomPieceItem;
  isPiecesGlued?: boolean;
  padding?: number;
  backgroundImage?: SVGImageProps;
  logo?: LogoOptions;
  children?: (pieceSize: number, bitMatrix: BitMatrix) => SvgProps['children'];
  renderBackground?: (
    pieceSize: number,
    bitMatrix: BitMatrix,
  ) => SvgProps['children'];
  fluidDimensions?: boolean;
}

function SVGQRCodeStyled(
  {
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
  }: SVGQRCodeStyledProps,
  ref?: ForwardedRef<Svg> | null,
) {
  const {hidePieces = true, onChange: onChangeLogo, ...logoProps} = logo || {};
  const [logoArea, setLogoArea] = useState<LogoArea | undefined>();
  const qrCodeOptions = useMemo(
    () => ({
      version,
      errorCorrectionLevel,
      maskPattern,
      toSJISFunc,
    }),
    [errorCorrectionLevel, maskPattern, toSJISFunc, version],
  );
  const {qrCodeSize, bitMatrix} = useQRCodeData(data, qrCodeOptions);
  const svgSize = pieceSize * qrCodeSize;

  useEffect(() => {
    onChangeSize?.(qrCodeSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodeSize]);

  const transformedOuterEyesOptions =
    transformEyeOptionsToCommonPattern(outerEyesOptions);
  const transformedInnerEyesOptions =
    transformEyeOptionsToCommonPattern(innerEyesOptions);

  const _props = {...props};
  if (padding) {
    const _size = svgSize + 2 * padding;
    _props.width = _size;
    _props.height = _size;
    _props.viewBox = `-${padding} -${padding} ${_size} ${_size}`;
  }

  const startGradientOuterEyeCoords: {[K in EyePosition]: GradientOrigin} = {
    topLeft: [0, 0],
    topRight: [svgSize - pieceSize * OUTER_EYE_SIZE_IN_BITS, 0],
    bottomLeft: [0, svgSize - pieceSize * OUTER_EYE_SIZE_IN_BITS],
  };

  const startGradientInnerEyeCoords: {[K in EyePosition]: GradientOrigin} = {
    topLeft: [2 * pieceSize, 2 * pieceSize],
    topRight: [
      svgSize - pieceSize * INNER_EYE_SIZE_IN_BITS + 2 * pieceSize,
      2 * pieceSize,
    ],
    bottomLeft: [
      2 * pieceSize,
      svgSize - pieceSize * OUTER_EYE_SIZE_IN_BITS + 2 * pieceSize,
    ],
  };

  const renderPieces = () => (
    <SVGPieces
      bitMatrix={bitMatrix}
      isPiecesGlued={isPiecesGlued}
      pieceLiquidRadius={pieceLiquidRadius}
      pieceBorderRadius={pieceBorderRadius}
      pieceCornerType={pieceCornerType}
      pieceRotation={pieceRotation}
      pieceScale={pieceScale}
      pieceSize={pieceSize}
      pieceStroke={pieceStroke}
      pieceStrokeWidth={pieceStrokeWidth}
      outerEyesOptions={transformedOuterEyesOptions}
      innerEyesOptions={transformedInnerEyesOptions}
      renderCustomPieceItem={renderCustomPieceItem}
      logoArea={hidePieces ? logoArea : undefined}
    />
  );

  const handleChangeLogo = (area: LogoArea | undefined) => {
    setLogoArea(area);
    onChangeLogo?.(area);
  };

  const renderLogo = () =>
    logo ? (
      <SVGQRLogo
        {...logoProps}
        errorCorrectionLevel={errorCorrectionLevel}
        pieceSize={pieceSize}
        qrCodeSize={qrCodeSize}
        onChange={handleChangeLogo}
      />
    ) : null;

  if (backgroundImage) {
    return (
      <Svg
        ref={ref}
        {..._props}
        width={fluidDimensions ? '100%' : svgSize}
        height={fluidDimensions ? '100%' : svgSize}>
        <Defs>
          <ClipPath id={'image'}>
            <G>{renderPieces()}</G>
          </ClipPath>
        </Defs>

        {renderBackground?.(pieceSize, bitMatrix)}

        <SVGImage
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMaxYMax slice"
          {...backgroundImage}
          clipPath="url(#image)"
        />

        {renderLogo()}

        {children?.(pieceSize, bitMatrix)}
      </Svg>
    );
  }

  return (
    <Svg
      ref={ref}
      {..._props}
      width={fluidDimensions ? '100%' : svgSize}
      height={fluidDimensions ? '100%' : svgSize}>
      {(!!gradient ||
        !!transformedOuterEyesOptions ||
        !!transformedInnerEyesOptions) && (
        <Defs>
          {!!gradient && (
            <SVGGradient id="gradient" size={svgSize} {...gradient} />
          )}

          {!!transformedOuterEyesOptions &&
            Object.keys(transformedOuterEyesOptions).map(key => {
              return (
                <SVGGradient
                  id={`${key}CornerSquareGradient`}
                  key={`${key}CornerSquareGradient`}
                  size={pieceSize * OUTER_EYE_SIZE_IN_BITS}
                  origin={startGradientOuterEyeCoords[key as EyePosition]}
                  {...transformedOuterEyesOptions?.[key as EyePosition]
                    ?.gradient}
                />
              );
            })}

          {!!transformedInnerEyesOptions &&
            Object.keys(transformedInnerEyesOptions).map(key => {
              return (
                <SVGGradient
                  id={`${key}CornerDotGradient`}
                  key={`${key}CornerDotGradient`}
                  size={pieceSize * INNER_EYE_SIZE_IN_BITS}
                  origin={startGradientInnerEyeCoords[key as EyePosition]}
                  {...transformedInnerEyesOptions?.[key as EyePosition]
                    ?.gradient}
                />
              );
            })}
        </Defs>
      )}

      {renderBackground?.(pieceSize, bitMatrix)}

      <G fill={gradient ? 'url(#gradient)' : color}>{renderPieces()}</G>

      {renderLogo()}

      {children?.(pieceSize, bitMatrix)}
    </Svg>
  );
}

const forwardedSVGQRCodeStyled = forwardRef(SVGQRCodeStyled);
forwardedSVGQRCodeStyled.displayName = 'SVGQRCodeStyled';

export default forwardedSVGQRCodeStyled;
