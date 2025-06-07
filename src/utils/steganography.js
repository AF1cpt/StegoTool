/* =========================================================================
   StegoTool - steganography.js
   Description : Embeds / extracts text in PNG images via LSB technique
   Author       : AF1cpt
   Updated      : 2025-06-07
   ====================================================================== */


/**
 * Embed a text message inside an image using least-significant-bit (LSB).
 * @param {File}     image     – input image file (PNG recommended)
 * @param {string}   message   – text to hide
 * @param {Function} callback  – receives data-URL of modified PNG
 */
export function embedMessageInImage(image, message, callback) {
  const canvas = document.createElement('canvas');
  const ctx     = canvas.getContext('2d');
  const img     = new Image();

  img.onload = () => {
    canvas.width  = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data    = imgData.data;

    // convert message → binary and append sentinel
    const binaryMsg =
      message
        .split('')
        .map(ch => ch.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('') + NULL_BYTE;

    for (let i = 0; i < binaryMsg.length && i * 4 < data.length; i++) {
      data[i * 4] = (data[i * 4] & 0xfe) | parseInt(binaryMsg[i], 2);
    }

    ctx.putImageData(imgData, 0, 0);
    callback(canvas.toDataURL('image/png'));
  };

  img.src = URL.createObjectURL(image);
}

/**
 * Extract a hidden text message from an image produced by embedMessageInImage.
 * @param {File}     image     – PNG containing a hidden message
 * @param {Function} callback  – receives the extracted text
 */
export function extractMessageFromImage(image, callback) {
  const canvas = document.createElement('canvas');
  const ctx     = canvas.getContext('2d');
  const img     = new Image();

  img.onload = () => {
    canvas.width  = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const data      = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let   binaryStr = '';

    for (let i = 0; i < data.length; i += 4) {
      binaryStr += (data[i] & 1).toString();
    }

    const chars = [];
    for (let i = 0; i < binaryStr.length; i += 8) {
      const byte = binaryStr.slice(i, i + 8);
      if (byte === NULL_BYTE) {
        console.log('✅ End-of-message sentinel reached');
        break;
      }
      chars.push(String.fromCharCode(parseInt(byte, 2)));
    }

    callback(chars.join(''));
  };

  img.src = URL.createObjectURL(image);
}
