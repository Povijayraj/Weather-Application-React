// src/components/weather.jsx

import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';


function pickConditionEmoji(description = '') {
  const d = description.toLowerCase();
  if (d.includes('clear')) return '☀️';
  if (d.includes('cloud')) return '☁️';
  if (d.includes('rain')) return '🌧️';
  if (d.includes('drizzle')) return '🌦️';
  if (d.includes('thunder')) return '⛈️';
  if (d.includes('snow')) return '❄️';
  return '🌡️';
}

export default function Weather({ city }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const query = useMemo(() => city?.trim(), [city]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!query) return;

      if (!apiKey) {
        setError('Missing API key. Set VITE_OPENWEATHER_API_KEY in a .env file.');
        setData(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`
        );

        if (!cancelled) {
          setData(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err?.response?.data?.message || err?.message || 'Failed to fetch weather data.';
          setError(message);
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [apiKey, query]);

  if (!query) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 md:p-6 shadow-sm">
          {loading ? (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">Loading...</h2>
              <p className="mt-2 text-slate-600">Getting the latest weather for {query}.</p>
            </div>
          ) : error ? (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-red-700">Couldn’t get weather</h2>
              <p className="mt-2 text-slate-700">{error}</p>
            </div>
          ) : data ? (
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                    Weather in {data.name}
                  </h2>
                  <p className="mt-1 text-slate-600">
                    {new Date(data.dt * 1000).toLocaleString()}
                  </p>
                </div>

                <div className="text-4xl md:text-5xl">
                  {pickConditionEmoji(data.weather?.[0]?.description)}
                </div>
              </div>

              <div className="mt-5 flex items-end gap-3">
                <div className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                  {Math.round(data.main?.temp)}°C
                </div>
                <div className="pb-1">
                  <div className="text-sm md:text-base font-semibold text-slate-700">
                    {data.weather?.[0]?.description}
                  </div>
                  <div className="text-xs md:text-sm text-slate-500 mt-1">
                    Feels like {Math.round(data.main?.feels_like)}°C
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                  <div className="text-xs text-slate-500">Humidity</div>
                  <div className="mt-1 font-bold text-slate-900">{data.main?.humidity}%</div>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                  <div className="text-xs text-slate-500">Wind</div>
                  <div className="mt-1 font-bold text-slate-900">{data.wind?.speed} m/s</div>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                  <div className="text-xs text-slate-500">Max</div>
                  <div className="mt-1 font-bold text-slate-900">{Math.round(data.main?.temp_max)}°C</div>
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                  <div className="text-xs text-slate-500">Min</div>
                  <div className="mt-1 font-bold text-slate-900">{Math.round(data.main?.temp_min)}°C</div>
                </div>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 md:p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Summary</h3>
          <div className="mt-3 space-y-2 text-slate-700 text-sm">
            <div className="flex items-center justify-between">
              <span>Location</span>
              <span className="font-semibold">{data?.name || '-'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Temperature</span>
              <span className="font-semibold">{data ? `${Math.round(data.main?.temp)}°C` : '-'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Description</span>
              <span className="font-semibold capitalize">
                {data?.weather?.[0]?.description || '-'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Humidity</span>
              <span className="font-semibold">{data ? `${data.main?.humidity}%` : '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

