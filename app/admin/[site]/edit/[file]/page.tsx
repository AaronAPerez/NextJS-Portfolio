import { getFile } from "@/app/actions/github/getFile";
import EditorClient from "./EditorClient";
import sites from "@/data/sites";
import { notFound } from "next/navigation";

interface EditFileParams {
  params: {
    site: string;
    file: string;
  };
}

export default async function EditFile({ params }: EditFileParams) {
  const site = sites.find((s) => s.id === params.site);

  if (!site) {
    notFound();
  }

  const filePath = decodeURIComponent(params.file);
  const [owner, repo] = site.repo.split("/");

  const file = await getFile(owner, repo, filePath);

  return (
    <EditorClient
      site={site}
      filePath={filePath}
      sha={file.sha}
      initialContent={atob(file.content)}
    />
  );
}