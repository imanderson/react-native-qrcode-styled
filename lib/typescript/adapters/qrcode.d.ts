import QRC, { QRCodeOptions } from 'qrcode';
import type { BitMatrix } from '../types';
export type { QRCodeOptions, QRCodeErrorCorrectionLevel } from 'qrcode';
export type QRCodeMessage = string | QRC.QRCodeSegment[];
export declare function createQRCode(message: QRCodeMessage, options: QRCodeOptions): {
    size: number;
    bitMatrix: BitMatrix;
};
//# sourceMappingURL=qrcode.d.ts.map