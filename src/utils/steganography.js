// steganography.js - Core LSB stego utilities
// Version: 1.0.3

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
    const data = new Uint8Array(imgData.data.buffer); // Slight speedup

    const msgLength = message.length;
    const binaryArray = new Array(msgLength * 8 + 8); // +8 for NULL terminator

    for (let i = 0, k = 0; i < msgLength; i++) {
      const bin = message.charCodeAt(i).toString(2).padStart(8, '0');
      for (let j = 0; j < 8; j++) {
        binaryArray[k++] = bin[j];
      }
    }

    // Append NULL terminator (8 zero bits)
    for (let j = 0; j < 8; j++) {
      binaryArray[binaryArray.length - 8 + j] = '0';
    }

    const len = binaryArray.length;
    for (let i = 0; i < len && i * 4 < data.length; i++) {
      data[i * 4] = (data[i * 4] & 0xFE) | parseInt(binaryArray[i]);
    }

    ctx.putImageData(imgData, 0, 0);
    const result = canvas.toDataURL('image/png');

    console.log(`😉 Embedding complete in ${Math.round(performance.now() - startTime)}ms`);
    callback(result);
  };

  img.onerror = () => console.error('❌ Failed to load image for embedding');
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

    const data = new Uint8Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
    const binary = [];

    const dataLen = data.length;
    for (let i = 0; i < dataLen; i += 4) {
      binary.push((data[i] & 1).toString());
    }

    const chars = [];
    const binaryStr = binary.join('');
    const binStrLen = binaryStr.length;

    for (let i = 0; i < binStrLen; i += 8) {
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
