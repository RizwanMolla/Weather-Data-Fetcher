import { MapPin, Droplets, Wind, Thermometer } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import DetailStat from './DetailStat';

const WeatherCard = ({ weather }) => {
    if (!weather) return null;

    const { city, description, temperature, humidity, wind } = weather;

    return (
        <div className="relative group flex-1 flex flex-col animate-scale-in">
            <div className="absolute -inset-px bg-linear-to-br from-yellow-500/15 via-amber-500/15 to-yellow-600/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg"></div>

            <div className="relative bg-linear-to-br from-gray-950/70 via-black/50 to-gray-950/70 rounded-3xl p-6 sm:p-8 shadow-xl border border-yellow-500/20 hover:border-yellow-400/30 transition-all backdrop-blur-2xl overflow-hidden flex-1 flex flex-col">
                <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-600/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 bg-amber-600/5 rounded-full blur-3xl"></div>

                <div className="text-center mb-6 sm:mb-8 relative z-10">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="transform scale-90 sm:scale-100 relative">
                            <WeatherIcon description={description} />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400/80 shrink-0" strokeWidth={2} />
                        <h2 className="text-3xl sm:text-4xl font-bold text-white wrap-break-word" style={{ fontFamily: "'Inter', sans-serif" }}>{city}</h2>
                    </div>
                    <p className="text-sm sm:text-base text-gray-300/70 font-normal tracking-wide capitalize" style={{ fontFamily: "'Inter', sans-serif" }}>{description}</p>
                </div>

                <div className="relative mb-6 sm:mb-8">
                    <div className="absolute -inset-1 bg-linear-to-br from-yellow-500/10 via-amber-500/10 to-yellow-600/10 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-lg"></div>
                    <div className="relative bg-linear-to-br from-gray-900/60 to-black/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-yellow-500/20 backdrop-blur-xl shadow-inner">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Thermometer className="w-5 h-5 text-yellow-400/70" strokeWidth={2} />
                            <p className="text-gray-400/70 text-xs font-medium tracking-widest uppercase">Temperature</p>
                        </div>
                        <p className="text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-br from-yellow-200 via-amber-200 to-yellow-300 text-center drop-shadow-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {temperature}°
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-5 relative z-10">
                    <DetailStat icon={Droplets} label="Humidity" value={humidity} unit="%" />
                    <DetailStat icon={Wind} label="Wind Speed" value={wind} unit="m/s" />
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
