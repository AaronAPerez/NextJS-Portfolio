"use server";

export async function getFiles(owner: string, repo: string, path: string = "") {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  return res.json();
}