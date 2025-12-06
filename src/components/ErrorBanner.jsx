import { AlertCircle, XCircle } from 'lucide-react';

const ErrorBanner = ({ message }) => (
    <div className="glass-panel glass-panel--error mb-6 sm:mb-8 flex items-start gap-3 sm:gap-4 animate-fade-in">
        <div className="relative">
            <div className="absolute inset-0 bg-red-500/30 rounded-full blur-lg"></div>
            <XCircle className="relative w-6 h-6 text-red-400 shrink-0" strokeWidth={2} />
        </div>
        <div className="flex-1">
            <p className="text-red-200 text-sm sm:text-base font-medium mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Error</p>
            <p className="text-red-300/80 text-sm font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>{message}</p>
        </div>
    </div>
);

export default ErrorBanner;
