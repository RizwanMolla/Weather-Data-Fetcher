import { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, Search, MapPin, Gauge, AlertCircle, Loader } from 'lucide-react';

// Load API base URL from Vite environment variables.
// Set VITE_WEATHER_API_URL in a local .env file (this file should be gitignored).
const API_BASE = import.meta.env.VITE_WEATHER_API_URL;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load recent searches from memory
    const stored = window.sessionStorage?.getItem('recentSearches');
    if (stored) try {
      setRecentSearches(JSON.parse(stored));
    } catch (e) { }
  }, []);

  const saveSearch = (searchCity) => {
    const updated = [searchCity, ...recentSearches.filter(s => s !== searchCity)].slice(0, 5);
    setRecentSearches(updated);
    try {
      window.sessionStorage?.setItem('recentSearches', JSON.stringify(updated));
    } catch (e) { }
  };

  const getWeatherIcon = (description) => {
    const desc = description?.toLowerCase() || '';
    if (desc.includes('clear') || desc.includes('sunny')) {
      return <Sun className="w-20 h-20 sm:w-24 sm:h-24 text-yellow-400" strokeWidth={1.5} />;
    }
    if (desc.includes('cloud')) {
      return <Cloud className="w-20 h-20 sm:w-24 sm:h-24 text-gray-300" strokeWidth={1.5} />;
    }
    if (desc.includes('rain')) {
      return <CloudRain className="w-20 h-20 sm:w-24 sm:h-24 text-blue-400" strokeWidth={1.5} />;
    }
    if (desc.includes('snow')) {
      return <CloudSnow className="w-20 h-20 sm:w-24 sm:h-24 text-blue-200" strokeWidth={1.5} />;
    }
    if (desc.includes('storm') || desc.includes('thunder')) {
      return <CloudRain className="w-20 h-20 sm:w-24 sm:h-24 text-purple-400" strokeWidth={1.5} />;
    }
    return <Cloud className="w-20 h-20 sm:w-24 sm:h-24 text-gray-400" strokeWidth={1.5} />;
  };

  const handleSearch = async (e) => {
    if (e && e.key && e.key !== 'Enter') return;
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);
    setError('');

    try {
      const encodedCity = encodeURIComponent(city.trim());
      if (!API_BASE) throw new Error('API url not configured. Set VITE_WEATHER_API_URL in your .env');
      const response = await fetch(`${API_BASE}?city=${encodedCity}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('City not found. Please try another location.');
      }

      const data = await response.json();
      setWeather({
        city: data.city || city,
        temperature: data.temperature,
        description: data.description,
        humidity: data.humidity,
        wind: data.wind_speed,
      });

      // Save to recent searches
      saveSearch(data.city || city);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSearch = async (cityName) => {
    setCity(cityName);
    setLoading(true);
    setWeather(null);
    setError('');

    try {
      const encodedCity = encodeURIComponent(cityName);
      if (!API_BASE) throw new Error('API url not configured. Set VITE_WEATHER_API_URL in your .env');
      const response = await fetch(`${API_BASE}?city=${encodedCity}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('City not found. Please try another location.');
      }

      const data = await response.json();
      setWeather({
        city: data.city || cityName,
        temperature: data.temperature,
        description: data.description,
        humidity: data.humidity,
        wind: data.wind_speed,
      });

      // Save to recent searches
      saveSearch(data.city || cityName);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset app to default (home) state
  const goHome = () => {
    setCity('');
    setWeather(null);
    setError('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col p-3 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-600 opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-700 opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-linear-to-b from-gray-950 via-black to-gray-950 opacity-80"></div>
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(90deg, #fbbf24 1px transparent 1px), linear-gradient(0deg, #fbbf24 1px transparent 1px)',
        backgroundSize: '80px 80px'
      }}></div>

      <div className="w-full max-w-2xl mx-auto relative z-10 flex flex-col h-screen sm:h-auto">
        {/* Header (clickable - acts as Home) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => goHome()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goHome(); } }}
          className="text-center mb-6 sm:mb-10 md:mb-16 pt-4 sm:pt-6 md:pt-8 cursor-pointer select-none"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-linear-to-r from-transparent to-yellow-500/60"></div>
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-2xl shadow-yellow-500/40 border border-yellow-300/30">
              <Sun className="w-5 h-5 sm:w-8 sm:h-8 text-black" strokeWidth={1} />
            </div>
            <div className="h-px w-8 sm:w-12 bg-linear-to-l from-transparent to-yellow-500/60"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-200 via-yellow-300 to-yellow-400 tracking-tight mb-2 sm:mb-3">
            WEATHER DATA
          </h1>
          <div className="flex items-center gap-2 mb-2 sm:mb-4 flex-wrap justify-center">
            <div className="h-px w-10 sm:w-16 bg-linear-to-r from-yellow-500/40 to-yellow-500/20"></div>
            <p className="text-xs sm:text-sm text-gray-400 font-light tracking-widest uppercase">using API Gateway and Lambda</p>
            <div className="h-px w-10 sm:w-16 bg-linear-to-l from-yellow-500/40 to-yellow-500/20"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-10 relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-yellow-500/30 to-yellow-600/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 sm:gap-4 sm:p-2 bg-linear-to-r from-gray-900/80 via-gray-950/80 to-black/80 rounded-xl sm:rounded-2xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all backdrop-blur-xl">
            <MapPin className="w-5 h-5 text-yellow-500/60 sm:ml-4 shrink-0" strokeWidth={1.5} />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Enter city name..."
              disabled={loading}
              className="flex-1 px-2 py-3 sm:py-4 bg-transparent text-white placeholder-gray-600 focus:outline-none text-base sm:text-lg font-light w-full"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 text-sm sm:text-base"
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" strokeWidth={2} />}
              <span className="hidden sm:inline">SEARCH</span>
            </button>
          </div>
        </div>

        {/* Quick City Options */}
        {!weather && !loading && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-linear-to-r from-yellow-500/40 to-transparent"></div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-light">Popular Cities</p>
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-yellow-500/20 to-transparent"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Mumbai', 'Berlin'].map((cityName) => (
                <button
                  key={cityName}
                  onClick={() => handleQuickSearch(cityName)}
                  disabled={loading}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-yellow-500/10 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>
                  <div className="relative px-3 py-2.5 sm:px-4 sm:py-3 bg-linear-to-br from-gray-800/40 to-gray-900/40 hover:from-gray-700/50 hover:to-gray-800/50 border border-yellow-500/20 hover:border-yellow-500/40 rounded-lg transition-all backdrop-blur-sm text-center">
                    <p className="text-sm font-light text-gray-300 group-hover:text-yellow-100 transition-colors">{cityName}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && !weather && (
          <div className="mb-6 sm:mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Recent</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map(search => (
                <button
                  key={search}
                  onClick={() => handleQuickSearch(search)}
                  disabled={loading}
                  className="px-3 sm:px-4 py-2 text-sm bg-gray-800/50 hover:bg-gray-700/50 border border-yellow-500/20 rounded-lg text-gray-300 transition-all disabled:opacity-50"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-red-950/30 border border-red-500/30 rounded-xl sm:rounded-2xl backdrop-blur-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm sm:text-base font-light">{error}</p>
          </div>
        )}

        {/* Weather Card */}
        {weather && (
          <div className="relative group flex-1 flex flex-col mb-6 sm:mb-0">
            <div className="absolute -inset-1 bg-linear-to-br from-yellow-500/20 to-yellow-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>

            <div className="relative bg-linear-to-br from-gray-900/60 via-gray-950/60 to-black/80 rounded-2xl p-5 sm:p-6 shadow-2xl border border-yellow-500/30 hover:border-yellow-500/50 transition-all backdrop-blur-xl overflow-hidden flex-1 flex flex-col">
              <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-yellow-600/5 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-36 h-36 sm:w-48 sm:h-48 bg-yellow-700/5 rounded-full blur-3xl -z-10"></div>

              {/* Location & Icon */}
              <div className="text-center mb-5 sm:mb-6">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="transform scale-75 sm:scale-90">
                    {getWeatherIcon(weather.description)}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500/60 shrink-0" strokeWidth={1.5} />
                  <h2 className="text-2xl sm:text-3xl font-black text-white wrap-break-word">{weather.city}</h2>
                </div>
                <p className="text-sm sm:text-base text-yellow-300/80 font-light tracking-wide capitalize">{weather.description}</p>
              </div>

              {/* Temperature Display */}
              <div className="relative mb-5 sm:mb-6 group/temp">
                <div className="absolute inset-0 bg-linear-to-br from-yellow-500/5 to-yellow-600/5 rounded-xl sm:rounded-2xl opacity-0 group-hover/temp:opacity-100 transition-all duration-300 blur"></div>
                <div className="relative bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-yellow-500/20 backdrop-blur-sm">
                  <p className="text-yellow-500/70 text-xs font-light tracking-widest uppercase mb-2 text-center">Current Temperature</p>
                  <p className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-yellow-500 text-center">
                    {weather.temperature}°
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
                {/* Humidity */}
                <div className="group/card relative">
                  <div className="absolute inset-0 bg-linear-to-br from-yellow-500/15 to-yellow-600/5 rounded-xl opacity-0 group-hover/card:opacity-100 transition-all duration-300 blur"></div>
                  <div className="relative bg-linear-to-br from-gray-800/40 to-gray-900/40 rounded-xl p-3 sm:p-4 border border-yellow-500/20 hover:border-yellow-500/40 transition-all backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-4 h-4 text-yellow-400/70 shrink-0" strokeWidth={1.5} />
                      <p className="text-yellow-500/70 text-xs font-light tracking-wider uppercase">Humidity</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-white">{weather.humidity}<span className="text-lg sm:text-xl">%</span></p>
                  </div>
                </div>

                {/* Wind Speed */}
                <div className="group/card relative">
                  <div className="absolute inset-0 bg-linear-to-br from-yellow-500/15 to-yellow-600/5 rounded-xl opacity-0 group-hover/card:opacity-100 transition-all duration-300 blur"></div>
                  <div className="relative bg-linear-to-br from-gray-800/40 to-gray-900/40 rounded-xl p-3 sm:p-4 border border-yellow-500/20 hover:border-yellow-500/40 transition-all backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-4 h-4 text-yellow-400/70 shrink-0" strokeWidth={1.5} />
                      <p className="text-yellow-500/70 text-xs font-light tracking-wider uppercase">Wind Speed</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-white">{weather.wind}<span className="text-lg sm:text-xl ml-1">m/s</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!weather && !loading && !error && (
          <div className="relative group flex-1 flex flex-col mb-6 sm:mb-0">
            <div className="absolute -inset-1 bg-linear-to-r from-yellow-500/10 to-yellow-600/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
            <div className="relative text-center bg-linear-to-br from-gray-900/50 to-gray-950/50 rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-16 border border-yellow-500/20 backdrop-blur-xl flex flex-col items-center justify-center flex-1">
              <div className="flex justify-center mb-4 sm:mb-6">
                <Cloud className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500/40" strokeWidth={1} />
              </div>
              <p className="text-lg sm:text-2xl font-light text-gray-300 mb-2">Discover the Weather</p>
              <p className="text-gray-500 text-sm font-light">Enter a city name to access detailed weather analytics</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center flex-1 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 bg-linear-to-r from-gray-900/50 to-gray-950/50 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-4 sm:py-6 border border-yellow-500/20 backdrop-blur-xl">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-yellow-500/30 border-t-yellow-400 animate-spin"></div>
              <p className="text-gray-300 font-light text-sm sm:text-base">Fetching weather...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getActivitySuggestion(temp, humidity) {
  const tempNum = parseFloat(temp);
  if (tempNum > 30) return 'Stay hydrated! Perfect for outdoor adventures';
  if (tempNum > 20) return 'Great day for outdoor activities and exploration';
  if (tempNum > 10) return 'Ideal for indoor hobbies and relaxation';
  return 'Perfect for winter activities and sports';
}

export default App;