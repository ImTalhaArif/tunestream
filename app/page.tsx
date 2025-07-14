import Header from "./header";
import Footer from "./footer";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-[#0f011c] to-[#1a052e] text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 md:p-12">
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Tune in to the Beat of the Game</h1>
          <button className="mt-4 px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-lg font-semibold hover:scale-105 transition">Get Started</button>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl mb-6 text-pink-400">Categories</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {['MOBA', 'FPS', 'Pop', 'EDM'].map((category) => (
              <button key={category} className="bg-purple-900 hover:bg-purple-700 px-8 py-3 rounded-lg transition">{category}</button>
            ))}
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-tr from-[#1a052e] via-purple-800 to-[#0f011c] p-6 rounded-xl flex flex-col items-center">
            <img src="https://cdn.pixabay.com/photo/2020/04/27/13/47/man-5108736_960_720.png" alt="Gamer" className="w-32 h-32 rounded-full mb-4 border-4 border-pink-500" />
            <p className="text-xl font-bold">Ninja</p>
            <p className="text-sm text-gray-300">Streaming</p>
          </div>
          <div className="bg-gradient-to-tr from-[#1a052e] via-purple-800 to-[#0f011c] p-6 rounded-xl flex flex-col items-center">
            <div className="w-32 h-32 bg-purple-700 rounded-full mb-4 flex items-center justify-center">
              <svg className="w-16 h-16 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 10h2v4H3v-4zm3 0h2v4H6v-4zm3 0h2v4H9v-4zm3 0h2v4h-2v-4zm3 0h2v4h-2v-4zm3 0h2v4h-2v-4zm3 0h2v4h-2v-4z"/>
              </svg>
            </div>
            <p className="text-xl font-bold">Cool Vibes</p>
            <p className="text-sm text-gray-300">Artist: Alan Walker</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}