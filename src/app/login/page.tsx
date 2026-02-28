"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#1B4332] flex">
      {/* Left side - rich branded panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[#D4A853]/5" />
        <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-[#D4A853]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#245740]/30" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
              <span className="text-sm">🦔</span>
            </div>
            <h2 className="text-[#F5F5F0] text-2xl font-bold tracking-tight">
              Pango
            </h2>
          </div>
        </div>

        {/* Main headline and features */}
        <div className="relative z-10 space-y-10">
          {/* Big statement */}
          <div>
            <h3 className="text-4xl font-bold text-[#F5F5F0] leading-tight mb-4">
              Your team calls<br />
              deserve a{" "}
              <span className="text-[#D4A853]">record.</span>
            </h3>
            <p className="text-[#F5F5F0]/50 text-sm max-w-sm leading-relaxed">
              Every conversation your team has holds decisions, ideas, and
              action items. Pango makes sure none of it gets lost.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {[
              "Auto-Recording",
              "AI Summaries",
              "File Sharing",
              "Action Items",
              "Low-Bandwidth",
              "Encrypted Rooms",
            ].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 rounded-full bg-[#F5F5F0]/5 border border-[#F5F5F0]/10 text-[#F5F5F0]/70 text-xs font-medium"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Stats bar */}
          <div className="flex gap-8">
            <div>
              <p className="text-2xl font-bold text-[#D4A853]">100%</p>
              <p className="text-[#F5F5F0]/30 text-xs mt-1">Calls Recorded</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#D4A853]">0</p>
              <p className="text-[#F5F5F0]/30 text-xs mt-1">Files Lost</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#D4A853]">AI</p>
              <p className="text-[#F5F5F0]/30 text-xs mt-1">Summaries</p>
            </div>
          </div>

          {/* Testimonial-style quote */}
          <div className="bg-[#F5F5F0]/5 rounded-2xl p-6 border border-[#F5F5F0]/5">
            <p className="text-[#F5F5F0]/70 text-sm leading-relaxed italic mb-4">
              &ldquo;We used to lose half our meeting decisions in chat
              threads. With Pango, every call leaves a trail: recording,
              summary, files, action items. It changed how our team works.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
                <span className="text-xs font-semibold text-[#D4A853]">
                  AO
                </span>
              </div>
              <div>
                <p className="text-[#F5F5F0]/80 text-xs font-semibold">
                  Adaeze Okafor
                </p>
                <p className="text-[#F5F5F0]/30 text-xs">
                  Operations Lead, Lagos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <p className="text-[#D4A853] text-xs font-semibold tracking-widest uppercase">
            Talk . Build . Move
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-[#F5F5F0] rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1A1D1B] mb-2">
              Welcome back
            </h1>
            <p className="text-[#4A5249] text-sm">
              Sign in to your Pango account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1A1D1B] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#1B4332]/10 bg-white text-[#1A1D1B] placeholder-[#8A8E89] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1D1B] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#4A5249]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#1B4332] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}