"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useQRCodeData;
var _react = require("react");
var _qrcode = require("../adapters/qrcode");
var _helpers = require("../helpers");
function useQRCodeData(data, options) {
  const QRCodeData = (0, _react.useMemo)(() => {
    try {
      return (0, _qrcode.createQRCode)(data, options);
    } catch (error) {
      (0, _helpers.consoleError)(error);
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