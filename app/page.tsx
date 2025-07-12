export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello World</h1>
      <a
        href="/demo"
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
      >
        Go to Demo Page
      </a>
    </main>
  );
}
