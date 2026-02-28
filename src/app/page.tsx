export default function Home() {
  return (
    <div className="min-h-screen bg-[#1B4332] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-full bg-[#D4A853]/20 flex items-center justify-center mb-8">
        <span className="text-2xl">🦔</span>
      </div>
      <h1 className="text-5xl font-bold text-[#F5F5F0] mb-4 tracking-tight">
        Pango
      </h1>
      <p className="text-[#F5F5F0]/60 text-lg max-w-md mb-8">
        Team calls that move work forward. Every call recorded, every file saved, every decision captured.
      </p>
      <p className="text-[#D4A853] text-sm font-semibold tracking-widest uppercase">
        Talk . Build . Move
      </p>
    </div>
  );
}