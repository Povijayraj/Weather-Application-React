// src/App.jsx

import { useMemo, useState } from 'react';

import Navbar from './components/Navbar';
import Weather from './components/weather';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('');

  const trimmedCity = useMemo(() => searchQuery.trim(), [searchQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!trimmedCity) return;
    setCity(trimmedCity);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-50">
      <Navbar />

      <header className="py-10">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Weather Report
          </h1>
          <p className="mt-2 text-slate-600">
            Search real-time weather by city name.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16">
        <section className="bg-white/70 backdrop-blur border border-white/50 rounded-2xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="city">
                City
              </label>
              <input
                id="city"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., London"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200"

              />
            </div>

            <button
              type="submit"
              className="md:shrink-0 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            >
              Search
            </button>
          </form>

          {city ? (
            <div className="mt-6">
              <Weather city={city} />
            </div>
          ) : (
            <div className="mt-8 text-slate-500 text-sm md:text-base">
              Type a city name and press <span className="font-semibold">Search</span>.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

