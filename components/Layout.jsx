"use client";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const showSidebar = pathname !== "/login";

  return <>{showSidebar ? <Sidebar>{children}</Sidebar> : children}</>;
};

export default Layout;
