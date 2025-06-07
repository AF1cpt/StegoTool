// steganography.js - Core LSB stego utilities
// Version: 1.0.2

/**
 * TODO: Add encryption to message before embedding.
 * TODO: Improve pixel selection randomness for better hiding.
 */

export function embedMessageInImage(image, message, callback) {
  if (!image || !message || typeof callback !== 'function') {
    console.error('❌ Invalid input provided to embedMessageInImage');
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  const startTime = performance.now();

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    let binaryMsg = message.split('').map(char =>
      char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join('') + '00000000'; // NULL terminator

    for (let i = 0; i < binaryMsg.length && i * 4 < data.length; i++) {
      data[i * 4] = (data[i * 4] & 0xFE) | parseInt(binaryMsg[i]);
    }

    ctx.putImageData(imgData, 0, 0);
    const result = canvas.toDataURL('image/png');

    console.log(`✅ Embedding complete in ${Math.round(performance.now() - startTime)}ms`);
    callback(result);
  };

  img.src = URL.createObjectURL(image);
}

export function extractMessageFromImage(image, callback) {
  if (!(image instanceof Blob) || typeof callback !== 'function') {
    console.error('❌ Invalid input provided to extractMessageFromImage');
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  const startTime = performance.now();

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let binaryStr = '';

    for (let i = 0; i < data.length; i += 4) {
      binaryStr += (data[i] & 1).toString();
    }

    const chars = [];
    for (let i = 0; i < binaryStr.length; i += 8) {
      const byte = binaryStr.slice(i, i + 8);
      if (byte === '00000000') break;
      chars.push(String.fromCharCode(parseInt(byte, 2)));
    }

    console.log(`✅ Extraction complete in ${Math.round(performance.now() - startTime)}ms`);
    callback(chars.join(''));
  };

  img.onerror = () => console.error('❌ Failed to load image for extraction');
  img.src = URL.createObjectURL(image);
}
