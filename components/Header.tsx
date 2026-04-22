import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-start items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link
        href="/"
        className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 hover:text-slate-700 transition-colors"
      >
        Simple AI assistant
      </Link>
    </header>
  );
}
