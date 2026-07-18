export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 shadow-sm">
              <span className="text-xl">☁️</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Weather App</p>
              <p className="text-base font-extrabold tracking-tight text-slate-900">Live City Forecast</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

