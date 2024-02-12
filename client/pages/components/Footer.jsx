import Link from "next/link";

export default function Footer() {
  return (
    <footer id="">
      <div className="max-w-[1000px] mx-auto py-5 lg:py-14 flex justify-between">
        <span>
          <Link href="/" className="flex mr-4">
            <img
              src="/logo.png"
              className="mr-3 h-8"
              alt="Logo"
            />
          </Link>
        </span>
        <span className="self-center text-sm font-extrabold whitespace-nowrap text-slate-700">
          All rights reserve
        </span>
      </div>
    </footer>
  );
}
