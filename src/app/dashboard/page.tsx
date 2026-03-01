import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user's team membership
  const { data: membership } = await supabase
    .from("team_members")
    .select("team_id, role, teams(id, name, slug, invite_code)")
    .eq("user_id", user.id)
    .single();

  // If no team, redirect to setup
  if (!membership) {
    redirect("/setup");
  }

  const team = membership.teams as unknown as {
    id: string;
    name: string;
    slug: string;
    invite_code: string;
  };

  // Get team members
  const { data: members } = await supabase
    .from("team_members")
    .select("role, profiles(full_name, avatar_url)")
    .eq("team_id", team.id);

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name || user.email;

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <nav className="border-b border-[#1B4332]/10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
            <span className="text-sm">🦔</span>
          </div>
          <h1 className="text-lg font-bold text-[#1B4332]">Pango</h1>
          <span className="text-[#4A5249] text-sm">/</span>
          <span className="text-sm font-medium text-[#1A1D1B]">{team.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#4A5249]">{displayName}</span>
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

      <main className="max-w-4xl mx-auto px-8 py-12">
        {/* Welcome */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1A1D1B] mb-2">
            Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
          </h2>
          <p className="text-[#4A5249]">
            Here&apos;s what&apos;s happening in {team.name}.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-[#1B4332]/10 p-6">
            <p className="text-3xl font-bold text-[#1B4332]">{members?.length || 1}</p>
            <p className="text-sm text-[#4A5249] mt-1">Team members</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#1B4332]/10 p-6">
            <p className="text-3xl font-bold text-[#1B4332]">0</p>
            <p className="text-sm text-[#4A5249] mt-1">Rooms created</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#1B4332]/10 p-6">
            <p className="text-3xl font-bold text-[#1B4332]">0</p>
            <p className="text-sm text-[#4A5249] mt-1">Recordings</p>
          </div>
        </div>

        {/* Invite Code Card */}
        <div className="bg-white rounded-2xl border border-[#1B4332]/10 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-[#1A1D1B] mb-1">Invite your team</h3>
              <p className="text-sm text-[#4A5249] mb-4">
                Share this code with your teammates so they can join {team.name}.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#1B4332]/5 rounded-xl px-6 py-4">
              <p className="text-2xl font-bold text-[#1B4332] tracking-[0.2em] font-mono">
                {team.invite_code}
              </p>
            </div>
            <div className="text-sm text-[#4A5249]">
              <p>Go to <strong>pangocall.com/setup</strong></p>
              <p>and enter this code to join.</p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-2xl border border-[#1B4332]/10 p-8">
          <h3 className="font-semibold text-[#1A1D1B] mb-4">Team members</h3>
          <div className="space-y-3">
            {members?.map((member, index) => {
              const memberProfile = member.profiles as unknown as {
                full_name: string;
                avatar_url: string;
              };
              return (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#D4A853]">
                        {memberProfile?.full_name
                          ? memberProfile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
                          : "?"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1A1D1B]">
                        {memberProfile?.full_name || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#4A5249] bg-[#1B4332]/5 px-3 py-1 rounded-full capitalize">
                    {member.role}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}