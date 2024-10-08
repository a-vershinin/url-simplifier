// Core
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-700 text-white">
      <div className="text-2xl font-bold">
        <Link href="/" prefetch={false}>
          URL simplifier
        </Link>
      </div>
    </nav>
  );
};
