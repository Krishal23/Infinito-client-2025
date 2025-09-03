export default function CAProfile({ data, setData }) {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent opacity-30"></div>

      <div className="relative z-10 flex flex-col max-w-7xl mx-auto p-6 gap-6">
        
        {/* Main Content Area Only */}
        <main className="w-full space-y-6">
          
          {/* Profile Section */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-gray-600 p-8 relative">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              
              {/* Large Profile Picture */}
              <div className="w-36 h-36 rounded-full border-8 border-yellow-500 bg-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold">
                👤
              </div>
              
              {/* Profile Details */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-5xl font-bold text-white mb-4">{data?.name || "NAME"}</h1>
                <div className="w-32 h-1 bg-yellow-500 mx-auto lg:mx-0 mb-6"></div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/90">
                  <span className="flex items-center gap-2">
                    <span className="text-yellow-400">🏢</span>
                    <span>{data?.campus}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-yellow-400">📍</span>
                    <span>{data?.city}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-yellow-400">🏅</span>
                    <span>Rank #{data?.rank}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Grid (only 3 cards kept) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Total Score" value={data?.stats?.score ?? "000"} />
            <StatCard label="Current Rank" value={data?.stats?.rank ?? "000"} />
            <StatCard label="Tasks Completed" value={data?.stats?.tasks ?? "000"} />
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-xl border-2 border-yellow-500 p-6 text-center">
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-white/80 text-sm">{label}</div>
    </div>
  );
}
