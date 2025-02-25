"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { UserProfile, userProfile } from "@/app/auth/getUser";
import { supabase } from "../utils/supabase/supabaseClient";

const Navbar = ({
  isChecked,
  onToggle,
}: {
  isChecked: boolean;
  onToggle: () => void;
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await userProfile();
      setUser(userData);
    };

    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        fetchUser();
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <div className="relative">
      <div className="navbar transition-all duration-300 bg-base-300 rounded-md fixed top-4 left-1/2 transform -translate-x-1/2 shadow-lg w-11/12 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Homepage</Link>
              </li>
              <li>
                <Link href="/Shop">Shop</Link>
              </li>
              <li>
                <a>About</a>
              </li>
              {/* Toggle dark/light mode and login for mobile */}
              <li className="block md:hidden">
                <label
                  htmlFor="custom-toggle"
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    id="custom-toggle"
                    checked={isChecked}
                    onChange={onToggle}
                  />
                  <span className="relative inline-block w-12 h-6 cursor-pointer">
                    <span className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full transition duration-300"></span>
                    <span
                      className={`absolute top-0 w-6 h-6 bg-white rounded-full shadow transform transition duration-300 ${
                        isChecked ? "translate-x-6" : ""
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={isChecked ? faSun : faMoon}
                        className="absolute inset-0 m-auto w-4 h-4"
                      />
                    </span>
                  </span>
                </label>
              </li>
              <li className="block md:hidden">
                <button className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    className="h-7 w-7"
                    viewBox="0 0 30 30"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M 16 4 C 12.144531 4 9 7.144531 9 11 C 9 13.394531 10.21875 15.519531 12.0625 16.78125 C 8.484375 18.304688 6 21.859375 6 26 L 8 26 C 8 21.535156 11.535156 18 16 18 C 20.464844 18 24 21.535156 24 26 L 26 26 C 26 21.859375 23.515625 18.304688 19.9375 16.78125 C 21.78125 15.519531 23 13.394531 23 11 C 23 7.144531 19.855469 4 16 4 Z M 16 6 C 18.773438 6 21 8.226563 21 11 C 21 13.773438 18.773438 16 16 16 C 13.226563 16 11 13.773438 11 11 C 11 8.226563 13.226563 6 16 6 Z"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl text-red-500">ঢাকাইয়া জামদানি</a>
        </div>
        <div className="navbar-end">
          <div
            className={`pl-2 transition-all duration-300 absolute top-full left-1/2 transform -translate-x-1/2 ${
              searchOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {searchOpen && (
              <input
                type="text"
                ref={searchInputRef}
                placeholder="Search here"
                className="input input-bordered w-[300px] md:w-[800px]"
              />
            )}
          </div>
          <button
            className="btn btn-ghost btn-circle"
            onClick={handleSearchToggle}
            area-label="Search"
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <div className="hidden md:flex items-center space-x-2 ">
            {/* Toggle dark/light mode for desktop */}
            <label
              htmlFor="custom-toggle"
              className="relative inline-block w-12 h-6 cursor-pointer"
            >
              <input
                type="checkbox"
                className="hidden"
                id="custom-toggle"
                checked={isChecked}
                onChange={onToggle}
              />
              <span className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full transition duration-300"></span>
              <span
                className={`absolute top-0 w-6 h-6 bg-white rounded-full shadow transform transition duration-300 ${
                  isChecked ? "translate-x-6" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={isChecked ? faSun : faMoon}
                  className="absolute inset-0 m-auto w-4 h-4"
                />
              </span>
            </label>
            {user ? (
              <Link href="/dashboard" className="ml-5 mr-5 btn btn-ghost">
                <p>{user.firstname}</p>
              </Link>
            ) : (
              <Link href="/login" className="btn btn-ghost btn-circle">
                <span className="material-icons">person</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
