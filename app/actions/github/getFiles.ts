"use server";

// Minimal shape of a GitHub Contents API entry — only the fields this app uses.
export interface GitHubFile {
  name: string;
  path: string;
}

export async function getFiles(owner: string, repo: string, path: string = ""): Promise<GitHubFile[]> {
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