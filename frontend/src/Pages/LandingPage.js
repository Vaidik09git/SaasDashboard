import Navbar from "../Components/Navbar.js";
import UploadCard from "../Components/UploadCard.js";
import BusinessBackground from "../Components/BusinessBackground.js";

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden relative">
      <BusinessBackground />

      <div className="relative z-10 flex flex-col items-center">
        <Navbar />

        <main className="w-full max-w-5xl mx-auto pt-44 pb-20 px-6 flex flex-col items-center">
          
          {/* Multi-layered Glow System */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

          {/* Typography: Larger and more modern */}
          <div className="text-center mb-20">
            <h1 className="text-7xl md:text-8xl font-black tracking-tightest mb-6 leading-none">
              <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent italic">Analyze. </span>
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Optimise.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-medium">
              The next-generation ledger for serious businesses. 
              Upload files to see <span className="text-white">Hisab.ai</span> in action.
            </p>
          </div>

          {/* Upload Card: Extra Glassy */}
          <div className="w-full max-w-lg relative group">
            {/* Ambient Border Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 to-indigo-500/40 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-60 transition duration-1000" />
            
            <div className="relative bg-slate-900/30 border border-white/5 p-12 rounded-[2.5rem] backdrop-blur-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
              <UploadCard
                title="Secure Data Vault"
                description="Process P&L, EBITDA, and CAGR metrics instantly."
                accept=".csv, .xls, .xlsx, .pdf"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;