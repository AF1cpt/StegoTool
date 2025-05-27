import { useState } from 'react';
import { extractMessageFromImage } from '../utils/steganography';

export default function ExtractMessage() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleExtract = () => {
    if (image) {
      extractMessageFromImage(image, setMessage);
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl w-full max-w-md mx-auto space-y-4 mt-8">
      <h2 className="text-xl font-semibold text-gray-800">Extract Secret Message</h2>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full" />
      <button
        onClick={handleExtract}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80 transition"
      >
        Extract
      </button>

      {message && <p className="text-gray-700 mt-4 whitespace-pre-wrap">{message}</p>}
    </div>
  );
}
