import { useEffect, useState } from 'react';
import { Cloud } from 'lucide-react';
import ErrorBanner from './components/ErrorBanner';
import LoadingScreen from './components/LoadingScreen';
import PageHeader from './components/PageHeader';
import QuickCities from './components/QuickCities';
import RecentSearches from './components/RecentSearches';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

// Load API base URL from Vite environment variables.
// Set VITE_WEATHER_API_URL in a local .env file (this file should be gitignored).
const API_BASE = import.meta.env.VITE_WEATHER_API_URL;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const stored = window.sessionStorage?.getItem('recentSearches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (e) {
        // Ignore malformed cached data
      }
    }

    const initializeApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setInitialLoading(false);
    };

    initializeApp();
  }, []);

  const saveSearch = (searchCity) => {
    const updated = [searchCity, ...recentSearches.filter((s) => s !== searchCity)].slice(0, 5);
    setRecentSearches(updated);
    try {
      window.sessionStorage?.setItem('recentSearches', JSON.stringify(updated));
    } catch (e) {
      // Ignore storage errors (private mode, etc.)
    }
  };

  const fetchWeather = async (targetCity) => {
    if (!targetCity) return;

    setLoading(true);
    setWeather(null);
    setError('');

    try {
      if (!API_BASE) throw new Error('API url not configured. Set VITE_WEATHER_API_URL in your .env');

      const encodedCity = encodeURIComponent(targetCity);
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
      const normalizedWeather = {
        city: data.city || targetCity,
        temperature: data.temperature,
        description: data.description,
        humidity: data.humidity,
        wind: data.wind_speed,
      };

      setWeather(normalizedWeather);
      saveSearch(normalizedWeather.city);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const trimmed = city.trim();
    if (!trimmed) {
      setError('Please enter a city name.');
      return;
    }
    fetchWeather(trimmed);
  };

  const handleQuickSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  const goHome = () => {
    setCity('');
    setWeather(null);
    setError('');
    setLoading(false);
  };

  if (initialLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-950 to-black flex flex-col p-3 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-600 opacity-[0.04] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-amber-600 opacity-[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-yellow-700 opacity-[0.025] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-amber-700 opacity-[0.04] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s', animationDuration: '9s' }}></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="fixed inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #fbbf24 1px, transparent 1px), linear-gradient(0deg, #fbbf24 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      ></div>

      <div className="w-full max-w-2xl mx-auto relative z-10 flex flex-col h-screen sm:h-auto space-y-4 sm:space-y-6">
        <PageHeader onReset={goHome} />

        <div className="space-y-5 sm:space-y-6 flex-1 flex flex-col">
          <SearchBar city={city} onCityChange={setCity} onSearch={handleSearch} loading={loading} />

          {!weather && !loading && <QuickCities onSelect={handleQuickSearch} loading={loading} />}

          {recentSearches.length > 0 && !weather && (
            <RecentSearches searches={recentSearches} onSelect={handleQuickSearch} loading={loading} />
          )}

          {error && <ErrorBanner message={error} />}

          {weather && <WeatherCard weather={weather} />}

          {/* Empty State */}
          {!weather && !loading && !error && (
            <div className="glass-panel flex-1 flex flex-col items-center justify-center text-center mb-6 sm:mb-0 animate-fade-in">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl"></div>
                <Cloud className="relative w-16 h-16 sm:w-20 sm:h-20 text-yellow-500/60 drop-shadow-lg" strokeWidth={1.5} />
              </div>
              <p className="text-xl sm:text-3xl font-semibold text-yellow-50 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Discover the Weather</p>
              <p className="text-gray-400/80 text-sm sm:text-base font-normal max-w-md" style={{ fontFamily: "'Inter', sans-serif" }}>Enter a city name to access real-time weather data and forecasts</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center flex-1 flex items-center justify-center animate-fade-in">
              <div className="inline-flex items-center gap-4 bg-linear-to-r from-gray-950/60 to-black/60 rounded-2xl sm:rounded-3xl px-8 sm:px-10 py-5 sm:py-7 border border-yellow-500/30 backdrop-blur-2xl shadow-2xl shadow-yellow-900/20">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-yellow-500/30 border-t-yellow-400 animate-spin"></div>
                <p className="text-yellow-50 font-medium text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>Fetching weather data...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
