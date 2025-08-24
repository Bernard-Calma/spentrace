import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full mb-auto p-4 flex justify-between items-center bg-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-600">SpenTrace</h1>
      {/* <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <Link href="/subscribe/feature" className="hover:text-blue-600">
          Features
        </Link>
        <Link href="/subscribe/plans" className="hover:text-blue-600">
          Plans
        </Link>
      </div> */}
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          Login
        </Link>
        <Link
          href="/demo"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Demo
        </Link>
      </div>
    </header>
  );
};

export default Header;
