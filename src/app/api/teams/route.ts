import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Create a new team
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await request.json();

  if (!name || name.trim().length === 0) {
    return NextResponse.json({ error: "Team name is required" }, { status: 400 });
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Generate invite code
  const { data: inviteCode } = await supabase.rpc("generate_invite_code");

  // Create the team
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .insert({
      name: name.trim(),
      slug,
      owner_id: user.id,
      invite_code: inviteCode || Math.random().toString(36).substring(2, 8).toUpperCase(),
    })
    .select()
    .single();

  if (teamError) {
    return NextResponse.json({ error: teamError.message }, { status: 500 });
  }

  // Add creator as team owner
  const { error: memberError } = await supabase
    .from("team_members")
    .insert({
      team_id: team.id,
      user_id: user.id,
      role: "owner",
    });

  if (memberError) {
    return NextResponse.json({ error: memberError.message }, { status: 500 });
  }

  return NextResponse.json({ team });
}
