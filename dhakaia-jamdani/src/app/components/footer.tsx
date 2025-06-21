import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded">
        <hr className="border-1 w-full border-slate-400"/>
        <h1 className="text-5xl font-serif text-red-500">Dhakaiaa Jamdani</h1>
        <hr className="border-1 w-full border-slate-400"/>
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">DMCA</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="fill-current w-6 h-6"
          stroke="currentColor"
          viewBox="0 0 50 50"
        >
          <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
        </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
      <aside className="bg-slate-400 w-full h-16">
        <p className="text-black">
          Copyright © ${new Date().getFullYear()} - All right reserved by <Link href="/" className="text-red-500">Dhakaiaa Jamdani</Link>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
