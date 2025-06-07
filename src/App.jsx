import EmbedMessage from './components/EmbedMessage';
import ExtractMessage from './components/ExtractMessage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-100 p-8 font-sans flex justify-center items-center">
      <div className="w-full max-w-7xl animate-fade-in">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center gap-3 underline underline-offset-4">
            <span role="img" aria-label="Spy">🕵️‍♂️</span> StegoTool
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Securely hide and reveal messages in images — 100% client-side
          </p>
        </header>
        <h1 className="text-3xl font-bold underline text-blue-500">
            StegoTool Frontend Branch 🚀
        </h1>
        <div className="bg-white shadow-lg rounded-3xl p-6">
          <main className="flex flex-col lg:flex-row justify-center items-stretch gap-8">
            <EmbedMessage />
            <ExtractMessage />
          </main>
        </div>
        <section className="mt-16 max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-inner p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">💡 What is Steganography?</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Steganography is the practice of hiding secret messages within ordinary files such as images. This tool embeds text into the least significant bits of an image file, which makes the message invisible to the naked eye.
          </p>
        </section>

        <section className="mt-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-bold text-gray-800 mb-2">🔐 Secure</h4>
            <p className="text-gray-600 text-sm">All operations are done on your device. Your data never leaves your browser.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-bold text-gray-800 mb-2">⚡ Fast</h4>
            <p className="text-gray-600 text-sm">Instant embedding and extraction with zero loading or server delays.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-bold text-gray-800 mb-2">🎨 Beautiful UI</h4>
            <p className="text-gray-600 text-sm">Sleek design with Apple-inspired UI, responsive on all devices.</p>
          </div>
        </section>

        <footer className="mt-20 text-center text-sm text-gray-400">
          <p>Made with ❤️ using React + Tailwind CSS</p>
          <a href="https://github.com/AF1cpt/StegoTool" className="text-blue-500 hover:underline">GitHub</a>
        </footer>
      </div>
    </div>
  );
}

export default App;