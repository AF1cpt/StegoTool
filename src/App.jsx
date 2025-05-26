import EmbedMessage from './components/EmbedMessage';
import ExtractMessage from './components/ExtractMessage';

function App() {
  return (
    <div className="min-h-screen bg-light font-sans flex justify-center items-center p-6">
      <div className="w-full max-w-7xl bg-white shadow-soft rounded-2xl p-8 animate-fade-in">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-primary tracking-tight flex items-center justify-center gap-3">
            <span role="img" aria-label="Spy">🕵️‍♂️</span> StegoTool
          </h1>
          <p className="text-gray-500 mt-2 text-lg max-w-2xl mx-auto">
            Securely hide and reveal messages in images — 100% client-side, open-source, and beautifully minimal.
          </p>
        </header>

        <div className="bg-light rounded-xl shadow-inner p-6">
          <main className="flex flex-col lg:flex-row justify-center items-start lg:items-stretch gap-8">
            <EmbedMessage />
            <ExtractMessage />
          </main>
        </div>

        <section className="mt-16 max-w-4xl mx-auto text-center bg-white rounded-xl shadow-soft p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">💡 What is Steganography?</h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Steganography is the practice of hiding secret messages within ordinary files such as images.
            This tool embeds text into the least significant bits of an image file, keeping your message hidden
            in plain sight without changing how the image looks.
          </p>
        </section>

        <section className="mt-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition duration-300">
            <h4 className="text-xl font-bold text-gray-800 mb-2">🔐 Secure</h4>
            <p className="text-gray-600 text-sm">
              Everything runs in your browser. Your data stays 100% private.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-lg transition duration-300">
            <h4 className="text-xl font-bold text-gray-800 mb-2">⚡ Fast</h4>
            <p className="text-gray-600 text-sm">
              Instant encoding and decoding. No server delays.
            </p>
          </div>
        </section>

        <footer className="mt-20 text-center text-sm text-gray-400">
          <p>
            Made with ❤️ using <span className="text-primary">React</span> + <span className="text-accent">Tailwind CSS</span>
          </p>
          <a href="https://github.com/AF1cpt" className="text-blue-500 hover:underline transition duration-200 ml-1">
            View on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;