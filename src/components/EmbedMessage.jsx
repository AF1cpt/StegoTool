import { useState } from 'react';
import { embedMessageInImage } from '../utils/steganography';


export default function EmbedMessage() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState(null);

  const handleEmbed = () => {
    if (image && message) {
      embedMessageInImage(image, message, setOutput);
    }
  };

  return (
    <section className="flex-1 bg-white rounded-3xl shadow-xl p-8 space-y-5" class="centered-page">
      <h2 className="text-2xl font-bold text-gray-800" class="center-box">🔐 Embed Secret Message</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800"
        class="center-box"
      />
      <textarea
        className="w-full h-28 p-4 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        placeholder="Type your secret message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleEmbed}
        className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        class="center-box"
      >
        Embed & Download
      </button>
      {output && (
        <a href={output} download="stego-image.png" className="inline-block mt-2 text-blue-600 hover:underline text-sm">
          📥 Download Image
        </a>
      )}
    </section>
  );
}