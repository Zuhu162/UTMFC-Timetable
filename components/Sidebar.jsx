import React from "react";
import Logout from "./Logout";
import Image from "next/image";
import Username from "./Username";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ children }) => {
  return (
    <div>
      <div className="drawer lg:drawer-open z-50">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost drawer-button lg:hidden">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                stroke="maroon"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h10"
              />
            </svg>
          </label>
          <div className="w-full h-auto min-h-[80vh] py-5 flex justify-center items-center">
            {children}
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
            <Image
              src="/utm-logo.png"
              width={200}
              height={200}
              alt="utm-logo"
              className="mb-10 mt-15 mx-auto"></Image>
            <li className="mb-5 bg-alpha rounded-lg">
              <Username />
            </li>
            <SidebarItem
              item="Home"
              link="/"
              path={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              }
            />
            <SidebarItem
              item="My Courses"
              link="/courses"
              path={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              }
            />
            <SidebarItem
              item="My Timetable"
              link="/timetable"
              path={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              }
            />
            <SidebarItem
              item="Search Student Timetable"
              link="/search-student-timetable"
              path={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              }
            />
            <SidebarItem
              item="Lecturers"
              link="/lecturers"
              path={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              }
            />
            <div className="divider"></div>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
