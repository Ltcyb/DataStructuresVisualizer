import Link from "next/link";
import { useState } from "react";

export function NavBar() {
  return (
    <nav className="relative top-0 flex h-screen flex-shrink-0 overflow-y-auto bg-blue-400 px-2 py-2">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap p-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/data-structures/arrays">Arrays</Link>
        </li>
        <li>
          <Link href="/data-structures/lists-sets-maps">
            Lists, Sets, and Maps
          </Link>
        </li>
        <li>
          <Link href="/data-structures/queues-and-stacks">
            Queues and Stacks
          </Link>
        </li>
        <li>
          <Link href="/data-structures/heaps">Heaps</Link>
        </li>
        <li>
          <Link href="/data-structures/disjoint-set">Disjoint Set</Link>
        </li>
        <li>
          <Link href="/algorithms/graphs">Graphs</Link>
        </li>
        <li>
          <Link href="/algorithms/sorts">Sorts</Link>
        </li>
      </ul>
      <ul className="absolute bottom-0 flex flex-col items-start gap-2 whitespace-nowrap p-2 ">
        <li>Contatct</li>
      </ul>
    </nav>
  );
}
