import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <nav className="border-b border-[#1B4332]/10 px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#1B4332]">Pango</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#4A5249]">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="text-sm text-[#E07A5F] font-medium hover:underline"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#1A1D1B] mb-2">
            Welcome to Pango
          </h2>
          <p className="text-[#4A5249]">
            You are signed in as {user.email}. This is your Burrow (dashboard).
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#1B4332]/10 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
              <span className="text-lg">🦔</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1D1B]">
                Your workspace is ready
              </h3>
              <p className="text-sm text-[#4A5249]">
                Next up: creating teams and starting your first room.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1B4332]/5 rounded-xl p-5">
              <p className="text-2xl font-bold text-[#1B4332]">0</p>
              <p className="text-sm text-[#4A5249] mt-1">Rooms created</p>
            </div>
            <div className="bg-[#D4A853]/10 rounded-xl p-5">
              <p className="text-2xl font-bold text-[#1B4332]">0</p>
              <p className="text-sm text-[#4A5249] mt-1">Recordings</p>
            </div>
            <div className="bg-[#E07A5F]/10 rounded-xl p-5">
              <p className="text-2xl font-bold text-[#1B4332]">0</p>
              <p className="text-sm text-[#4A5249] mt-1">Files shared</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
