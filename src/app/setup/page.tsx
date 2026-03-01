"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const bgWords = [
  "SHELL", "VIBRA", "SCALES", "CHAPTERS", "NIGHTWATCH", "BURROW",
  "RECORD", "SHARE", "DECIDE", "SUMMARIZE", "ACTION", "ROOMS",
  "TEAMS", "FILES", "AUDIO", "VIDEO", "CALLS", "NOTES",
  "PANGO", "SECURE", "SYNC", "REPLAY", "TRACK", "BUILD",
  "TALK", "MOVE", "CONNECT", "CAPTURE", "ORGANIZE", "FOCUS",
  "SHELL", "VIBRA", "SCALES", "CHAPTERS", "NIGHTWATCH", "BURROW",
  "RECORD", "SHARE", "DECIDE", "SUMMARIZE", "ACTION", "ROOMS",
  "TEAMS", "FILES", "AUDIO", "VIDEO", "CALLS", "NOTES",
  "PANGO", "SECURE", "SYNC", "REPLAY", "TRACK", "BUILD",
  "TALK", "MOVE", "CONNECT", "CAPTURE", "ORGANIZE", "FOCUS",
  "SHELL", "VIBRA", "SCALES", "CHAPTERS", "NIGHTWATCH", "BURROW",
  "RECORD", "SHARE", "DECIDE", "SUMMARIZE", "ACTION", "ROOMS",
];

export default function SetupPage() {
  const [mode, setMode] = useState<"choose" | "create" | "join">("choose");
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: teamName }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/teams/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invite_code: inviteCode }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#1B4332] flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background word grid */}
      <div className="absolute inset-0 flex flex-wrap content-start gap-x-6 gap-y-4 p-8 opacity-[0.04] pointer-events-none select-none">
        {bgWords.map((word, i) => (
          <span
            key={i}
            className="text-[#F5F5F0] font-bold tracking-widest"
            style={{
              fontSize: `${14 + (i % 5) * 4}px`,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Radial gradient overlay to fade edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 20%, #1B4332 70%)",
        }}
      />

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-[#D4A853]/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🦔</span>
          </div>
          <h1 className="text-2xl font-bold text-[#F5F5F0]">Set up your workspace</h1>
          <p className="text-[#F5F5F0]/50 text-sm mt-2">
            Create a new team or join an existing one
          </p>
        </div>

        {/* Choose mode */}
        {mode === "choose" && (
          <div className="space-y-4">
            <button
              onClick={() => setMode("create")}
              className="w-full bg-[#F5F5F0] rounded-2xl p-6 text-left hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1B4332]/10 flex items-center justify-center group-hover:bg-[#1B4332]/15 transition-colors">
                  <svg className="w-6 h-6 text-[#1B4332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1D1B]">Create a new team</h3>
                  <p className="text-sm text-[#4A5249]">Start fresh and invite your teammates</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setMode("join")}
              className="w-full bg-[#F5F5F0] rounded-2xl p-6 text-left hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4A853]/10 flex items-center justify-center group-hover:bg-[#D4A853]/15 transition-colors">
                  <svg className="w-6 h-6 text-[#D4A853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1D1B]">Join a team</h3>
                  <p className="text-sm text-[#4A5249]">Enter an invite code from your teammate</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Create team form */}
        {mode === "create" && (
          <div className="bg-[#F5F5F0] rounded-2xl p-8 shadow-2xl">
            <button
              onClick={() => { setMode("choose"); setError(""); }}
              className="text-sm text-[#4A5249] hover:text-[#1A1D1B] mb-6 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <h2 className="text-xl font-bold text-[#1A1D1B] mb-1">Create your team</h2>
            <p className="text-sm text-[#4A5249] mb-6">
              This is your team&apos;s workspace. You can invite others after.
            </p>

            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1B] mb-1.5">
                  Team name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Ivans Empire, Product Team, Design Crew"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#1B4332]/10 bg-white text-[#1A1D1B] placeholder-[#8A8E89] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] transition-all text-sm"
                />
              </div>

              {error && (
                <div className="bg-[#E07A5F]/10 border border-[#E07A5F]/20 rounded-xl px-4 py-3">
                  <p className="text-[#E07A5F] text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1B4332] text-[#F5F5F0] rounded-xl font-semibold text-sm hover:bg-[#0B2920] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating team..." : "Create team"}
              </button>
            </form>
          </div>
        )}

        {/* Join team form */}
        {mode === "join" && (
          <div className="bg-[#F5F5F0] rounded-2xl p-8 shadow-2xl">
            <button
              onClick={() => { setMode("choose"); setError(""); }}
              className="text-sm text-[#4A5249] hover:text-[#1A1D1B] mb-6 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <h2 className="text-xl font-bold text-[#1A1D1B] mb-1">Join a team</h2>
            <p className="text-sm text-[#4A5249] mb-6">
              Ask your teammate for their 6-character invite code.
            </p>

            <form onSubmit={handleJoin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1A1D1B] mb-1.5">
                  Invite code
                </label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="e.g. A3F9K2"
                  required
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-[#1B4332]/10 bg-white text-[#1A1D1B] placeholder-[#8A8E89] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] transition-all text-sm text-center tracking-[0.3em] font-semibold text-lg uppercase"
                />
              </div>

              {error && (
                <div className="bg-[#E07A5F]/10 border border-[#E07A5F]/20 rounded-xl px-4 py-3">
                  <p className="text-[#E07A5F] text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1B4332] text-[#F5F5F0] rounded-xl font-semibold text-sm hover:bg-[#0B2920] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Joining..." : "Join team"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}