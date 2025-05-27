import { useState } from 'react';
import { embedMessageInImage } from '../utils/steganography';

export default function EmbedMessage() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState(null);

  const handleEmbed = () => {
    console.log('🔍 handleEmbed called', { image, message });
    if (!image || !message) {
      console.warn('⚠️ Missing image or message, cannot embed');
      return;
    }
    embedMessageInImage(image, message, (result) => {
      console.log('✅ embed callback result URL:', result);
      setOutput(result);
    });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold text-primary">Embed Secret Message</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          console.log('📁 file selected:', e.target.files[0]);
          setImage(e.target.files[0]);
        }}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-primary file:text-white hover:file:opacity-90"
      />

      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        rows={4}
        placeholder="Enter your secret message here..."
        value={message}
        onChange={(e) => {
          console.log('✏️ message changed:', e.target.value);
          setMessage(e.target.value);
        }}
      />

      <button
        onClick={handleEmbed}
        className="bg-accent text-white px-5 py-2 rounded-lg hover:opacity-90 transition font-medium"
      >
        Embed & Download
      </button>

      {output && (
        <a
          href={output}
          download="stego-image.png"
          onClick={() => console.log('⬇️ Download link clicked')}
          className="block text-sm text-blue-600 underline hover:text-blue-800 mt-2"
        >
          Download Embedded Image
        </a>
      )}
    </div>
  );
}
