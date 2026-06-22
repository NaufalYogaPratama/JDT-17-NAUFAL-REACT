import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useToken } from "../../hooks/useToken";
import { LogOut, Search, X } from "lucide-react";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onSearchSubmit?: () => void;
}

const Header = ({ searchQuery, onSearchChange, onSearchSubmit }: HeaderProps) => {
  const { logout } = useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Listen to Escape key globally to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  const isMovieRoute = location.pathname.startsWith("/movie") || location.pathname === "/movie-page" || location.pathname === "/" || location.pathname === "/todo";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movie-page" },
    { name: "Todo List", path: "/todo" },
    { name: "CV Page", path: "/cv-page" },
  ];



  const headerClass = isMovieRoute
    ? `fixed top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-4 select-none transition-all duration-300 ${
        isScrolled 
          ? "bg-[#000000]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg" 
          : "bg-transparent border-b border-transparent py-5"
      }`
    : "sticky top-0 z-50 w-full bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-900 py-3 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-4 select-none";

  return (
    <>
      <header className={headerClass}>
        <div className="flex items-center gap-8 justify-between w-full md:w-auto">
          {/* Logo */}
          <span 
            onClick={() => navigate("/movie-page")} 
            className="text-2xl font-black tracking-wider text-[#CB2957] cursor-pointer hover:opacity-90 transition-all duration-300"
          >
            NeoPal
          </span>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <span
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`relative text-sm font-bold cursor-pointer transition-all duration-300 py-1.5 ${
                    isMovieRoute
                      ? isActive 
                        ? "text-[#CB2957]" 
                        : "text-neutral-400 hover:text-[#EEEEEE]"
                      : isActive
                        ? "text-[#aa3bff] dark:text-[#c084fc]"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      isMovieRoute ? "bg-[#CB2957]" : "bg-[#aa3bff] dark:bg-[#c084fc]"
                    } animate-fade-in`} />
                  )}
                </span>
              );
            })}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          {/* Search Icon Button */}
          {onSearchChange && onSearchSubmit && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-full transition-all duration-300 cursor-pointer active:scale-95"
              title="Cari Film"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold bg-transparent text-[#EEEEEE] border border-[#EEEEEE] rounded-md transition-all duration-300 hover:bg-[#CB2957] hover:text-white active:scale-95 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Floating Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/75 backdrop-blur-sm p-4 pt-[15vh]">
          {/* Modal Content - Glassmorphism style */}
          <div className="w-full max-w-xl bg-neutral-950/45 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200 relative">
            
            {/* Input Box */}
            <div className="flex items-center gap-3 bg-neutral-950/60 border border-white/10 rounded-xl px-4 py-3 text-[#EEEEEE]">
              <Search className="w-5 h-5 text-neutral-500" />
              <input
                type="text"
                placeholder="Cari judul film..."
                value={searchQuery || ""}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSearchSubmit?.();
                    setIsSearchOpen(false);
                  }
                }}
                autoFocus
                className="bg-transparent border-none outline-none w-full text-base placeholder-neutral-500 text-[#EEEEEE]"
              />
              <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800">
                ESC
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white p-1 rounded-full hover:bg-neutral-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Header;
