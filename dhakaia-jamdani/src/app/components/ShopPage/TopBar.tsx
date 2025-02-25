"use client";
import Image from "next/image";
import React, { useState } from "react";
import LeftBar from "./LeftBar";

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Default Sorting");

  return (
    <div className="flex items-center justify-between">
      <div className='lg:hidden'>
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer">
              <span className="material-icons">tune</span>
            </label>
          </div>
          <div className="drawer-side z-10">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-2 pr-10 pt-24">
              <LeftBar />
            </ul>
          </div>
        </div>
      </div>
      <div className="relative text-left pl-5 flex items-center">
      <p className="text-lg pr-10">Sort By: </p>
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 font- text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            {sortOption}
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
                onClick={() => {
                  setIsOpen(false);
                  // sortProducts("priceHighToLow");
                  setSortOption("Price [High to Low]");
                }}
              >
                Price [High to Low]
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-1"
                onClick={() => {
                  setIsOpen(false);
                  // sortProducts("priceLowToHigh");
                  setSortOption("Price [Low to High]");
                }}
              >
                Price [Low to High]
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-2"
                onClick={() => {
                  setIsOpen(false);
                  // sortProducts("rating");
                  setSortOption("Rating");
                }}
              >
                Rating
              </a>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
