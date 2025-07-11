'use client';

import Header from './header';
import Footer from './footer';
import Image from 'next/image';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function Home() {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const streamers = [
    '/streamer1.jpg',
    '/streamer2.jpg',
    '/streamer3.jpg',
    '/streamer4.jpg',
    '/streamer5.jpg',
    '/streamer6.jpg',
  ];

  const trendingContent = [
    {
      id: 1,
      title: 'DJ Night Live',
      thumbnail: '/night.jpg',
    },
    {
      id: 2,
      title: 'Lo-Fi Chill Beats',
      thumbnail: '/chill.jpg',
    },
    {
      id: 3,
      title: 'Guitar Solo Session',
      thumbnail: '/guitar.jpg',
    },
    {
      id: 4,
      title: 'Pop Music Live',
      thumbnail: '/pop.jpg',
    },
  ];

  const openStory = (img: string) => {
    setSelectedStory(img);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0e0e0e] text-black dark:text-white flex flex-col">
      <Header />

      {/* Streamers Stories */}
      <section className="flex overflow-x-auto gap-4 px-4 py-6 border-b border-gray-300 dark:border-gray-700">
        {streamers.map((img, i) => (
          <button
            key={i}
            className="flex-shrink-0 flex flex-col items-center focus:outline-none"
            onClick={() => openStory(img)}
          >
            <Image
              src={img}
              alt={`Streamer ${i + 1}`}
              width={60}
              height={60}
              className="rounded-full border-2 border-pink-500"
            />
            <span className="text-xs mt-1">Streamer {i + 1}</span>
          </button>
        ))}
      </section>

      {/* Trending Content */}
      <main className="flex-1 p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingContent.map((content) => (
          <div key={content.id} className="bg-gray-100 dark:bg-[#1e1e1e] rounded-xl overflow-hidden shadow-md">
            <Image
              src={content.thumbnail}
              alt={content.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-base font-semibold">{content.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Trending now on Tunestream
              </p>
            </div>
          </div>
        ))}
      </main>

      <Footer />

      {/* Story Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl max-w-sm w-full">
            <Image
              src={selectedStory || ''}
              alt="Story"
              width={400}
              height={400}
              className="rounded-lg object-cover w-full h-80"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
