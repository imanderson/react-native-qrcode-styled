import React from 'react';
import { ImageProps as SVGImageProps, Svg, SvgProps } from 'react-native-svg';
import type { QRCodeMessage, QRCodeOptions } from '../adapters/qrcode';
import type { AllEyesOptions, BitMatrix, EyeOptions, LogoOptions, PieceOptions, RenderCustomPieceItem } from '../types';
export interface SVGQRCodeStyledProps extends QRCodeOptions, PieceOptions, Omit<SvgProps, 'children'> {
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
    renderBackground?: (pieceSize: number, bitMatrix: BitMatrix) => SvgProps['children'];
    fluidDimensions?: boolean;
}
declare const forwardedSVGQRCodeStyled: React.ForwardRefExoticComponent<SVGQRCodeStyledProps & React.RefAttributes<Svg>>;
export default forwardedSVGQRCodeStyled;
//# sourceMappingURL=SVGQRCodeStyled.d.ts.map