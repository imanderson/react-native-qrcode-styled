import React from 'react';
import type { GradientOrigin, LinearGradientProps } from '../types';
interface SVGLinearGradientProps extends LinearGradientProps {
    id: string;
    size: number;
    origin?: GradientOrigin;
}
export default function SVGLinearGradient({ id, size, origin, start, end, colors, locations, }: SVGLinearGradientProps): React.JSX.Element;
export {};
//# sourceMappingURL=SVGLinearGradient.d.ts.map