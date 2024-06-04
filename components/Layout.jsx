"use client";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/DarkModeToggle";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const showSidebar = pathname !== "/login";

  return (
    <>
      {showSidebar ? (
        <Sidebar>
          <DarkModeToggle />
          {children}
        </Sidebar>
      ) : (
        children
      )}
    </>
  );
};

export default Layout;
