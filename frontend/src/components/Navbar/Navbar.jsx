"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import ToastProvider from "../toastify/ToastProvider";
import { ToastContainer, toast , Bounce } from 'react-toastify';
const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path) =>
    pathname === path ? "active font-bold text-primary" : "";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-20 max-md:px-10 max-sm:px-2 ">
      <ToastProvider />
      <div className="navbar-start  ">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md absolute  dropdown-content bg-base-200 rounded-box z-[1] mt-3   p-2 shadow "
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path} className={isActive(link.path)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl text-primary font-bold">
          TechConf
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 gap-2 ">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path} className={isActive(link.path)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end ">
        {session ? (
          // --- Logged In View ---
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border border-gray-200">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Avatar"
                  src={
                    session.user?.imageURL ||
                    session.user?.image ||
                    "https://placehold.co/100"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow "
            >
              <li className="menu-title px-4 py-2 border-b mb-2">
                <span className="text-xs text-gray-500">Signed in as</span>
                <span className="font-bold text-primary truncate block">
                  {session.user?.name || session.user?.email}
                </span>
              </li>

              <li>
                <Link href="/admin/add">Add Event</Link>
              </li>
              <li>
                <Link href="/admin/manage">Manage Your Event</Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button
                  onClick={() => {
                    toast.success("Successfully logged out", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      transition: Bounce,
                    });
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary text-black">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
