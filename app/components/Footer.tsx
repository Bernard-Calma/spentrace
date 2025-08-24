import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto p-2 flex flex-col bg-white items-center">
      <p>© {new Date().getFullYear()} SpenTrace. All rights reserved.</p>
      <div className="mt-2 flex space-x-4 justify-center">
        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="hover:underline">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
