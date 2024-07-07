import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Layout from "@/components/Layout";
import { UserContextProvider } from "@/contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UTM FK | Timetable",
  description: "Timetable for Faculty of Computing using UTM's own API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-auto bg-base-200`}>
        <UserContextProvider>
          <Layout>
            <div className="w-full p-4 flex justify-center items-center">
              {children}
            </div>
          </Layout>
        </UserContextProvider>
      </body>
    </html>
  );
}
