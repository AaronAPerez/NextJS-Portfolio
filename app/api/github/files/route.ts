import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { owner, repo, path } = await req.json();

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}