import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { owner, repo, path, content, message, branch, sha } = await req.json();

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        message,
        content,
        branch,
        sha,
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}