"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
interface Props {
  navigation: { text: string; dest: string }[];
  canManage?:boolean
}
const SidebarNav = ({ navigation, canManage=false }: Props) => {
  const [selected, setSelected] = useState(navigation[0].text);

  const currentPath = usePathname();

  useEffect(() => {
    setSelected(currentPath);
  }, [currentPath]);

  return (
    <nav className="flex flex-col gap-1 pt-12 font-semibold">
      {navigation.map((n, index) => (
        <Link
          onClick={(e) => {
            setSelected(e.currentTarget.innerHTML);
          }}
          className={`text-text_inactive relative p-1 first-letter:uppercase hover:bg-text hover:text-baseColor transition-all duration-300 w-[15ch] hover:shadow-link hover:shadow-text ${
            selected === n.dest
              ? "text-text after:block after:w-4 after:h-4 after:absolute after:bg-text after:top-[50%] after:translate-y-[-50%] after:left-0 after:translate-x-[-150%] after:rounded-r-xl"
              : ""
          }`}
          key={index}
          href={n.dest}
        >
          {n.text}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;
