"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isFr = pathname.startsWith("/fr");

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const textColor = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border-b border-gray-800 px-4"
    >
      <div className="max-w-4xl mx-auto py-4 flex justify-between items-center text-sm">
        <Link href="/" className={`font-semibold tracking-tight ${textColor}`}>
          Dynamiqtec
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href={isFr ? "/fr" : "/"}
            className={`hover:underline ${
              !isFr ? "text-white" : "text-gray-400"
            }`}
          >
            EN
          </Link>
          <Link
            href={isFr ? "/" : "/fr"}
            className={`hover:underline ${
              isFr ? "text-white" : "text-gray-400"
            }`}
          >
            FR
          </Link>

          <Link
            href={isFr ? "/fr/about" : "/about"}
            className="hover:underline text-gray-400 hover:text-white"
          >
            About
          </Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded flex items-center justify-center border border-gray-700 hover:border-gray-500 transition"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun size={16} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon size={16} className="text-gray-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
