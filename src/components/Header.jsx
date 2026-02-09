import { Moon, Sun, Heart } from "lucide-react";

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            {/* Logo Image */}
            <img
              src="/cuti-kuy-logo.png"
              alt="Cuti Kuy Logo"
              className="h-10 w-10 object-contain rounded-lg"
            />

            <div className="flex items-baseline gap-2">
              <h1
                className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Cuti Kuy
              </h1>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                2026
              </span>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Trakteer Link */}
            <a
              href="https://trakteer.id/alfan_fauzy/tip"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                darkMode
                  ? "bg-red-900/50 text-red-300 hover:bg-red-900/70 border border-red-800"
                  : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Dukung</span>
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
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
    </header>
  );
}
