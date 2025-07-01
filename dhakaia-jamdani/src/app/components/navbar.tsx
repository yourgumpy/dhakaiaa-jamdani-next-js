"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, Menu, User, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserProfile, userProfile } from "@/app/auth/getUser";
import { supabase } from "../utils/supabase/supabaseClient";
import ThemeToggle from "./ui/ThemeToggle";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { cart } = useSelector((state: any) => state.cart);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
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

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/Shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-7xl z-50"
      >
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/20 dark:border-gray-700/20">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">ঢ</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    ঢাকাইয়া জামদানি
                  </span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
                    >
                      {item.label}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearchToggle}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </motion.button>

                {/* Theme Toggle */}
                <ThemeToggle size="sm" />

                {/* Cart */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <Link
                    href="/cart"
                    className="p-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {cart.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {cart.length}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>

                {/* User */}
                <div className="hidden md:block">
                  {user ? (
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.firstname?.[0]}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{user.firstname}</span>
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm font-medium">Sign In</span>
                    </Link>
                  )}
                </div>

                {/* Mobile menu button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200/20 dark:border-gray-700/20"
              >
                <div className="px-4 py-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for products..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200/20 dark:border-gray-700/20"
              >
                <div className="px-4 py-4 space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 py-2 text-base font-medium transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200/20 dark:border-gray-700/20">
                    {user ? (
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 py-2 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.firstname?.[0]}
                          </span>
                        </div>
                        <span className="text-base font-medium">{user.firstname}</span>
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 py-2 transition-colors duration-200"
                      >
                        <User className="w-5 h-5" />
                        <span className="text-base font-medium">Sign In</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;