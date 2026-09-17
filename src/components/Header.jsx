import { Moon, Sun, Heart } from "lucide-react";

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="rounded-full border border-border bg-card/80 backdrop-blur-xl backdrop-saturate-150 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex justify-between items-center h-14">
            <div className="relative inline-flex items-baseline">
              <span className="text-2xl font-bold tracking-tight text-foreground font-brand">
                Cuti Kuy
              </span>
              <span className="absolute -top-2 -right-10 rotate-12 text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shadow-sm">
                2026
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://trakteer.id/alfan_fauzy/tip"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 text-primary hover:bg-primary/10"
                aria-label="Support Cuti Kuy"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Support</span>
              </a>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full transition-colors duration-200 text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label={
                  darkMode ? "Beralih ke mode terang" : "Beralih ke mode gelap"
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
