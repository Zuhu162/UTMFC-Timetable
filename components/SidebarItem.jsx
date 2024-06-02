"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const SidebarItem = (props) => {
  const pathname = usePathname();

  return (
    <Link href={props.link}>
      <li>
        <div
          className={` border-0 text-alpha hover:bg-base-200 mb-1  ${
            pathname === props.link ? "bg-prime" : "bg-base-100"
          }`}
        >
          <svg
            strokeWidth={1.5}
            className="h-4 w-4 text-alpha"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {props.path}
          </svg>
          {props.item}
        </div>
      </li>
    </Link>
  );
};

export default SidebarItem;
