import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const repo = form.get("repo") as string;

  // Trigger GitHub Actions workflow
  await fetch(
    `https://api.github.com/repos/${repo}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        event_type: "manual-deploy",
      }),
    }
  );

  return NextResponse.redirect("/admin");
}