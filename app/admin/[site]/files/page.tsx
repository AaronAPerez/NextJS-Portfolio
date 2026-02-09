import sites from "@/data/sites";
import { getFiles } from "@/app/actions/github/getFiles";
import { notFound } from "next/navigation";

interface FilesPageParams {
  params: {
    site: string;
  };
}

export default async function FilesPage({ params }: FilesPageParams) {
  const site = sites.find((s) => s.id === params.site);

  if (!site) {
    notFound();
  }

  const [owner, repo] = site.repo.split("/");

  const files = await getFiles(owner, repo);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{site.name} Files</h1>

      <ul className="space-y-2">
        {files.map((file: any) => (
          <li key={file.path}>
            <a
              href={`/admin/${site.id}/edit/${encodeURIComponent(file.path)}`}
              className="block p-3 border rounded hover:bg-gray-50"
            >
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}