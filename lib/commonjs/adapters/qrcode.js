"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createQRCode = createQRCode;
var _qrcode = _interopRequireDefault(require("qrcode"));
var _helpers = require("../helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function createQRCode(message, options) {
  const QRCodeData = _qrcode.default.create(message, options);
  const {
    size = 0,
    data = []
  } = QRCodeData?.modules || {};
  const bitArray = Array.from(data).map(bit => bit ? 1 : 0);
  const bitMatrix = (0, _helpers.transformBitArrayToMatrix)(bitArray, size);
  return {
    size,
    bitMatrix
  };
}
//# sourceMappingURL=qrcode.js.map