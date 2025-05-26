import { useState } from 'react';
import { extractMessageFromImage } from '../utils/steganography';

export default function ExtractMessage() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleExtract = async () => {
    if (!image) return;
    const result = await extractMessageFromImage(image);
    setMessage(result);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold text-primary">Extract Secret Message</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-primary file:text-white hover:file:opacity-90"
      />

      <button
        onClick={handleExtract}
        className="bg-accent text-white px-5 py-2 rounded-lg hover:opacity-90 transition font-medium"
      >
        Extract Message
      </button>

      {message && (
        <div className="p-3 mt-2 border border-gray-300 rounded-lg bg-light text-gray-700 text-sm whitespace-pre-wrap">
          {message}
        </div>
      )}
    </div>
  );
}
