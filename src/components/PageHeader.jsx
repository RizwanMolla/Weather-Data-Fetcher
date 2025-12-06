import { CloudSun } from 'lucide-react';

const PageHeader = ({ onReset }) => (
    <div
        role="button"
        tabIndex={0}
        onClick={onReset}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onReset();
            }
        }}
        className="text-center mb-6 sm:mb-10 md:mb-12 pt-4 sm:pt-6 md:pt-8 cursor-pointer select-none group transition-all duration-300"
    >
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-7">
            <div className="h-0.5 w-12 sm:w-20 bg-linear-to-r from-transparent via-yellow-500/40 to-amber-500/60 rounded-full"></div>
            <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-yellow-500 to-amber-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-yellow-500 via-amber-500 to-yellow-600 flex items-center justify-center shadow-2xl shadow-yellow-500/50 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <CloudSun className="w-6 h-6 sm:w-9 sm:h-9 text-black drop-shadow-lg" strokeWidth={1.5} />
                </div>
            </div>
            <div className="h-0.5 w-12 sm:w-20 bg-linear-to-l from-transparent via-amber-500/40 to-yellow-500/60 rounded-full"></div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-200 via-amber-200 to-yellow-300 tracking-tight mb-3 sm:mb-4 drop-shadow-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
            Weather Data
        </h1>
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap justify-center">
            <div className="h-px w-8 sm:w-12 bg-linear-to-r from-yellow-500/30 to-transparent rounded-full"></div>
            <p className="text-xs sm:text-sm text-gray-400/70 font-light tracking-[0.2em] uppercase">Using API Gateway and Lambda</p>
            <div className="h-px w-8 sm:w-12 bg-linear-to-l from-yellow-500/30 to-transparent rounded-full"></div>
        </div>
    </div>
);

export default PageHeader;
