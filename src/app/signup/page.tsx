"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#1B4332] flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-[#F5F5F0] rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-full bg-[#1B4332]/10 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-7 h-7 text-[#1B4332]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#1A1D1B] mb-2">
            Check your email
          </h2>
          <p className="text-[#4A5249] text-sm mb-6">
            We sent a confirmation link to <strong>{email}</strong>. Click the
            link to activate your Pango account.
          </p>
          <Link
            href="/login"
            className="text-[#1B4332] font-semibold text-sm hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1B4332] flex">
      {/* Left side - how it works panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-[20%] right-[-60px] w-[300px] h-[300px] rounded-full bg-[#D4A853]/5" />
        <div className="absolute bottom-[10%] left-[-40px] w-[200px] h-[200px] rounded-full bg-[#245740]/40" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
              <span className="text-sm">🦔</span>
            </div>
            <h2 className="text-[#F5F5F0] text-2xl font-bold tracking-tight">
              Pango
            </h2>
          </div>
        </div>

        {/* How it works - step by step */}
        <div className="relative z-10 space-y-10">
          <div>
            <p className="text-[#D4A853] text-xs font-semibold tracking-widest uppercase mb-4">
              How Pango Works
            </p>
            <h3 className="text-3xl font-bold text-[#F5F5F0] leading-tight">
              Three steps to<br />
              <span className="text-[#D4A853]">better</span> team calls.
            </h3>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D4A853] flex items-center justify-center">
                <span className="text-[#1B4332] text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="text-[#F5F5F0] font-semibold text-sm mb-1">
                  Start a Room
                </h4>
                <p className="text-[#F5F5F0]/40 text-sm leading-relaxed">
                  Create a call room in one click. Share a link or a 6-digit
                  code with your team. No downloads needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D4A853]/70 flex items-center justify-center">
                <span className="text-[#1B4332] text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="text-[#F5F5F0] font-semibold text-sm mb-1">
                  Talk, Share, Decide
                </h4>
                <p className="text-[#F5F5F0]/40 text-sm leading-relaxed">
                  Video or audio. Share files mid-call. Mark key moments with
                  timestamps. Everything happens in one space.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D4A853]/40 flex items-center justify-center">
                <span className="text-[#1B4332] text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="text-[#F5F5F0] font-semibold text-sm mb-1">
                  Vibra Does the Rest
                </h4>
                <p className="text-[#F5F5F0]/40 text-sm leading-relaxed">
                  After every call, AI generates a summary with action items,
                  decisions, and owners. Sent to everyone automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Mini product cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5F5F0]/5 border border-[#F5F5F0]/5 rounded-xl p-4">
              <p className="text-[#D4A853] text-xs font-semibold tracking-wider uppercase mb-2">
                Shell
              </p>
              <p className="text-[#F5F5F0]/50 text-xs leading-relaxed">
                Encrypted rooms for sensitive calls. Even we can&apos;t listen.
              </p>
            </div>
            <div className="bg-[#F5F5F0]/5 border border-[#F5F5F0]/5 rounded-xl p-4">
              <p className="text-[#E07A5F] text-xs font-semibold tracking-wider uppercase mb-2">
                Nightwatch
              </p>
              <p className="text-[#F5F5F0]/50 text-xs leading-relaxed">
                Missed the call? Listen and reply on your own time.
              </p>
            </div>
            <div className="bg-[#F5F5F0]/5 border border-[#F5F5F0]/5 rounded-xl p-4">
              <p className="text-[#F5F5F0]/70 text-xs font-semibold tracking-wider uppercase mb-2">
                Scales
              </p>
              <p className="text-[#F5F5F0]/50 text-xs leading-relaxed">
                Every file shared on a call, pinned and organized forever.
              </p>
            </div>
            <div className="bg-[#F5F5F0]/5 border border-[#F5F5F0]/5 rounded-xl p-4">
              <p className="text-[#D4A853]/70 text-xs font-semibold tracking-wider uppercase mb-2">
                Chapters
              </p>
              <p className="text-[#F5F5F0]/50 text-xs leading-relaxed">
                Jump to &ldquo;Budget Talk&rdquo; instead of scrubbing 45 min.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-center justify-between">
          <p className="text-[#D4A853] text-xs font-semibold tracking-widest uppercase">
            Talk . Build . Move
          </p>
          <p className="text-[#F5F5F0]/20 text-xs">Free to start</p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-[#F5F5F0] rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1A1D1B] mb-2">
              Create your account
            </h1>
            <p className="text-[#4A5249] text-sm">
              Get started with Pango for free
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1A1D1B] mb-1.5">
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#1B4332]/10 bg-white text-[#1A1D1B] placeholder-[#8A8E89] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] transition-all text-sm"
              />
            </div>

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
                placeholder="At least 6 characters"
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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#4A5249]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1B4332] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}