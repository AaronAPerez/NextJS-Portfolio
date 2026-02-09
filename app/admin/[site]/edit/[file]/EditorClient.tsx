"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";
import { commitFile } from "@/app/actions/github/commitFile";

interface EditorClientProps {
  site: {
    repo: string;
  };
  filePath: string;
  sha: string;
  initialContent: string;
}

export default function EditorClient({ site, filePath, sha, initialContent }: EditorClientProps) {
  const [content, setContent] = useState(initialContent);

  async function save() {
    await commitFile({
      owner: site.repo.split("/")[0],
      repo: site.repo.split("/")[1],
      path: filePath,
      content: btoa(content),
      sha,
      message: `Update ${filePath}`,
    });

    alert("Saved & committed!");
  }

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Editing: {filePath}</h1>

      <div className="border rounded-lg overflow-hidden shadow">
        <Editor
          height="70vh"
          defaultLanguage="typescript"
          value={content}
          onChange={(v) => setContent(v || "")}
          theme="vs-dark"
        />
      </div>

      <button
        onClick={save}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Changes
      </button>
    </div>
  );
}