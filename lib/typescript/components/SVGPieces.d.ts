import React from 'react';
import type { BitMatrix, PieceOptions, BorderRadius, RenderCustomPieceItem, AllEyesOptions, LogoArea } from '../types';
export declare const DEFAULT_PIECE_SIZE = 5;
interface SVGPiecesProps extends PieceOptions {
    bitMatrix: BitMatrix;
    pieceLiquidRadius?: number;
    pieceBorderRadius?: BorderRadius;
    outerEyesOptions?: AllEyesOptions;
    innerEyesOptions?: AllEyesOptions;
    isPiecesGlued?: boolean;
    renderCustomPieceItem?: RenderCustomPieceItem;
    logoArea?: LogoArea;
}
export default function SVGPieces({ bitMatrix, pieceLiquidRadius, pieceBorderRadius, pieceSize, pieceCornerType, pieceScale, pieceRotation, pieceStroke, pieceStrokeWidth, outerEyesOptions, innerEyesOptions, isPiecesGlued, renderCustomPieceItem, logoArea, }: SVGPiecesProps): React.JSX.Element | null;
export {};
//# sourceMappingURL=SVGPieces.d.ts.map