import React from 'react';
import { links } from '@/utils/data'; // Ensure this path is correct
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0  dark:bg-gray-950 dark:bg-opacity-75 ">
      <nav className="flex fixed top-[0.15rem] bg-slate-400 left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex justify-center items-center gap-5 text-sm font-medium text-gray-500">
          {links.map((link) => (
            <li key={link.hash} className="inline-block p-2 hover:text-gray-700 ">
              <Link href={link.hash}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

