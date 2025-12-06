import { TrendingUp } from 'lucide-react';

const QUICK_CITIES = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Mumbai', 'Berlin'];

const QuickCities = ({ onSelect, loading }) => (
    <div className="glass-panel mb-6 sm:mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-4 h-4 text-yellow-400/70" strokeWidth={2} />
            <p className="text-xs text-gray-400/70 uppercase tracking-[0.15em] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Popular Destinations</p>
            <div className="h-px flex-1 bg-linear-to-r from-yellow-500/30 via-transparent to-transparent rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {QUICK_CITIES.map((cityName) => (
                <button
                    key={cityName}
                    onClick={() => onSelect(cityName)}
                    disabled={loading}
                    className="group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-linear-to-r from-yellow-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl blur-sm"></div>
                    <div className="relative px-4 py-3 sm:px-5 sm:py-3.5 bg-linear-to-br from-gray-900/50 to-black/30 hover:from-gray-800/60 hover:to-black/40 border border-yellow-500/20 hover:border-yellow-400/30 rounded-xl transition-all backdrop-blur-xl text-center shadow-lg group-hover:shadow-yellow-500/10 group-hover:scale-105 transform duration-200">
                        <p className="text-sm font-medium text-gray-200/90 group-hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>{cityName}</p>
                    </div>
                </button>
            ))}
        </div>
    </div>
);

export default QuickCities;
