import { CloudSun, Loader2 } from 'lucide-react';

const LoadingScreen = () => (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-950 to-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-600 opacity-[0.04] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute top-1/4 right-0 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-amber-600 opacity-[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-yellow-700 opacity-[0.025] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
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

        <div className="relative z-10 text-center px-4">
            {/* Logo */}
            <div className="flex items-center justify-center gap-4 sm:gap-5 mb-8">
                <div className="h-0.5 w-12 sm:w-20 bg-linear-to-r from-transparent via-yellow-500/40 to-amber-500/60 rounded-full"></div>
                <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-br from-yellow-500 to-amber-600 rounded-2xl blur-2xl opacity-40 animate-pulse" style={{ animationDuration: '6s' }}></div>
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-yellow-500 via-amber-500 to-yellow-600 flex items-center justify-center shadow-2xl shadow-yellow-500/50 border border-white/10">
                        <CloudSun className="w-8 h-8 sm:w-10 sm:h-10 text-black drop-shadow-lg animate-pulse" strokeWidth={1.5} style={{ animationDuration: '6s' }} />
                    </div>
                </div>
                <div className="h-0.5 w-12 sm:w-20 bg-linear-to-l from-transparent via-amber-500/40 to-yellow-500/60 rounded-full"></div>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-200 via-amber-200 to-yellow-300 tracking-tight mb-4 animate-pulse" style={{ fontFamily: "'Inter', sans-serif", animationDuration: '6s' }}>
                Weather Data
            </h1>

            <div className="flex items-center gap-3 mb-10 flex-wrap justify-center">
                <div className="h-px w-10 sm:w-16 bg-linear-to-r from-yellow-500/30 to-transparent rounded-full"></div>
                <p className="text-xs sm:text-sm text-gray-400/70 font-light tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Initializing</p>
                <div className="h-px w-10 sm:w-16 bg-linear-to-l from-yellow-500/30 to-transparent rounded-full"></div>
            </div>

            {/* Loading Animation */}
            <div className="relative mb-8">
                <div className="flex items-center justify-center gap-3 mb-5">
                    <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" strokeWidth={2} />
                </div>
                <p className="text-gray-300/80 font-normal text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>Connecting to Weather API...</p>
            </div>

            {/* Progress Bar */}
            <div className="w-64 sm:w-80 mx-auto bg-gray-900/50 rounded-full h-2 mb-6 overflow-hidden border border-yellow-500/20">
                <div className="bg-linear-to-r from-yellow-500 via-amber-500 to-yellow-600 h-2 rounded-full progress-animate shadow-lg shadow-yellow-500/50"></div>
            </div>

            <p className="text-gray-500/50 text-xs font-light" style={{ fontFamily: "'Inter', sans-serif" }}>Real-time Weather Intelligence</p>
        </div>
    </div>
);

export default LoadingScreen;
