import { useMemo } from 'react';
import { createQRCode } from '../adapters/qrcode';
import { consoleError } from '../helpers';
export default function useQRCodeData(data, options) {
  const QRCodeData = useMemo(() => {
    try {
      return createQRCode(data, options);
    } catch (error) {
      consoleError(error);
      return;
    }
  }, [data, options]);
  const {
    size: qrCodeSize = 0,
    bitMatrix = []
  } = QRCodeData || {};
  return {
    bitMatrix,
    qrCodeSize
  };
}
//# sourceMappingURL=useQRCodeData.js.map