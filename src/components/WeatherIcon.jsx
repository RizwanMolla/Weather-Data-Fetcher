import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle, CloudLightning } from 'lucide-react';

const WeatherIcon = ({ description }) => {
    const desc = description?.toLowerCase() || '';

    if (desc.includes('clear') || desc.includes('sunny')) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s' }}></div>
                <Sun className="relative w-24 h-24 sm:w-28 sm:h-28 text-yellow-400 drop-shadow-2xl" strokeWidth={1.5} />
            </div>
        );
    }

    if (desc.includes('cloud')) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-2xl"></div>
                <Cloud className="relative w-24 h-24 sm:w-28 sm:h-28 text-gray-300 drop-shadow-2xl" strokeWidth={1.5} />
            </div>
        );
    }

    if (desc.includes('drizzle')) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl"></div>
                <CloudDrizzle className="relative w-24 h-24 sm:w-28 sm:h-28 text-amber-300 drop-shadow-2xl" strokeWidth={1.5} />
            </div>
        );
    }

    if (desc.includes('rain')) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-amber-500/25 rounded-full blur-2xl"></div>
                <CloudRain className="relative w-24 h-24 sm:w-28 sm:h-28 text-amber-400 drop-shadow-2xl" strokeWidth={1.5} />
            </div>
        );
    }

    if (desc.includes('snow')) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-gray-300/20 rounded-full blur-2xl"></div>
                <CloudSnow className="relative w-24 h-24 sm:w-28 sm:h-28 text-gray-200 drop-shadow-2xl" strokeWidth={1.5} />
            </div>
        );
    }

    if (desc.includes('storm') || desc.includes('thunder')) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-600/30 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <CloudLightning className="relative w-24 h-24 sm:w-28 sm:h-28 text-yellow-500 drop-shadow-2xl" strokeWidth={1.5} />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gray-400/20 rounded-full blur-2xl"></div>
            <Cloud className="relative w-24 h-24 sm:w-28 sm:h-28 text-gray-400 drop-shadow-2xl" strokeWidth={1.5} />
        </div>
    );
};

export default WeatherIcon;
