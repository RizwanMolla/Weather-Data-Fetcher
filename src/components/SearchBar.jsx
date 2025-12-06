import { MapPin, Search, Loader, Sparkles } from 'lucide-react';

const SearchBar = ({ city, onCityChange, onSearch, loading }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSearch();
        }
    };

    return (
        <div className="mb-6 sm:mb-8 relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-yellow-500/20 via-amber-500/20 to-yellow-600/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 sm:gap-3 sm:p-3 bg-linear-to-r from-gray-950/60 via-black/40 to-gray-950/60 rounded-2xl sm:rounded-3xl border border-yellow-500/20 hover:border-yellow-400/30 transition-all backdrop-blur-2xl shadow-xl shadow-yellow-900/10">
                <div className="flex items-center gap-3 sm:ml-2">
                    <MapPin className="w-5 h-5 text-yellow-500/80 shrink-0" strokeWidth={2} />
                    <Sparkles className="w-4 h-4 text-amber-400/50 shrink-0 animate-pulse" strokeWidth={2} style={{ animationDuration: '5s' }} />
                </div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => onCityChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search any city worldwide..."
                    disabled={loading}
                    className="flex-1 px-2 py-3 sm:py-4 bg-transparent text-white placeholder-gray-500/60 focus:outline-none text-base sm:text-lg font-normal w-full"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                />
                <button
                    onClick={onSearch}
                    disabled={loading}
                    className="relative px-6 sm:px-8 py-3 sm:py-3.5 bg-linear-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:via-amber-400 hover:to-yellow-500 text-black font-semibold rounded-xl sm:rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 text-sm sm:text-base overflow-hidden group/btn"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" strokeWidth={2.5} />}
                    <span className="hidden sm:inline">Search</span>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
