import type React from 'react';
import type { ColorValue } from 'react-native';
import type { PathProps, ImageProps as SVGImageProps } from 'react-native-svg';
export type GradientOrigin = [number, number];
export type GradientType = 'linear' | 'radial';
export type LinearGradientProps = {
    colors?: ColorValue[];
    start?: [number, number];
    end?: [number, number];
    locations?: number[];
};
export type RadialGradientProps = {
    colors?: ColorValue[];
    center?: [number, number];
    radius?: [number, number];
    locations?: number[];
};
export type GradientProps = {
    type?: GradientType;
    options?: LinearGradientProps | RadialGradientProps;
};
export type CornerType = 'rounded' | 'cut';
export type BorderRadius = number | number[];
export type Bit = 0 | 1;
export type BitArray = Bit[];
export type BitMatrix = BitArray[];
export type PieceOptions = {
    pieceSize?: number;
    pieceScale?: PathProps['scale'];
    pieceRotation?: string | number;
    pieceCornerType?: CornerType;
    pieceBorderRadius?: BorderRadius;
    pieceStroke?: ColorValue;
    pieceStrokeWidth?: number;
    color?: ColorValue;
    gradient?: GradientProps;
};
export type EyePosition = 'topLeft' | 'topRight' | 'bottomLeft';
export type EyeOptions = {
    scale?: PathProps['scale'];
    rotation?: string | number;
    borderRadius?: BorderRadius;
    color?: ColorValue;
    gradient?: GradientProps;
    stroke?: ColorValue;
    strokeWidth?: number;
};
export type AllEyesOptions = {
    [K in EyePosition]?: EyeOptions;
};
export type RenderCustomPieceItem = ({ x, y, pieceSize, qrSize, bitMatrix, }: {
    x: number;
    y: number;
    pieceSize: number;
    qrSize: number;
    bitMatrix: BitMatrix;
}) => React.ReactElement | null;
export type LogoArea = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type LogoOptions = {
    hidePieces?: boolean;
    padding?: number;
    scale?: number;
    onChange?: (logoArea?: LogoArea) => void;
} & SVGImageProps;
//# sourceMappingURL=types.d.ts.map