import Link from "next/link";
import { useState } from "react";

export function NavBar() {
  return (
    <nav className="left-0 top-0 z-10 flex h-screen bg-blue-400 px-2 py-4 pr-8">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href="/">
            <span className="flex items-center gap-4">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/arrays">
            <span className="flex items-center gap-4">Arrays</span>
          </Link>
        </li>
        <li>
          <Link href="/lists-sets-maps">
            <span className="flex items-center gap-4">
              Lists, Sets, and Maps
            </span>
          </Link>
        </li>
        <li>
          <Link href="/queues-and-stacks">
            <span className="flex items-center gap-4">Queues and Stacks</span>
          </Link>
        </li>
        <li>
          <Link href="/heaps">
            <span className="flex items-center gap-4">Heaps</span>
          </Link>
        </li>
        <li>
          <Link href="/disjoint-set">
            <span className="flex items-center gap-4">Disjoint Set</span>
          </Link>
        </li>
        <li>
          <Link href="/graphs">
            <span className="flex items-center gap-4">Graphs</span>
          </Link>
        </li>
        <li>
          <Link href="/sorts">
            <span className="flex items-center gap-4">Sorts</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
