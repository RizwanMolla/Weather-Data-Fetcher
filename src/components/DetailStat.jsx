const DetailStat = ({ icon: Icon, label, value, unit }) => (
    <div className="group relative">
        <div className="absolute -inset-1 bg-linear-to-br from-yellow-500/10 via-amber-500/8 to-yellow-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md"></div>
        <div className="relative bg-linear-to-br from-gray-900/50 to-black/30 rounded-2xl p-4 sm:p-5 border border-yellow-500/20 hover:border-yellow-400/30 transition-all backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5 text-yellow-400/80 shrink-0" strokeWidth={2} />
                <p className="text-gray-400/70 text-xs font-medium tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</p>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                {value}
                {unit ? <span className="text-xl sm:text-2xl ml-1 text-gray-300/80">{unit}</span> : null}
            </p>
        </div>
    </div>
);

export default DetailStat;
