"use server";

import { assertAdmin } from "@/lib/admin-session-server";

export async function deploySite(repo: string) {
  await assertAdmin();
  await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      event_type: "manual-deploy",
    }),
  });
}