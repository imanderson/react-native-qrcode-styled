import QRC from 'qrcode';
import { transformBitArrayToMatrix } from '../helpers';
export function createQRCode(message, options) {
  const QRCodeData = QRC.create(message, options);
  const {
    size = 0,
    data = []
  } = QRCodeData?.modules || {};
  const bitArray = Array.from(data).map(bit => bit ? 1 : 0);
  const bitMatrix = transformBitArrayToMatrix(bitArray, size);
  return {
    size,
    bitMatrix
  };
}
//# sourceMappingURL=qrcode.js.map