export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404 – Page Not Found</h1>
      <p className="mt-2 text-gray-600">Looks like this page doesn’t exist.</p>
      <a href="/" className="mt-4 text-blue-600 underline">Go back home</a>
    </main>
  );
}