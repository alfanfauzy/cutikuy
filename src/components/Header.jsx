import { Moon, Sun, Heart } from "lucide-react";

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="rounded-full border border-border bg-amber-500 backdrop-blur-xl backdrop-saturate-150 shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-2 relative">
                <h1 className="text-2xl font-bold tracking-tight font-['Doto'] text-foreground">
                  Cuti Kuy
                </h1>
                <span
                  className={`bg-primary text-primary-foreground absolute left-24 rotate-[15deg] bottom-5 font-['Doto'] px-3 py-0.5 rounded-full text-sm font-bold shadow-soft`}
                >
                  2026
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Support Button */}
              <a
                href="https://trakteer.id/alfan_fauzy/tip"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90 hover:shadow-glow"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline font-['Doto']">Support</span>
              </a>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full transition-all duration-200 bg-muted text-muted-foreground hover:bg-muted-foreground/20 hover:text-foreground"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
