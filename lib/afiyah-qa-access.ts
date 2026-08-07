"use client";

import { readSession } from "@/lib/afiyah-supabase-rest";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oiwxyialfxmsmrzwivlm.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_kqow0_mFC2KoAi9SXdnjKg_fKEp0xG-";

export type AcademyAccess = {
  roles: string[];
  qaBypass: boolean;
  label: "QA Access" | "Standard";
};

export async function getAcademyAccess(): Promise<AcademyAccess> {
  const session = readSession();
  if (!session?.access_token || !session.user?.id) {
    return { roles: [], qaBypass: false, label: "Standard" };
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/user_roles?user_id=eq.${encodeURIComponent(session.user.id)}&select=role`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return { roles: [], qaBypass: false, label: "Standard" };
  }

  const rows = (await response.json()) as Array<{ role: string }>;
  const roles = rows.map((row) => row.role);

  // `qa` is intentionally narrower than admin. It opens Academy progression
  // for internal testing only; all private learner rows remain protected by RLS.
  const qaBypass = roles.includes("qa") || roles.includes("admin") || roles.includes("super_admin");

  return {
    roles,
    qaBypass,
    label: qaBypass ? "QA Access" : "Standard",
  };
}
