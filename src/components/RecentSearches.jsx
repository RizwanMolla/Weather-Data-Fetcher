import { Clock } from 'lucide-react';

const RecentSearches = ({ searches, onSelect, loading }) => (
    <div className="glass-panel mb-6 sm:mb-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-yellow-400/70" strokeWidth={2} />
            <p className="text-xs text-gray-400/70 uppercase tracking-[0.15em] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Recent Searches</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
            {searches.map((search) => (
                <button
                    key={search}
                    onClick={() => onSelect(search)}
                    disabled={loading}
                    className="px-4 sm:px-5 py-2.5 text-sm bg-linear-to-br from-gray-900/60 to-black/40 hover:from-gray-800/70 hover:to-black/50 border border-yellow-500/20 hover:border-yellow-400/30 rounded-xl text-gray-200/90 hover:text-white transition-all disabled:opacity-50 backdrop-blur-xl shadow-lg hover:shadow-yellow-500/10 hover:scale-105 transform duration-200 font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {search}
                </button>
            ))}
        </div>
    </div>
);

export default RecentSearches;
