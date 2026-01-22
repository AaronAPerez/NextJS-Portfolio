"use server";

export async function commitFile({
  owner,
  repo,
  path,
  content,
  sha,
  message,
}: {
  owner: string;
  repo: string;
  path: string;
  content: string;
  sha: string;
  message: string;
}) {
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
        sha,
        branch: "main",
      }),
    }
  );

  return res.json();
}