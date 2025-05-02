"use client";
import Link from "next/link";
import { useState } from "react";

function Navigation() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#FAF9F6] shadow-md">
      <ul className="flex space-x-6 text-gray-700 text-base font-medium relative">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/stock">Stock</Link>
        </li>

        <li>
          <Link href="/usage">Usage</Link>
        </li>

        <li>
          <Link href="/summary">Summary</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
