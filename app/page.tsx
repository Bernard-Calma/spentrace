import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-24">
      <h1>Hello World</h1>
      <Link
        href="/demo"
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
      >
        Go to Demo Page
      </Link>
    </main>
  );
}
