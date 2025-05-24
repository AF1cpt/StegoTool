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
    <section className="flex-1 bg-white rounded-3xl shadow-xl p-8 space-y-5" class="centered-page">
      <h2 className="text-2xl font-bold text-gray-800" class="center-box">🔎 Extract Secret Message </h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
        class="center-box"
      />
      <button
        onClick={handleExtract}
        className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        class="center-box"
      >
        Extract
      </button>
      {message && (
        <div className="p-4 mt-4 rounded-lg bg-gray-50 text-gray-700 border border-gray-200 text-sm whitespace-pre-wrap" class="center-box">
          {message}
        </div>
      )}
    </section>
  );
}

