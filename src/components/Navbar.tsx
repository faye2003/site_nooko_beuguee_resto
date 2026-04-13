import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

const navLinks = [
  { name: "Accueil", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Réservation", path: "/reservation" },
  { name: "Galerie", path: "/gallery" },
  { name: "À propos", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className={cn(
            "p-2 rounded-lg transition-colors",
            isScrolled ? "bg-orange-600 text-white" : "bg-white text-orange-600"
          )}>
            <UtensilsCrossed size={24} />
          </div>
          <span className={cn(
            "text-2xl font-bold tracking-tighter transition-colors",
            isScrolled ? "text-gray-900" : "text-white"
          )}>
            NooKo <span className="text-orange-500">Beugué</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-orange-500",
                isScrolled ? "text-gray-700" : "text-white",
                location.pathname === link.path && "text-orange-500"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/reservation"
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          >
            Réserver
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
          )}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-gray-50",
                    location.pathname === link.path ? "text-orange-600" : "text-gray-700"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/reservation"
                className="bg-orange-600 text-white text-center py-3 rounded-xl font-bold mt-2"
              >
                Réserver une table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
